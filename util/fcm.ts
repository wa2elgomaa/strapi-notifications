"use strict";

import admin from "firebase-admin"
import { errors } from '@strapi/utils';


const { ValidationError } = errors
type NotificationEntry = {
    title: string
    body: string
    image: string
    payload: string
    targetType: string
    target: string
}

type NotificationPayload = {
    notification: Partial<{
        title: string
        body: string
        imageUrl: string
        [key: string]: any
    }>
}

export default {
    /*
    * Send a message to a device(s) or a topic.
    * @param {Object} entry - of type: see the attributes in schema ../server/content-types/fcm-notification/schema.json
    * @returns {Promise<any>}
    * */
    send: async (entry: NotificationEntry) => {

        if (!entry.target) {
            // WRONG target 
            return new ValidationError('Sending notification failed due to insufficient target', entry)
        }
        console.log('send to FCM', entry);
        let payload: NotificationPayload = {
            notification: {
                title: entry.title,
            }
        };
        if (entry.body) {
            payload.notification.body = entry.body;
        }
        if (entry.image) {
            payload.notification.imageUrl = entry.image;
        }

        if (entry.payload) {
            try {
                let jsonPayload = typeof entry.payload === 'string' ? JSON.parse(entry.payload) : entry.payload;
                payload = { ...payload, ...jsonPayload };
            } catch {
                console.log("parsing failed so sending without payload")
            }
        }

        let options = {
            mutableContent: true
        }

        let fcm_response = {};

        try {

            if (entry.targetType === 'tokens') {
                const tokens = entry.target?.split(',');

                /*
                * Deprecated Endpoints:
                * The Firebase Admin SDK has deprecated the sendMulticast and sendToDevice methods.
                * These were causing issues with errors like:
                * FirebaseMessagingError: An unknown server error was returned. 
                * Raw server response: "{"error":"Deprecated endpoint, see https://firebase.google.com/docs/cloud-messaging/migrate-v1"}"
                *
                * Replacements:
                * - sendMulticast() -> sendEachForMulticast()
                * - sendToDevice() -> send() with token field
                */
                if (tokens.length > 1) {
                    // Using sendEachForMulticast() instead of the deprecated sendMulticast()
                    fcm_response = await admin.messaging().sendEachForMulticast({
                        tokens: tokens,
                        notification: payload.notification,
                    });
                } else {
                    // Using send() with token instead of the deprecated sendToDevice()
                    fcm_response = await admin.messaging().send({
                        token: entry.target,
                        notification: payload.notification,
                    });
                }
            } else {
                const topics = entry.target?.split(',');

                /*
                * Deprecated Endpoints:
                * The Firebase Admin SDK has deprecated the sendToTopic and sendToCondition methods.
                * These were causing issues with deprecated endpoint errors.
                *
                * Replacements:
                * - sendToTopic() -> send() with topic field
                * - sendToCondition() -> send() with condition field
                */

                if (topics.length > 1) {
                    // Using send() with condition instead of the deprecated sendToCondition()
                    const condition = topics.map(t => `'${t}' in topics`).join(' || ');
                    fcm_response = await admin.messaging().send({
                        condition: condition,
                        notification: payload.notification,
                    });
                } else {
                    // Using send() with topic instead of the deprecated sendToTopic()
                    fcm_response = await admin.messaging().send({
                        topic: entry.target,
                        notification: payload.notification,
                    });
                }
            }

        } catch (error) {

        }

        if (!fcm_response) {
            return JSON.stringify({ error: 'No response from FCM' })
        }
        const response = typeof fcm_response === 'string' ? { fcm_response } : fcm_response
        console.log('send to FCM res', fcm_response);
        return JSON.stringify(response)
    },
    /*
    * Initialize or reinitialize the firebase app
    * */
    initialize: async (strapi) => {
        console.log('initialize FCM');
        const data = await strapi.db.query('plugin::strapi-notifications.fcm-plugin-configuration').findOne({
            select: ['serviceAccount']
        });

        if (data !== null && data.serviceAccount) {
            if (admin.apps?.length > 1) {
                Promise.all(admin.apps.map(app => app?.delete())).then(() => {
                    admin.initializeApp({
                        credential: admin.credential.cert(data.serviceAccount)
                    });
                });
            } else {
                admin.initializeApp({
                    credential: admin.credential.cert(data.serviceAccount),
                });
            }
        }
    }
}
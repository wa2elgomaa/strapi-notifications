import {
    contentTypes
} from '@strapi/utils'
import fcmUtil from './fcm';
import type { Core } from '@strapi/strapi';

const { constants: { PUBLISHED_AT_ATTRIBUTE }, } = contentTypes
const uid = 'plugin::strapi-notifications.fcm-notification';


export const checkIsPublished = (data: any = {}) => {
    if (data[PUBLISHED_AT_ATTRIBUTE]) {
        return true
    }
    return false
}

export const getUserDisplayName = (user: any) => {
    if (user) {
        return `${user.full_name || ''}`.trim() || user.username
    }
    return ''
}

export const getService = (strapi: Core.Strapi, name: string) => {
    return strapi.plugin('strapi-notifications').service(name);
};

export const getPublisherService = (strapi: Core.Strapi, name: string) => {
    return strapi.plugin('publisher').service(name);
};


export const getConfigurationService = (strapi: Core.Strapi) => {
    return strapi.plugin('strapi-notifications').service('fcm-plugin-configuration');
}


export const handleHookEvent = async (event: any) => {
    try {
        const notificationService = getService(strapi, 'fcm-notification')
        const { result, params } = event

        const notification: any = await strapi.documents(uid).findOne({
            documentId: result.documentId,
        });
        console.log("Preparing FCM Notification", notification)
        if (!notification || notification.read) {
            return
        }

        // const ctx = strapi.requestContext.get();
        // const { user } = ctx?.state || {}

        console.log("We will  send this notification using FCM", checkIsPublished(notification))
        if (checkIsPublished(notification)) {
            // send notification if the notification is published
            const fcmResponse = await fcmUtil.send(notification)
            await notificationService.update({
                params: {
                    documentId: notification.documentId
                },
                request: {
                    body: { data: { response: fcmResponse || {} } }
                }
            });
        }
        else {
            if (notification.scheduledAt) {
                //TODO: schedule publish notification if the notification is draft
                const actionPayload = {
                    mode: 'publish',
                    executeAt: notification.scheduledAt,
                    entityId: notification.documentId,
                    entitySlug: uid
                }
                await getPublisherService(strapi, 'action').create({ data: actionPayload });
            }
        }
    } catch (ex) {
        strapi.log.error("Failed to handle hook event", ex)
    }
}
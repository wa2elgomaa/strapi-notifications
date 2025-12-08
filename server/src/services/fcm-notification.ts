'use strict';

/**
 *  service.
 */

import fcmUtil from '../../../util/fcm'
import { Core } from '@strapi/strapi';
import { factories } from '@strapi/strapi';
import type { Context } from 'koa';
import { get } from 'lodash';


const uid = 'plugin::strapi-notifications.fcm-notification';
const fcmNotification = factories.createCoreService(uid, ({ strapi }: { strapi: Core.Strapi }) => ({
    async find(ctx) {
        const { query = {} } = ctx.request
        const results = await strapi.documents(uid).findMany(query);
        return {
            data: results,
        }
    },

    async findOne(ctx: Context) {
        const { id: documentId } = ctx.params
        const { query = {} } = ctx.request
        // const query = strapi.get('query-params').transform(uid, { id, ...params });
        return strapi.documents(uid).findOne({
            documentId,
            ...query
        });
    },

    async delete(ctx: Context) {
        const { id: documentId } = ctx.params
        const { query = {} } = ctx.request
        return strapi.documents(uid).delete({
            documentId,
            ...query
        });
    },

    async send(ctx: Context) {
        const { body = {} } = ctx.request
        if (!body.data) {
            return
        }
        return await fcmUtil.send(body.data);
    },

    async create(ctx: Context) {
        const { query, body = {} } = ctx.request
        const data = body.data
        const status = query.status

        const setupEntry = async (entry) => {
            try {
                if (entry.payload) {
                    entry.payload = typeof entry.payload === 'string' ? JSON.parse(entry.payload) : entry.payload;
                } else {
                    entry.payload = {}
                }
            } catch (ex) {
                entry.payload = {}
            }
            return entry;
        };
        if (Array.isArray(data)) {
            if (data.length > 0) {
                const entries = await Promise.all(data.map(async (d) => {
                    const entity = await setupEntry(d)
                    const result = await strapi.documents(uid).create({
                        data: {
                            ...entity,
                            locale: "en",
                            ...(status === 'published' ? { firstPublishedAt: new Date().toISOString() } : {})
                        }
                    })
                    if (status === 'published') {
                        await strapi.documents(uid).publish({
                            documentId: result.documentId,
                        });
                    }
                    return result
                }));
                return { data: entries }
            } else {
                throw Error('Data array is empty!');
            }
        } else {
            const entity = await setupEntry(data);

            const result = await strapi.documents(uid).create({
                data: {
                    ...entity,
                    locale: "en",
                    ...(status === 'published' ? { firstPublishedAt: new Date().toISOString() } : {})
                }
            });
            if (status === 'published') {
                await strapi.documents(uid).publish({
                    documentId: result.documentId,
                });
            }
            return {
                data: [result]
            }
        }
    },

    async update(ctx: Context) {
        const { id: documentId } = ctx.params
        const { body } = ctx.request
        const response = await super.update(documentId, body);
        return response
    },
    count(ctx) {
        const { query = {} } = ctx.request
        const { user } = ctx.state
        // const q = strapi.get('query-params').transform(uid, query);
        return strapi.documents(uid).count({
            ...query,
            status: 'published',
            filters: {
                ...(get(query, 'filters', {})),
                read: false,
                $or: [
                    { target: user.id },
                    { target: user.fcm },
                    { target: 'all' },
                ]
            },
        });
    },
}));

export default fcmNotification
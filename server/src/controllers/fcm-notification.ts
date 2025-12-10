/**
 *   controller
 */
'use strict';

import { Core } from "@strapi/strapi";
import { getService } from '../../../util'
import * as _ from "lodash";
import type { Context } from 'koa';

interface Notification {
    target?: any;
    targetType?: any;
    response?: any;
    [key: string]: any;
}

const sanitizeNotification = (notification: Notification): Notification => {
    if (notification) {
        delete notification.target;
        delete notification.targetType;
        delete notification.response;
    }
    return notification
}

const getUserSpecificQuery = (ctx: Context) => {
    const { user } = ctx.state
    return {
        ...(_.get(ctx, 'request.query.filters', {})),
        $or: [
            ...(_.get(ctx, 'request.query.filters.$or', [])),
            ...(user ? [{
                target: {
                    $eq: user.fcm
                }
            },
            {
                target: {
                    $eq: user.id
                }
            },
            {
                target: {
                    $eq: _.get(user, 'role.type', '')
                }
            }] : []),
            {
                target: {
                    $eq: 'all'
                }
            },
        ]
    }
}
export default ({ strapi }: { strapi: Core.Strapi }) => {
    const service = getService(strapi, 'fcm-notification')

    return ({
        async find(ctx: Context) {
            try {

                _.set(ctx, 'request.query.status', 'published')
                // use user fcm to get his own notifications
                _.set(ctx, 'request.query.filters', getUserSpecificQuery(ctx))

                const { data: notifications = [] } = await service.find(ctx);
                // sanitize notifications 
                ctx.body = {
                    data: notifications.map(sanitizeNotification)
                };
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async findOne(ctx: Context) {
            try {
                const { data: notification } = await service.findOne(ctx);
                const sanitizedNotification = sanitizeNotification(notification);
                ctx.body = {
                    data: sanitizedNotification
                };
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async delete(ctx: Context) {
            try {
                ctx.body = await service.delete(ctx);
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async create(ctx: Context) {
            try {
                //TODO: validate notification 
                ctx.body = await service.create(ctx);
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async update(ctx: Context) {
            try {
                // TODO: validate request body 
                const { data: notification } = await service.update(ctx);
                ctx.body = {
                    data: sanitizeNotification(notification)
                };
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async read(ctx: Context) {
            try {
                _.set(ctx, 'request.query.filters', getUserSpecificQuery(ctx))
                _.set(ctx, 'request.query.filters.read', false)
                const { data: notifications = [] } = await service.find(ctx);

                if (notifications.length) {
                    notifications.forEach(async (notification) => {
                        await service.update({
                            params: {
                                id: notification.documentId
                            },
                            request: {
                                body: {
                                    data: {
                                        read: true
                                    }
                                }
                            }
                        });
                    });
                }
                return true
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async count(ctx: Context) {
            try {
                const count = await service.count(ctx);
                return {
                    data: {
                        count
                    }
                }
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async send(ctx: Context) {
            try {
                const response = await service.send(ctx);
                return {
                    data: response
                }
            } catch (err) {
                ctx.throw(500, err);
            }
        },
    })
}


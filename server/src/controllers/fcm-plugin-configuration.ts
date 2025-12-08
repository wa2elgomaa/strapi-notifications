'use strict';

import { Core } from '@strapi/strapi';
import type { Context } from 'koa';
/**
 *   controller
 */
import { getService } from '../../../util'


export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async find(ctx: Context) {
        try {
            ctx.body = await getService(strapi, 'fcm-plugin-configuration').find(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOne(ctx: Context) {
        try {
            ctx.body = await getService(strapi, 'fcm-plugin-configuration').findOne(ctx.params.id, ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async create(ctx: Context) {
        try {
            ctx.body = await getService(strapi, 'fcm-plugin-configuration').create(ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async update(ctx: Context) {
        try {
            ctx.body = await getService(strapi, 'fcm-plugin-configuration').update(ctx.params.id, ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    }
})

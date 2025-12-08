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
            // TODO: validate query 
            ctx.body = await getService(strapi, 'fcm-target').find(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async count(ctx: Context) {
        try {
            // TODO: validate query 
            ctx.body = await getService(strapi, 'fcm-target').count(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    }
})
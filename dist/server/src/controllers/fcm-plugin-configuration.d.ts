import { Core } from '@strapi/strapi';
import type { Context } from 'koa';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    find(ctx: Context): Promise<void>;
    findOne(ctx: Context): Promise<void>;
    create(ctx: Context): Promise<void>;
    update(ctx: Context): Promise<void>;
};
export default _default;

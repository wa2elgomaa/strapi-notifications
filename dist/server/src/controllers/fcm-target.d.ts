import { Core } from '@strapi/strapi';
import type { Context } from 'koa';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    find(ctx: Context): Promise<void>;
    count(ctx: Context): Promise<void>;
};
export default _default;

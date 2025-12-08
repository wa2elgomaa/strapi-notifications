import { Core } from "@strapi/strapi";
import type { Context } from 'koa';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    find(ctx: Context): Promise<void>;
    findOne(ctx: Context): Promise<void>;
    delete(ctx: Context): Promise<void>;
    create(ctx: Context): Promise<void>;
    update(ctx: Context): Promise<void>;
    read(ctx: Context): Promise<boolean>;
    count(ctx: Context): Promise<{
        data: {
            count: any;
        };
    }>;
    send(ctx: Context): Promise<{
        data: any;
    }>;
};
export default _default;

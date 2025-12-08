import { Core } from '@strapi/strapi';
import type { Context } from 'koa';
declare const fcmNotification: ({ strapi, }: {
    strapi: Core.Strapi;
}) => {
    find: (ctx: any) => Promise<{
        data: import("@strapi/types/dist/modules/documents").AnyDocument[];
    }>;
    findOne: (ctx: Context) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
    delete: (ctx: Context) => Promise<{
        documentId: string;
        entries: import("@strapi/types/dist/modules/documents").AnyDocument[];
    }>;
    send: (ctx: Context) => Promise<string | import("@strapi/utils/dist/errors").ValidationError<"Sending notification failed due to insufficient target", {
        title: string;
        body: string;
        image: string;
        payload: string;
        targetType: string;
        target: string;
    }>>;
    create: (ctx: Context) => Promise<{
        data: ({
            documentId: string;
            id: number;
        } & {
            [key: string]: any;
        })[];
    }>;
    update: (ctx: Context) => Promise<any>;
    count: (ctx: any) => import("@strapi/types/dist/modules/documents/result/document-engine").Count;
} & Core.CoreAPI.Service.Base;
export default fcmNotification;

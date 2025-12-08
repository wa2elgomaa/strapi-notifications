/// <reference types="koa" />
declare const _default: {
    'fcm-target': ({ strapi }: {
        strapi: any;
    }) => {
        find(params?: {
            page?: number;
            pageSize?: number;
        }): Promise<{
            data: any[];
        }>;
        count(params?: {}): Promise<any>;
    };
    'fcm-notification': ({ strapi, }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        find: (ctx: any) => Promise<{
            data: import("@strapi/types/dist/modules/documents").AnyDocument[];
        }>;
        findOne: (ctx: import("koa").Context) => Promise<import("@strapi/types/dist/modules/documents").AnyDocument>;
        delete: (ctx: import("koa").Context) => Promise<{
            documentId: string;
            entries: import("@strapi/types/dist/modules/documents").AnyDocument[];
        }>;
        send: (ctx: import("koa").Context) => Promise<string | import("@strapi/utils/dist/errors").ValidationError<"Sending notification failed due to insufficient target", {
            title: string;
            body: string;
            image: string;
            payload: string;
            targetType: string;
            target: string;
        }>>;
        create: (ctx: import("koa").Context) => Promise<{
            data: ({
                documentId: string;
                id: number;
            } & {
                [key: string]: any;
            })[];
        }>;
        update: (ctx: import("koa").Context) => Promise<any>;
        count: (ctx: any) => import("@strapi/types/dist/modules/documents/result/document-engine").Count;
    } & import("@strapi/types/dist/core/core-api/service").Base;
    'fcm-topic': ({ strapi }: {
        strapi: any;
    }) => {
        find(params?: {
            page?: number;
            pageSize?: number;
        }): Promise<{
            data: any;
        }>;
        count(params?: {}): Promise<any>;
        findOne(params?: {}): Promise<any>;
        create(params?: {}): Promise<any>;
        update(entityId: any, params?: {}): Promise<any>;
        delete(params?: {}): Promise<any>;
    };
    'fcm-plugin-configuration': ({ strapi }: {
        strapi: any;
    }) => {
        find(params?: {}): Promise<{
            data: any;
            pagination: {
                status: string;
            };
        }>;
        findOne(entityId: any, params?: {}): Promise<any>;
        create(params?: {
            [key: string]: any;
        }): Promise<any>;
        update(entityId: any, params?: {
            [key: string]: any;
        }): Promise<any>;
    };
};
export default _default;

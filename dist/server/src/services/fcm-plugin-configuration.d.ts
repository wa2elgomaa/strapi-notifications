declare const _default: ({ strapi }: {
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
export default _default;

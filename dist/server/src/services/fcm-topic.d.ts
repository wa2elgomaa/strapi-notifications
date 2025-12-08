declare const _default: ({ strapi }: {
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
export default _default;

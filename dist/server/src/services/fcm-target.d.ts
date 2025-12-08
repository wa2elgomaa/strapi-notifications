declare const _default: ({ strapi }: {
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
export default _default;

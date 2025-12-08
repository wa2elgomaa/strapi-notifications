declare const _default: {
    schema: {
        kind: string;
        collectionName: string;
        info: {
            singularName: string;
            pluralName: string;
            displayName: string;
        };
        options: {
            draftAndPublish: boolean;
            comment: string;
        };
        attributes: {
            read: {
                type: string;
                default: boolean;
            };
            title: {
                type: string;
                required: boolean;
            };
            body: {
                type: string;
            };
            payload: {
                type: string;
            };
            image: {
                type: string;
            };
            targetType: {
                type: string;
                enum: string[];
                required: boolean;
            };
            scheduledAt: {
                type: string;
                disabled: boolean;
                private: boolean;
            };
            target: {
                type: string;
                required: boolean;
            };
            response: {
                type: string;
            };
            firstPublishedAt: {
                type: string;
                disabled: boolean;
                configurable: boolean;
            };
        };
    };
    lifecycles: {
        afterCreate(event: any): Promise<void>;
    };
};
export default _default;

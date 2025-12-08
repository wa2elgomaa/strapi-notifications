declare const _default: {
    'fcm-topic': {
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
                name: {
                    type: string;
                    required: boolean;
                    maxLength: number;
                };
                label: {
                    type: string;
                    maxLength: number;
                };
            };
        };
    };
    'fcm-notification': {
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
    'fcm-plugin-configuration': {
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
                serviceAccount: {
                    type: string;
                    required: boolean;
                };
                namespace: {
                    type: string;
                    default: string;
                };
                tokenField: {
                    type: string;
                    default: string;
                };
                labelField: {
                    type: string;
                    default: string;
                };
            };
        };
        lifecycles: {
            afterCreate(event: any): void;
            afterUpdate(event: any): void;
        };
    };
};
export default _default;

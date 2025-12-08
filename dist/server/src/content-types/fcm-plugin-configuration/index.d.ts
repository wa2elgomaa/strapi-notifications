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
export default _default;

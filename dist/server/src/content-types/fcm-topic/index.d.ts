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
export default _default;

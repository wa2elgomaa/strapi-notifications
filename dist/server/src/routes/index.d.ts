declare const _default: {
    admin: {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                policies: {
                    name: string;
                    config: {
                        actions: string[];
                    };
                }[];
            };
        }[];
    };
    'content-api': {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                policies: any[];
            };
        }[];
    };
};
export default _default;

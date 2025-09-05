declare const _default: {
    '/session/:sessionId/moz/screenshot/full': {
        GET: {
            command: string;
            description: string;
            ref: string;
            parameters: never[];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
    };
    '/session/:sessionId/moz/context': {
        GET: {
            command: string;
            description: string;
            ref: string;
            examples: string[][];
            parameters: never[];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
        POST: {
            command: string;
            description: string;
            ref: string;
            examples: string[][];
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
        };
    };
    '/session/:sessionId/moz/addon/install': {
        POST: {
            command: string;
            description: string;
            ref: string;
            examples: string[][];
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
    };
    '/session/:sessionId/moz/addon/uninstall': {
        GET: {
            command: string;
            description: string;
            ref: string;
            examples: string[][];
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
        };
    };
};
export default _default;
//# sourceMappingURL=gecko.d.ts.map
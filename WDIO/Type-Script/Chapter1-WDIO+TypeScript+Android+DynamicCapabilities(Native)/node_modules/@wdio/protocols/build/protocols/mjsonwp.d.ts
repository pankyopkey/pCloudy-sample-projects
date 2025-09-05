declare const _default: {
    '/session/:sessionId/element/:elementId/pageIndex': {
        GET: {
            command: string;
            ref: string;
            deprecated: string;
            parameters: never[];
            returns: {
                type: string;
                name: string;
            };
        };
    };
    '/session/:sessionId/network_connection': {
        GET: {
            command: string;
            ref: string;
            parameters: never[];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
        POST: {
            command: string;
            ref: string;
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
        };
    };
    '/session/:sessionId/touch/perform': {
        GET: {
            command: string;
            ref: string;
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
        };
    };
    '/session/:sessionId/touch/multi/perform': {
        GET: {
            command: string;
            ref: string;
            parameters: ({
                name: string;
                type: string;
                description: string;
                required: boolean;
            } | {
                name: string;
                type: string;
                description: string;
                required?: undefined;
            })[];
        };
    };
    '/session/:sessionId/receive_async_response': {
        POST: {
            command: string;
            ref: string;
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
//# sourceMappingURL=mjsonwp.d.ts.map
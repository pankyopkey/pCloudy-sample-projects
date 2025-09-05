declare const _default: {
    '/session/:sessionId/sauce/ondemand/log': {
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
    '/session/:sessionId/sauce/ondemand/throttle/network': {
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
    '/session/:sessionId/sauce/ondemand/throttle/cpu': {
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
    '/session/:sessionId/sauce/ondemand/intercept': {
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
    '/session/:sessionId/sauce/ondemand/performance': {
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
    '/session/:sessionId/sauce/ondemand/performance/scroll': {
        POST: {
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
    };
    '/session/:sessionId/sauce/ondemand/mock': {
        POST: {
            command: string;
            description: string;
            ref: string;
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
    '/session/:sessionId/sauce/ondemand/mock/:mockId': {
        GET: {
            command: string;
            description: string;
            ref: string;
            variables: {
                name: string;
                description: string;
            }[];
            parameters: never[];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
        DELETE: {
            command: string;
            description: string;
            ref: string;
            variables: {
                name: string;
                description: string;
            }[];
            parameters: {
                type: string;
                name: string;
                description: string;
                required: boolean;
            }[];
        };
        POST: {
            command: string;
            description: string;
            ref: string;
            variables: {
                name: string;
                description: string;
            }[];
            parameters: {
                type: string;
                name: string;
                description: string;
            }[];
        };
    };
};
export default _default;
//# sourceMappingURL=saucelabs.d.ts.map
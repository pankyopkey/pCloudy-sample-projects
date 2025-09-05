declare const _default: {
    '/session/:sessionId/se/file': {
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
    '/session/:sessionId/se/files': {
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
        DELETE: {
            command: string;
            description: string;
            ref: string;
            parameters: never[];
        };
    };
    '/grid/api/hub/': {
        GET: {
            isHubCommand: boolean;
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
    '/grid/api/testsession?session=:session': {
        GET: {
            isHubCommand: boolean;
            command: string;
            description: string;
            ref: string;
            parameters: never[];
            variables: {
                name: string;
                description: string;
            }[];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
    };
    '/grid/api/proxy': {
        POST: {
            isHubCommand: boolean;
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
    '/lifecycle-manager?action=:action': {
        GET: {
            isHubCommand: boolean;
            command: string;
            description: string;
            ref: string;
            parameters: never[];
            variables: {
                name: string;
                description: string;
            }[];
        };
    };
    '/graphql': {
        POST: {
            isHubCommand: boolean;
            command: string;
            description: string;
            ref: string;
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
            examples: string[][];
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
    };
};
export default _default;
//# sourceMappingURL=selenium.d.ts.map
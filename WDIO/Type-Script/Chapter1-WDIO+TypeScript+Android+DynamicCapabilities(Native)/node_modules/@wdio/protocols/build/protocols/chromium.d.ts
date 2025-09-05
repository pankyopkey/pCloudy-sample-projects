declare const _default: {
    '/session/:sessionId/alert': {
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
    };
    '/session/:sessionId/autoreport': {
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
    '/session/:sessionId/is_loading': {
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
    };
    '/session/:sessionId/chromium/heap_snapshot': {
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
    '/session/:sessionId/network_connection': {
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
            returns: {
                type: string;
                name: string;
                description: string;
            };
        };
    };
    '/session/:sessionId/chromium/network_conditions': {
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
            examples: string[][];
            parameters: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
        };
        DELETE: {
            command: string;
            description: string;
            ref: string;
            parameters: never[];
        };
    };
    '/session/:sessionId/chromium/send_command': {
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
        };
    };
    '/session/:sessionId/chromium/send_command_and_get_result': {
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
    '/session/:sessionId/file': {
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
    '/session/:sessionId/chromium/launch_app': {
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
    '/session/:sessionId/element/:elementId/value': {
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
    };
    '/session/:sessionId/element/:elementId/hover': {
        POST: {
            command: string;
            description: string;
            ref: string;
            variables: {
                name: string;
                description: string;
            }[];
            parameters: never[];
        };
    };
    '/session/:sessionId/touch/pinch': {
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
        };
    };
    '/session/:sessionId/goog/page/freeze': {
        POST: {
            command: string;
            description: string;
            ref: string;
            parameters: never[];
        };
    };
    '/session/:sessionId/goog/page/resume': {
        POST: {
            command: string;
            description: string;
            ref: string;
            parameters: never[];
        };
    };
    '/session/:sessionId/goog/cast/get_sinks': {
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
    '/session/:sessionId/goog/cast/set_sink_to_use': {
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
        };
    };
    '/session/:sessionId/goog/cast/start_tab_mirroring': {
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
        };
    };
    '/session/:sessionId/goog/cast/get_issue_message': {
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
    '/session/:sessionId/goog/cast/stop_casting': {
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
        };
    };
    '/shutdown': {
        POST: {
            command: string;
            description: string;
            ref: string;
            parameters: never[];
        };
    };
    '/session/:sessionId/element/:elementId/screenshot': {
        GET: {
            command: string;
            description: string;
            ref: string;
            variables: {
                name: string;
                description: string;
            }[];
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
    '/session/:sessionId/se/log/types': {
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
    '/session/:sessionId/se/log': {
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
};
export default _default;
//# sourceMappingURL=chromium.d.ts.map
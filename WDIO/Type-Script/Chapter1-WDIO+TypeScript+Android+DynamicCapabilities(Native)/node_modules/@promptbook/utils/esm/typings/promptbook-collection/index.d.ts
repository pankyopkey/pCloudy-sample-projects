declare const _default: ({
    title: string;
    pipelineUrl: string;
    parameters: {
        name: string;
        description: string;
        isInput: boolean;
        isOutput: boolean;
    }[];
    templates: {
        templateType: string;
        name: string;
        title: string;
        content: string;
        resultingParameterName: string;
        dependentParameterNames: string[];
    }[];
    knowledgeSources: never[];
    knowledgePieces: never[];
    personas: never[];
    preparations: never[];
    sourceFile: string;
} | {
    title: string;
    pipelineUrl: string;
    parameters: {
        name: string;
        description: string;
        isInput: boolean;
        isOutput: boolean;
    }[];
    templates: {
        templateType: string;
        name: string;
        title: string;
        content: string;
        resultingParameterName: string;
        expectations: {
            words: {
                min: number;
                max: number;
            };
        };
        dependentParameterNames: string[];
    }[];
    knowledgeSources: never[];
    knowledgePieces: never[];
    personas: never[];
    preparations: never[];
    sourceFile: string;
} | {
    title: string;
    pipelineUrl: string;
    parameters: {
        name: string;
        description: string;
        isInput: boolean;
        isOutput: boolean;
    }[];
    templates: {
        templateType: string;
        name: string;
        title: string;
        content: string;
        resultingParameterName: string;
        format: string;
        dependentParameterNames: string[];
    }[];
    knowledgeSources: never[];
    knowledgePieces: never[];
    personas: never[];
    preparations: never[];
    sourceFile: string;
})[];
export default _default;

export interface EjsHelpersConfig {
    useEsm?: boolean;
    useTypeScript?: boolean;
}
export declare class EjsHelpers {
    readonly useTypeScript: boolean;
    readonly useEsm: boolean;
    constructor(config: EjsHelpersConfig);
    if(condition: boolean, trueValue: string, falseValue?: string): string;
    ifTs: (trueValue: string, falseValue?: string) => string;
    ifEsm: (trueValue: string, falseValue?: string) => string;
    param(name: string, type: string): string;
    returns(type: string): string;
    import(exports: string, moduleId: string): string;
    private modulePathFrom;
    export(keyword: 'class' | 'function' | 'const' | 'let', name: string): string;
}
//# sourceMappingURL=EjsHelpers.d.ts.map
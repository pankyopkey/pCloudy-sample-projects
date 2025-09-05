import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { string_href } from '../../types/typeAliases';
/**
 * Addtional options for rendering Mermaid graph
 */
export type renderPipelineMermaidOptions = {
    /**
     * Callback for creating from template graph node
     */
    linkTemplate?(template: TemplateJson): {
        href: string_href;
        title: string;
    } | null;
};
/**
 * Creates a Mermaid graph based on the promptbook
 *
 * Note: The result is not wrapped in a Markdown code block
 *
 * @public exported from `@promptbook/utils`
 */
export declare function renderPromptbookMermaid(pipelineJson: PipelineJson, options?: renderPipelineMermaidOptions): string;
/**
 * TODO: !!!!! FOREACH in mermaid graph
 * TODO: !!!!! Knowledge in mermaid graph
 * TODO: !!!!! Personas in mermaid graph
 * TODO: Maybe use some Mermaid package instead of string templating
 * TODO: [🕌] When more than 2 functionalities, split into separate functions
 */

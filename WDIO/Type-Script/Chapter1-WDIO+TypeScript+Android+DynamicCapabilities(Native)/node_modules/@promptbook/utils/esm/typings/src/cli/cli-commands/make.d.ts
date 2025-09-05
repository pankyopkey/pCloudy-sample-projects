import type { Command as Program } from 'commander';
/**
 * Initializes `make` command for Promptbook CLI utilities
 *
 * @private internal function of `promptbookCli`
 */
export declare function initializeMakeCommand(program: Program): void;
/**
 * TODO: [🥃][main] !!! Allow `ptbk make` without configuring any llm tools
 * TODO: Maybe remove this command - "about" command should be enough?
 * TODO: [0] DRY Javascript and typescript - Maybe make ONLY typescript and for javascript just remove types
 * Note: [🟡] This code should never be published outside of `@promptbook/cli`
 * TODO: [🖇] What about symlinks? Maybe flag --follow-symlinks
 */

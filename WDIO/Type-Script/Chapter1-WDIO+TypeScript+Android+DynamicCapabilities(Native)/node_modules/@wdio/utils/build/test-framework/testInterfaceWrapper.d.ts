/**
 * used to wrap mocha, jasmine test frameworks functions (`it`, `beforeEach` and other)
 * with WebdriverIO before/after Test/Hook hooks.
 * Entrypoint is `wrapGlobalTestMethod`, other functions are exported for testing purposes.
 *
 * NOTE: not used by cucumber test framework. `testFnWrapper` is called directly there
 */
import type { HookFnArgs, SpecArguments } from './types.js';
/**
 * runs a hook and execute before/after hook
 *
 * @param  {Function} hookFn        function that was passed to the framework hook
 * @param  {Function} origFn        original framework hook function
 * @param  {Function} beforeFn      before hook
 * @param  {Function} beforeFnArgs  function that returns args for `beforeFn`
 * @param  {Function} afterFn       after hook
 * @param  {Function} afterArgsFn   function that returns args for `afterFn`
 * @param  {string}   cid           cid
 * @param  {number}   repeatTest    number of retries if hook fails
 * @return {Function}               wrapped framework hook function
 */
export declare const runHook: (this: unknown, hookFn: Function, origFn: Function, beforeFn: Function | Function[], beforeFnArgs: HookFnArgs<unknown>, afterFn: Function | Function[], afterFnArgs: HookFnArgs<unknown>, cid: string, repeatTest: number, timeout: number) => any;
/**
 * runs a spec function (test function)
 *
 * @param  {string}   specTitle     test description
 * @param  {Function} specFn        test function that got passed in from the user
 * @param  {Function} origFn        original framework test function
 * @param  {Function} beforeFn      before hook
 * @param  {Function} beforeFnArgs  function that returns args for `beforeFn`
 * @param  {Function} afterFn       after hook
 * @param  {Function} afterFnArgs   function that returns args for `afterFn`
 * @param  {string}   cid           cid
 * @param  {number}   repeatTest    number of retries if test fails
 * @return {Function}               wrapped test function
 */
export declare const runSpec: (this: unknown, specTitle: string, specFn: Function, origFn: Function, beforeFn: Function | Function[], beforeFnArgs: HookFnArgs<unknown>, afterFn: Function | Function[], afterFnArgs: HookFnArgs<unknown>, cid: string, repeatTest: number, timeout: number) => any;
/**
 * wraps hooks and test function of a framework within a fiber context
 *
 * @param  {Function} origFn               original framework function
 * @param  {Boolean}  isSpec               whether or not origFn is a spec
 * @param  {string[]} testInterfaceFnNames command that runs specs, e.g. `it`, `it.only` or `fit`
 * @param  {Function} beforeFn             before hook
 * @param  {Function} beforeFnArgs         function that returns args for `beforeFn`
 * @param  {Function} afterFn              after hook
 * @param  {Function} afterArgsFn          function that returns args for `afterFn`
 * @param  {string}   cid                  cid
 * @return {Function}                      wrapped test/hook function
 */
export declare const wrapTestFunction: (this: unknown, origFn: Function, isSpec: boolean, beforeFn: Function | Function[], beforeArgsFn: HookFnArgs<unknown>, afterFn: Function | Function[], afterArgsFn: HookFnArgs<unknown>, cid: string) => (...specArguments: SpecArguments) => any;
/**
 * Wraps global test function like `it`.
 *
 * The scope parameter is used in the qunit framework since all functions are bound to global.QUnit instead of global
 *
 * @param  {boolean}  isTest        is `origFn` test function, otherwise hook
 * @param  {Function} beforeFn      before hook
 * @param  {Function} beforeFnArgs  function that returns args for `beforeFn`
 * @param  {Function} afterFn       after hook
 * @param  {Function} afterArgsFn   function that returns args for `afterFn`
 * @param  {string}   fnName        test interface command to wrap, e.g. `beforeEach`
 * @param  {string}   cid           cid
 * @param  {Object}   scope         the scope to run command from, defaults to global
 */
export declare const wrapGlobalTestMethod: (this: unknown, isSpec: boolean, beforeFn: Function | Function[], beforeArgsFn: HookFnArgs<unknown>, afterFn: Function | Function[], afterArgsFn: HookFnArgs<unknown>, fnName: string, cid: string, scope?: typeof globalThis) => void;
//# sourceMappingURL=testInterfaceWrapper.d.ts.map
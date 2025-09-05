/**
 * Implements ES5 [`Array#forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method.<br><br>
 * Executes the provided callback once for each element.<br>
 * Callbacks are run concurrently,
 * and are only invoked for properties of the array that have been initialized (including those initialized with *undefined*), for unassigned ones `callback` is not run.<br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with undefined value.
 */
export declare const forEach: <T>(array: T[], callback: Function, thisArg?: T) => Promise<void>;
/**
 * Same functionality as [`forEach()`](global.html#forEach), but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with undefined value.
 */
export declare const forEachSeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<void>;
/**
 * Implements ES5 [`Array#map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method.<br><br>
 * Creates a new array with the results of calling the provided callback once for each element.<br>
 * Callbacks are run concurrently,
 * and are only invoked for properties of the array that have been initialized (including those initialized with *undefined*), for unassigned ones`callback` is not run.<br>
 * Resultant *Array* is always the same *length* as the original one.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the resultant *Array* as value.
 */
export declare const map: <T>(array: T[], callback: Function, thisArg?: T) => Promise<any[]>;
/**
 * Same functionality as [`map()`](global.html#map), but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the resultant *Array* as value.
 */
export declare const mapSeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<any[]>;
/**
 * Implements ES5 [`Array#find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method.<br><br>
 * Returns the value of the element that satisfies the provided `callback`. The value returned is the one found first.<br>
 * Callbacks are run concurrently, meaning that all the callbacks are going to run even if the returned value is found in one of the first elements of `array`,
 * depending on the async calls you are going to use, consider using instead [`findSeries()`](global.html#findSeries).<br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the element that passed the test as value, otherwise *undefined*.
 */
export declare const find: <T>(array: T[], callback: Function, thisArg?: T) => Promise<T | undefined>;
/**
 * Same functionality as [`find()`](global.html#find), but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the element that passed the test as value, otherwise *undefined*.
 */
export declare const findSeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<T | undefined>;
/**
 * Implements ES5 [`Array#findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) method.<br><br>
 * Returns the index of the element that satisfies the provided `callback`. The index returned is the one found first.<br>
 * Callbacks are run concurrently, meaning that all the callbacks are going to run even if the returned index is found in one of the first elements of `array`,
 * depending on the async calls you are going to use, consider using instead [`findSeries()`](global.html#findSeries).<br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the index that passed the test as value, otherwise *-1*.
 */
export declare const findIndex: <T>(array: T[], callback: Function, thisArg?: T) => Promise<unknown>;
/**
 * Same functionality as [`findIndex()`](global.html#findIndex), but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the index that passed the test, otherwise *-1*.
 */
export declare const findIndexSeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<number | undefined>;
/**
 * Implements ES5 [`Array#some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method.<br><br>
 * Test if some element in `array` passes the test implemented in `callback`.<br>
 * Callbacks are run concurrently, meaning that all the callbacks are going to run even if some of the first elements pass the test,
 * depending on the async calls you are going to use, consider using instead [`someSeries()`](global.html#someSeries).<br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with *true* as value if some element passed the test, otherwise *false*.
 */
export declare const some: <T>(array: T[], callback: Function, thisArg?: T) => Promise<unknown>;
/**
 * Same functionality as [`some()`](global.html#some), but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with *true* as value if some element passed the test, otherwise *false*.
 */
export declare const someSeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<boolean>;
/**
 * Implements ES5 [`Array#every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method.<br><br>
 * Test if all elements in `array` pass the test implemented in `callback`.<br>
 * Callbacks are run concurrently, meaning that all the callbacks are going to run even if any of the first elements do not pass the test,
 * depending on the async calls you are going to use, consider using instead [`everySeries()`](global.html#everySeries).<br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with *true* as value if all elements passed the test, otherwise *false*.
 */
export declare const every: <T>(array: T[], callback: Function, thisArg?: T) => Promise<boolean>;
/**
 * Same functionality as [`every()`](global.html#every), but runs only one callback at a time.<br><br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with *true* as value if all elements passed the test, otherwise *false*.
 */
export declare const everySeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<boolean>;
/**
 * Implements ES5 [`Array#filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method.<br><br>
 * Creates a new array with the elements that passed the test implemented in `callback`.<br>
 * Callbacks are run concurrently.<br>
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with the resultant filtered *Array* as value.
 */
export declare const filter: <T>(array: T[], callback: Function, thisArg?: T) => Promise<unknown>;
/**
 * Same functionality as [`filter()`](global.html#filter), but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @return {Promise} - Returns a Promise with the resultant filtered *Array* as value.
 */
export declare const filterSeries: <T>(array: T[], callback: Function, thisArg?: T) => Promise<Awaited<T>[]>;
/**
 * Implements ES5 [`Array#reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.<br><br>
 * Applies a `callback` against an accumulator and each element in `array`.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts four arguments: `accumulator`, `currentValue`, `currentIndex` and `array`.
 * @param {Object} [initialValue] - Used as first argument to the first call of `callback`.
 * @return {Promise} - Returns a Promise with the resultant value from the reduction.
 */
export declare const reduce: <T>(array: T[], callback: Function, initialValue?: T) => Promise<any>;
//# sourceMappingURL=pIteration.d.ts.map
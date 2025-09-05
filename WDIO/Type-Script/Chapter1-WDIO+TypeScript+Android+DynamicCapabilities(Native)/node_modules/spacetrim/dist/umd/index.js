(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.spaceTrim = {}));
})(this, (function (exports) { 'use strict';

    var NONCE = "38ea8d83-fe54-47cd-9519-90a90c58596f";
    var SPACE = "__SPACE_" + NONCE + "__";
    var NEWLINE = "__NEWLINE_" + NONCE + "__";

    /**
     * Escapes block content to protect newline and space characters
     */
    function protectBlockContent(blockContent) {
        if (typeof blockContent !== 'string') {
            // Note: This can happen when using in javascript and not in typescript
            throw new TypeError("spaceTrim nested block expected string, but got " + typeof blockContent);
        }
        return blockContent.split('\n').join(NEWLINE).split(' ').join(SPACE);
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    /**
     * Trims given string from top
     *
     * @private withing the repository
     */
    function topTrim(content) {
        var e_1, _a;
        var linesWithContent = [];
        var contentStarted = false;
        var lines = content.split('\n');
        try {
            for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                var line = lines_1_1.value;
                if (line.trim() !== '') {
                    contentStarted = true;
                }
                if (contentStarted) {
                    linesWithContent.push(line);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return linesWithContent.join('\n');
    }

    /**
     * Trims string from top and bottom new lines
     *
     * @private withing the repository
     */
    function verticalTrim(content) {
        content = topTrim(content);
        content = topTrim(content.split('\n').reverse().join('\n'))
            .split('\n')
            .reverse()
            .join('\n');
        return content;
    }

    /**
     * Trims string from all 4 sides
     *
     * Note: `spaceTrimSimple` does not support nested blocks, `spaceTrim` does
     *
     * @private withing the repository
     */
    function spaceTrimSimple(content) {
        // ✂️ Trimming from top and bottom
        content = verticalTrim(content);
        // ✂️ Trimming from left and right
        var lines = content.split('\n');
        var lineStats = lines
            .filter(function (line) { return line.trim() !== ''; })
            .map(function (line) {
            var contentStart = line.length - line.trimStart().length;
            var contentEnd = contentStart + line.trim().length;
            return { contentStart: contentStart, contentEnd: contentEnd };
        });
        if (lineStats.length === 0) {
            return '';
        }
        var _a = lineStats.reduce(
        // tslint:disable-next-line: no-shadowed-variable
        function (_a, _b) {
            var minContentStart = _a.minContentStart, maxContentEnd = _a.maxContentEnd;
            var contentStart = _b.contentStart, contentEnd = _b.contentEnd;
            return ({
                minContentStart: Math.min(minContentStart, contentStart),
                maxContentEnd: Math.max(maxContentEnd, contentEnd),
            });
        }, {
            minContentStart: lineStats[0].contentStart,
            maxContentEnd: lineStats[0].contentEnd,
        }), minContentStart = _a.minContentStart, maxContentEnd = _a.maxContentEnd;
        var horizontalyTrimmedLines = lines.map(function (line) {
            return line.substring(minContentStart, maxContentEnd);
        });
        return horizontalyTrimmedLines.join('\n');
    }

    /**
     * Unescapes block content to protect newline and space characters
     */
    function restoreBlockContent(content) {
        var horizontalyTrimmedLines = spaceTrimSimple(content).split('\n');
        horizontalyTrimmedLines = horizontalyTrimmedLines.map(function (line) {
            var sublines = line.split(NEWLINE);
            var firstSubine = sublines[0];
            var contentStart = firstSubine.length - firstSubine.trimStart().length;
            var indentation = ' '.repeat(contentStart);
            return sublines
                .map(function (subline) {
                return "" + indentation + subline
                    .trimStart()
                    .split(SPACE)
                    .join(' ');
            })
                .join('\n');
        });
        return horizontalyTrimmedLines.join('\n');
    }

    function spaceTrimNested(createContent) {
        var content = createContent(protectBlockContent);
        if (typeof content === 'string') {
            return restoreBlockContent(content);
        }
        else if (content instanceof Promise) {
            return content
                .then(function (value) {
                if (typeof value === 'string') {
                    return value;
                }
                throw new TypeError("spaceTrim expected string or Promise<string>, but got " + typeof value);
            })
                .then(restoreBlockContent);
        }
        else {
            throw new TypeError("spaceTrim expected string or Promise<string>, but got " + typeof content);
        }
    }

    function spaceTrim(contentOrcreateContent /* <- [0] */) {
        if (typeof contentOrcreateContent === 'string') {
            return spaceTrimSimple(contentOrcreateContent);
        }
        else if (typeof contentOrcreateContent === 'function') {
            return spaceTrimNested(contentOrcreateContent);
        }
        else {
            throw new TypeError("spaceTrim expected string or function as first argument, but got " + typeof contentOrcreateContent);
        }
    }
    /**
     *  TODO: Allow to change split char , char: RegExp = /\s/
     */

    exports["default"] = spaceTrim;
    exports.spaceTrim = spaceTrim;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map

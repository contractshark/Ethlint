/**
 * @fileoverview Methods exposed to rule developers to define the fixes to be applied over a range in code or an AST Node.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'astUtils'.
let astUtils = require("../utils/ast-utils");

function validateArgs(args) {
    if (args.hasOwnProperty("node")) {
        if (!astUtils.isASTNode(args.node)) {
            throw new Error("A valid AST node was not provided.");
        }
    }

    if (args.hasOwnProperty("text")) {
        let text = args.text;

        // There are no restriction on string length
        if (typeof text !== "string") {
            throw new Error("A valid string was not provided.");
        }
    }

    if (args.hasOwnProperty("range")) {
        let range = args.range;

        // @ts-expect-error ts-migrate(2550) FIXME: Property 'isInteger' does not exist on type 'Numbe... Remove this comment to see the full error message
        if (!(Array.isArray(range) && range.length === 2 && Number.isInteger(range [0]) &&
// @ts-expect-error ts-migrate(2550) FIXME: Property 'isInteger' does not exist on type 'Numbe... Remove this comment to see the full error message
			Number.isInteger(range [1]) && range [0] >= 0 && range [1] >= 0)) {
            throw new Error(
                "A valid range object was not provided. Should be an Array of 2 unsigned Integers.");
        }
    }

    if (args.hasOwnProperty("index")) {
        let index = args.index;

        // @ts-expect-error ts-migrate(2550) FIXME: Property 'isInteger' does not exist on type 'Numbe... Remove this comment to see the full error message
        if (!(Number.isInteger(index) && index >= 0)) {
            throw new Error("A valid index was not provided. Must be an unsigned Integer.");
        }
    }

    if (args.hasOwnProperty("char")) {
        let char = args.char;

        if (!(typeof char === "string" && char.length === 1)) {
            throw new Error("A valid character was not provided. Must be a string with length of 1.");
        }
    }
}


// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
function insertTextAt(index, text) {
    validateArgs({ index, text });

    return {
        range: [index, index],
        text: text
    };
}


let ruleFixerAPI = {

    insertTextAt,

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    insertTextAfter(node, text) {
        validateArgs({ node: node, text: text });
        return this.insertTextAfterRange([node.start, node.end], text);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    insertTextBefore(node, text) {
        validateArgs({ node: node, text: text });
        return this.insertTextBeforeRange([node.start, node.end], text);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    remove(node) {
        return this.removeRange([node.start, node.end]);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    replaceText(node, text) {
        validateArgs({ node: node, text: text });
        return this.replaceTextRange([node.start, node.end], text);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
    insertTextAfterRange(range, text) {
        validateArgs({ range: range, text: text });
        return insertTextAt(range [1], text);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
    insertTextBeforeRange(range, text) {
        validateArgs({ range: range, text: text });
        return insertTextAt(range [0], text);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
    removeRange(range) {
        validateArgs({ range: range });
        return this.replaceTextRange(range, "");
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
    replaceChar(index, newChar) {
        validateArgs({ index: index, char: newChar });
        return this.replaceTextRange([index, index + 1], newChar);
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
    replaceTextRange(range, text) {
        validateArgs({ range: range, text: text });
        return {
            range: range,
            text: text
        };
    }

};


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RuleFixer'... Remove this comment to see the full error message
// eslint-disable-next-line no-unused-vars
function RuleFixer(fixType) {
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'assign' does not exist on type 'ObjectCo... Remove this comment to see the full error message
    Object.assign(this, ruleFixerAPI);
}


RuleFixer.prototype = {
    constructor: RuleFixer
};


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = RuleFixer;

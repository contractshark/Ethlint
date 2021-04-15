/**
 * @fileoverview core ruleset solium:recommended. An entry exists in this set for each core rule of Solium
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    rules: {
        "imports-on-top": "error",
        "variable-declarations": "error",
        "array-declarations": "error",
        "no-unused-vars": "error",
        "quotes": "error",
        "value-in-payable": "error",
        "linebreak-style": "error",

        "no-empty-blocks": "warning",
        "indentation": "warning",
        "whitespace": "warning",
        "deprecated-suicide": "warning",
        "pragma-on-top": "warning",
        "function-whitespace": "warning",
        "semicolon-whitespace": "warning",
        "comma-whitespace": "warning",
        "operator-whitespace": "warning",
        "emit": "warning",
        "no-constant": "warning",
        "max-len": "warning",
        "error-reason": "warning",
        "constructor": "warning",
        "visibility-first": "warning",

        "lbrace": "off",
        "mixedcase": "off",
        "camelcase": "off",
        "uppercase": "off",
        "blank-lines": "off",
        "arg-overflow": "off",
        "function-order": "off",
        "conditionals-whitespace": "off",
        "no-experimental": "off",
        "no-trailing-whitespace": "warning",

        // Disable deprecated rules
        "double-quotes": "off",
        "no-with": "off"
    }

};

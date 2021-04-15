/**
 * @fileoverview Ensure that all constants (and only constants) contain only upper case letters and underscore
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: "warning",
            description: "Ensure that all constants (and only constants) contain only upper case letters and underscore"
        },

        schema: []

    },

    create(context) {

        let upperCaseRegEx = /^_{0,2}[A-Z]([A-Z_0-9]*[A-Z0-9])?_{0,2}$/;

        function reportNode(node) {
            context.report({
                node: node,
                message: `"${node.name}" doesn't follow the UPPER_CASE notation`
            });
        }

        function inspectStateVariableDeclaration(emitted) {
            let node = emitted.node;

            if (emitted.exit) {
                return;
            }

            node.is_constant && !upperCaseRegEx.test(node.name) && reportNode(node);
        }

        return {
            StateVariableDeclaration: inspectStateVariableDeclaration
        };

    }

};

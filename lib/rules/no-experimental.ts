/**
 * @fileoverview Ensure that experimental features are not used in production
 * @author Ivan Mushketyk <ivan.mushketik@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: "warning",
            description: "Ensure that experimental features are not used in production"
        },

        schema: []
    },

    create(context) {

        function reportNode(emitted) {
            if (emitted.exit) {
                return;
            }

            return context.report({
                node: emitted.node,
                message: "Avoid using experimental features in production code"
            });
        }

        return {
            ExperimentalPragmaStatement: reportNode
        };
    }
};

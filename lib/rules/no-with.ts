/**
 * @fileoverview Ensure no use of with statements in the code
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  meta: {
    docs: {
      recommended: true,
      type: 'warning',
      description: 'Ensure no use of with statements in the code',
    },

    deprecated: true,
    schema: [],
  },

  create: function (context) {
    function inspectWithStatement(emitted) {
      if (emitted.exit) {
        return;
      }

      context.report({
        node: emitted.node,
        message: "Use of 'with' statement",
      });
    }

    return {
      WithStatement: inspectWithStatement,
    };
  },
};

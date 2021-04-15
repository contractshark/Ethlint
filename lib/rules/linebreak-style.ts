/**
 * @fileoverview Ensure consistent linebreak style across codebase
 * @author Arjun Nemani <nemaniarjun@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'eol'.
const eol = require('eol');

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  meta: {
    docs: {
      recommended: true,
      type: 'error',
      description: 'Ensure consistent linebreak style across codebase',
    },
    schema: [
      {
        type: 'string',
        enum: ['unix', 'windows'],
      },
    ],
    fixable: 'whitespace',
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    let convertFn = eol.lf.bind(eol);

    if (context.options && context.options[0] === 'windows') {
      convertFn = eol.crlf.bind(eol);
    }

    function inspectProgram(emitted) {
      const { node } = emitted;
      const txt = sourceCode.getText();
      const convertedTxt = convertFn(txt);

      if (emitted.exit || convertedTxt === txt) {
        return;
      }

      // TODO: Report the exact row and column position at which the linebreak
      // violation occured. Still need to investigate the best way to calculate
      // the positions where LB is different from the expected.
      context.report({
        node,
        fix(fixer) {
          return fixer.replaceTextRange([0, txt.length], convertedTxt);
        },
        message: 'Inconsistent line-break style',
      });
    }

    return {
      Program: inspectProgram,
    };
  },
};

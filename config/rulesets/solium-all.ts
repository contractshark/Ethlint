/**
 * @fileoverview core ruleset solium:all which describes the default severity of all rules but doesn't pass any arguments.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  rules: {
    'imports-on-top': 'error',
    'variable-declarations': 'error',
    'array-declarations': 'error',
    'operator-whitespace': 'error',
    lbrace: 'error',
    'function-whitespace': 'error',
    'semicolon-whitespace': 'error',
    'comma-whitespace': 'error',
    'conditionals-whitespace': 'error',
    'value-in-payable': 'error',
    'no-unused-vars': 'error',
    quotes: 'error',
    'linebreak-style': 'error',

    mixedcase: 'warning',
    camelcase: 'warning',
    uppercase: 'warning',
    'no-empty-blocks': 'warning',
    'blank-lines': 'warning',
    indentation: 'warning',
    'arg-overflow': 'warning',
    whitespace: 'warning',
    'deprecated-suicide': 'warning',
    'pragma-on-top': 'warning',
    'function-order': 'warning',
    emit: 'warning',
    'no-constant': 'warning',
    'no-experimental': 'warning',
    'max-len': 'warning',
    'error-reason': 'warning',
    'visibility-first': 'warning',
    constructor: 'warning',
    'no-trailing-whitespace': 'warning',

    // Turn OFF all deprecated rules
    'double-quotes': 'off',
    'no-with': 'off',
  },
};

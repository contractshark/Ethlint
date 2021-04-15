/**
 * @fileoverview Schema of the soliumrc config deprecated in v1.0.0.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
let optionsSchema = require('../config').properties.options;

// A fully qualified object for this Schema is:
/*
{
	"custom-rules-filename": "~/my-life/my-rules",
	"rules": {
		"deprecated-suicide": false,
		"pragma-on-top": true
	},
	"options": { "autofix": true, "returnInternalIssues": true }
}
*/

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Schema'.
let Schema = {
  type: 'object',

  properties: {
    'custom-rules-filename': {
      oneOf: [{ type: 'string', minLength: 1 }, { type: 'null' }],
    },

    rules: {
      type: 'object',
      patternProperties: {
        '^.+$': { type: 'boolean' },
      },
      additionalProperties: false,
    },

    options: optionsSchema,
  },

  required: ['rules'],

  additionalProperties: false,
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Schema;

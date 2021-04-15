/**
 * @fileoverview Schema of Solium v1 Sharable Config.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

// A fully qualified object for this Schema is:
/*
{
	"rules": {
		"pragma-on-top": [1],
		"quotes": ["error", "double"],
		"indentation": [2, "tab"]
	}
}
*/

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
let rulesSchema = require('./config').properties.rules;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Schema'.
let Schema = {
  type: 'object',

  properties: {
    rules: rulesSchema,
  },

  required: ['rules'],
  additionalProperties: false,
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Schema;

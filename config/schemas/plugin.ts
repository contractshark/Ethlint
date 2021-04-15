/**
 * @fileoverview Schema of latest Solium Plugin.
 * Uses core-rule schema since the structure for core rules & plugins rules is same.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// A fully qualified object for this Schema is:
/*
{
	"rules": {

		"sample-rule-1": {
			"meta": {
				"docs": {
					"recommended": true,
					"type": "error",
					"description": "This is a rule",
					"replacedBy": ["new-rule"]
				},

				"schema": [],
				"fixable": "code",
				"deprecated": true
			},

			"create": function (context) {}
		}

	},

	"meta": {
		"description": "This is my badass plugin"
	}
}
*/

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'coreRule'.
let coreRule = require('./core-rule'),
  SchemaValidator = coreRule.SchemaValidator;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Schema'.
let Schema = {
  type: 'object',

  properties: {
    rules: {
      type: 'object',
      patternProperties: { '^.+$': coreRule.Schema },
      additionalProperties: false,
    },

    meta: {
      type: 'object',
      properties: {
        description: { type: 'string', minLength: 1 },
      },
      required: ['description'],
      additionalProperties: false,
    },
  },

  required: ['rules', 'meta'],
  additionalProperties: false,
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  Schema: Schema,
  validationFunc: SchemaValidator.compile(Schema),
};

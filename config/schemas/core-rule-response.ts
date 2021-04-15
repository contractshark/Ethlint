/**
 * @fileoverview Schema of the latest Solium core rule response object.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// A fully qualified object for this Schema is:
/*
{
	"Literal": function (context) {
		// ...
	},

	"Program": function (context) {
		// ...
	}
}
*/

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SchemaVali... Remove this comment to see the full error message
let SchemaValidator = require("./core-rule").SchemaValidator;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Schema'.
let Schema = {
    type: "object",

    patternProperties: {
        "^.+$": {
            shouldBeOfTypeFunction: true	// This custom attribute is defined in SchemaValidator of ./core-rule.js
        }
    },

    additionalProperties: false
};


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { Schema: Schema, SchemaValidator: SchemaValidator };

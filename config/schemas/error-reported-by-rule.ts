/**
 * @fileoverview Schema of the error object supplied by a rule to rule-context via report() method.
 * NOTE: This is NOT the final error object supplied to solium & then to user.
 *
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// A fully qualified object for this Schema is:
/*
{
	"message": "Hello World",
	"node": {
		"type": "Literal",
		"start": 0,
		"end": 90
	},
	"location": {
		"line": 3,
		"column": 90
	},
	"fix": function (fixer) {
		// ...
	}
}
*/

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Ajv'.
let Ajv = require("ajv"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'astNode'.
    astNode = require("./ast-node"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SchemaVali... Remove this comment to see the full error message
    SchemaValidator = new Ajv({ allErrors: true });


SchemaValidator.addKeyword("shouldBeOfTypeFunction", {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isSet' implicitly has an 'any' type.
    validate: function(isSet, attr) {
        return isSet === (typeof attr === "function");
    }
});

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Schema'.
let Schema = {

    type: "object",
    properties: {

        message: { type: "string", minLength: 1 },
        node: astNode,
        fix: { shouldBeOfTypeFunction: true },
        location: {
            type: "object",
            properties: {
                line: { type: "integer", minimum: 1 },	// line starts from 1
                column: { type: "integer", minimum: 0 }	// column starts from 0
            },
            additionalProperties: false
        }

    },

    required: ["message", "node"],
    additionalProperties: false

};


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
    schema: Schema, validationFunc: SchemaValidator.compile(Schema)
};
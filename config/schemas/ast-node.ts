/**
 * @fileoverview Schema of an Abstract Syntax Tree Node.
 * This schema only describes the properies that are mandatory across all nodes.
 * Additional attrs can exist depending on the entity the Node represents.
 *
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// A fully qualified, minimal object for this Schema is:
/*
{
	"type": "Literal",
	"start": 13,
	"end": 25
}
*/

let array = { type: 'array' },
  number = { type: 'number' },
  bool = { type: 'boolean' },
  string = { type: 'string' },
  object = { type: 'object' },
  attrNull = { type: 'null' };

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Schema'.
let Schema = {
  type: 'object',

  properties: {
    type: { type: 'string', minLength: 1 },
    start: { type: 'integer', minimum: 0 },
    end: { type: 'integer', minimum: 0 },
  },

  patternProperties: {
    '^.+$': {
      oneOf: [array, string, object, number, attrNull, bool],
    },
  },

  required: ['type', 'start', 'end'],
  additionalProperties: false,
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Schema;

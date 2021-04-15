/**
 * @fileoverview Utility functions for examining a rule object
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
let coreRuleSchema = require('../../config/schemas/core-rule'),
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  coreRuleResponseSchema = require('../../config/schemas/core-rule-response');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SchemaVali... Remove this comment to see the full error message
let SchemaValidator = coreRuleSchema.SchemaValidator,
  validateCoreRule = SchemaValidator.compile(coreRuleSchema.Schema),
  validateCoreRuleResponse = SchemaValidator.compile(
    coreRuleResponseSchema.Schema,
  );

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  /**
   * Determine whether the supplied argument qualifies as a core rule object
   * @param {Object} ruleObject The object to validate
   * @returns {Boolean} isValid True if object is a valid core solium rule, false otherwise.
   */
  isAValidRuleObject: validateCoreRule,

  /**
   * Determine whether the response given by a rule's create() method is a set of valid
   * node names (event listeners) with their corresponding handler functions.
   * @param {Object} ruleResponseObject Object to validate
   * @returns {Boolean} isValid True if object is a valid rule response, false otherwise.
   */
  isAValidRuleResponseObject: validateCoreRuleResponse,

  /**
   * Determine whether the options object supplied is valid according to the schema passed.
   * @param {Array} options List of options
   * @param {Array} listItemsSchema A list of schema objects defining schema for every item in the options list.
   * @returns {Boolean} isValid True if options list is valid, false otherwise.
   */
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
  areValidOptionsPassed: function (options, listItemsSchema) {
    let validateOptionsList = SchemaValidator.compile({
      type: 'array',
      minItems: listItemsSchema.length,
      additionalItems: false,
      items: listItemsSchema,
    });

    return validateOptionsList(options);
  },
};

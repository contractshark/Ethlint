/**
 * @fileoverview Utility functions to examine the state of a configuration object obtained from soliumrc.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Ajv'.
let Ajv = require("ajv"),
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    currentConfigSchema = require("../../config/schemas/config"),
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    deprecatedConfigSchema = require("../../config/schemas/deprecated/config-v0.5.5"),
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    sharableConfigSchema = require("../../config/schemas/sharable-config");

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'SchemaVali... Remove this comment to see the full error message
let SchemaValidator = new Ajv({ allErrors: true }),
    validateCurrentConfig = SchemaValidator.compile(currentConfigSchema),
    validateDepConfig = SchemaValidator.compile(deprecatedConfigSchema),
    validateSharableConfig = SchemaValidator.compile(sharableConfigSchema);


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    /**
	 * Determine whether a valid configuration object was passed by user.
	 * @param {Object} config The config object to examine.
	 * @returns {Boolean} decision True if config is valid, false otherwise.
	 */
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'config' implicitly has an 'any' type.
    isValid: function(config) {
        return (validateCurrentConfig(config) || validateDepConfig(config));
    },

    /**
	 * Determine whether the configuration object passed by user is a current one or a deprecated one.
	 * @param {Object} config The config object to examine.
	 * @returns {Boolean} decision True if config is deprecated, false otherwise.
	 */
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'config' implicitly has an 'any' type.
    isFormatDeprecated: function(config) {
        // This function assumes that a VALID config object is passed, ie, the object has passed isValid() test above.
        return !validateCurrentConfig(config);
    },

    /**
	 * Determine whether the supplied config is a valid Sharable Config
	 * @param {Object} config The config object to examine.
	 * @returns {Boolean} decision True if config is valid, false otherwise.
	 */
    isAValidSharableConfig: validateSharableConfig

};

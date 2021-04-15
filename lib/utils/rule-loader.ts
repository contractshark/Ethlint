/**
 * @fileoverview Load specified rule definitions from the given rule repository.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
let path = require('path'),
  util = require('util');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
let isAValidSharableConfig = require('./config-inspector')
  .isAValidSharableConfig;

let constants = {
  SOLIUM_RULESET_ALL: 'solium:all',
  SOLIUM_RULESET_RECOMMENDED: 'solium:all',
  SOLIUM_CORE_RULES_DIRNAME: 'rules',
  SOLIUM_PLUGIN_PREFIX: 'solium-plugin-',
  SOLIUM_SHARABLE_CONFIG_PREFIX: 'solium-config-',
};

// @ts-expect-error ts-migrate(2551) FIXME: Property 'SOLIUM_CORE_RULES_DIRPATH' does not exis... Remove this comment to see the full error message
constants.SOLIUM_CORE_RULES_DIRPATH =
  '../' + constants.SOLIUM_CORE_RULES_DIRNAME;

/**
 * Given a ruleset name, determine whether its a core set or a sharable config and load the rule config accordingly.
 * @param {String} upstream The ruleset to resolve
 * @returns {Object} ruleConfigs Set of rule configs exported by the upstream ruleset.
 */
function resolveUpstream(upstream) {
  let coreRulesetRegExp = /^solium:[a-z_]+$/;

  // Determine whether upstream is a solium core ruleset or a sharable config.
  if (coreRulesetRegExp.test(upstream)) {
    try {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
      return require('../../config/rulesets/solium-' + upstream.split(':')[1])
        .rules;
    } catch (e) {
      throw new Error('"' + upstream + '" is not a core ruleset.');
    }
  }

  // If flow reaches here, it means upstream is a sharable config.
  let configName = constants.SOLIUM_SHARABLE_CONFIG_PREFIX + upstream,
    config;

  try {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    config = require(configName);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      throw new Error(
        'The sharable config "' +
          configName +
          '" is not installed. ' +
          'If Solium is installed globally, install the config globally using ' +
          '"npm install -g ' +
          configName +
          '". Else install locally using ' +
          '"npm install --save-dev ' +
          configName +
          '".',
      );
    }

    throw new Error(
      'The sharable config "' +
        configName +
        '" could not be loaded: ' +
        e.message,
    );
  }

  if (isAValidSharableConfig(config)) {
    return config.rules;
  }

  throw new Error(
    'Invalid sharable config "' +
      configName +
      '". AJV message:\n' +
      util.inspect(isAValidSharableConfig.errors),
  );
}

/**
 * Create provided plugin's default rule configuration
 * @param {String} name Plugin name without 'solium-plugin-' prefix
 * @param {Object} plugin The plugin Object as exported by the solium plugin
 * @returns {Object} config Rule configuration object for the given plugin
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
function resolvePluginConfig(name, plugin) {
  let config = {};

  Object.keys(plugin.rules).forEach(function (ruleName) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    config[name + '/' + ruleName] = plugin.rules[ruleName].meta.docs.type;
  });

  return config;
}

/**
 * Load rule definitions (rule objects) from Solium's core rule directory & from pre-installed linter plugins.
 * @param {Array} listOfRules List of string that representing rule file names in the rule dir.
 * @returns {Object} ruleDefs Object of key: rule name & value: rule object exported by corresponding Solium rule definition.
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'listOfRules' implicitly has an 'any' ty... Remove this comment to see the full error message
function load(listOfRules) {
  let ruleDefs = {};

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
  listOfRules.forEach(function (name) {
    // If the rule is part of a plugin, first load the plugin assuming that it has already been installed
    // in the same scope as Solium (global/project). Then return the appropriate rule from that plugin.
    if (name.indexOf('/') > -1) {
      let parts = name.split('/'),
        pluginName = constants.SOLIUM_PLUGIN_PREFIX + parts[0],
        ruleName = parts[1],
        plugin;

      try {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        plugin = require(pluginName);
      } catch (e) {
        throw new Error('Unable to load Plugin "' + pluginName + '".');
      }

      // No need to verify whether this rule's implementation exists & is valid or not.
      // That is done at a later stage in solium.js itself using rule-inspector.
      // TODO: Examine "peerDependencies" of the plugin to ensure its compatible with current version of Solium.
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return (ruleDefs[name] = plugin.rules[ruleName]);
    }

    // If we're here, it means the rule is just a regular core rule :)
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'SOLIUM_CORE_RULES_DIRPATH' does not exis... Remove this comment to see the full error message
    let ruleFile = path.join(constants.SOLIUM_CORE_RULES_DIRPATH, name);

    try {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ruleDefs[name] = require(ruleFile);
    } catch (e) {
      throw new Error('Unable to read ' + ruleFile);
    }
  });

  return ruleDefs;
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  load: load,
  constants: constants,
  resolveUpstream: resolveUpstream,
  resolvePluginConfig: resolvePluginConfig,
};

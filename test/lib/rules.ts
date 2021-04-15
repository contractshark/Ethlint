/**
 * @fileoverview Tests for lib/rules.js
 * NOTE: We need not test invalid config objects here, they're ruled out by config-inspector in solium.js itself.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'rules'.
let rules = require("../../lib/rules"),
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    path = require("path");

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
describe("Checking exported rules object", function() {

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
    it("should be an object that exposes a set of functions", function(done) {
        rules.should.be.type("object");
        rules.should.be.size(5);

        rules.should.have.ownProperty("loadUsingDeprecatedConfigFormat");
        rules.loadUsingDeprecatedConfigFormat.should.be.type("function");

        rules.should.have.ownProperty("get");
        rules.get.should.be.type("function");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.should.have.ownProperty("reset");
        rules.reset.should.be.type("function");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'reset' does not exist on type '{}'.
        rules.should.have.ownProperty("load");
        rules.load.should.be.type("function");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        rules.should.have.ownProperty("getRuleSeverity");
        rules.getRuleSeverity.should.be.type("function");

        done();
    });

    it("should handle invalid arguments passed to rules.get ()", function(done) {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        rules.get.bind(rules).should.throw();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        rules.get.bind(rules, null).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, 100).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, "").should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, []).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, {}).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, 89.18).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, function(){}).should.throw();

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.get.bind(rules, "foobar").should.not.throw();

        done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
    it("should handle invalid arguments passed to rules.loadUsingDeprecatedConfigFormat ()", function(done) {
        //invalid userRules object
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        rules.loadUsingDeprecatedConfigFormat.bind(rules).should.throw();
        rules.loadUsingDeprecatedConfigFormat.bind(rules, null).should.throw();
        rules.loadUsingDeprecatedConfigFormat.bind(rules, []).should.throw();

        //valid userRules object
        rules.loadUsingDeprecatedConfigFormat.bind(rules, {}).should.not.throw();

        //specified rule is neither pre-defined nor custom
        rules.loadUsingDeprecatedConfigFormat.bind(rules, { "NON_EXISTANT_RULE_1": true }).should.throw();

        done();
    });

    it("should return a rule object after valid call to loadUsingDeprecatedConfigFormat () & get ()", function(done) {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        let config = { "mixedcase": true, "camelcase": false, "lbrace": true };
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        rules.loadUsingDeprecatedConfigFormat(config, path.join(__dirname, "../extras/custom-rules-file.js"));

        let ret = rules.get("mixedcase");
        ret.should.be.type("object");
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
        ret.should.have.ownProperty("create");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        ret.create.should.be.type("function");

        ret = rules.get("camelcase");
        (typeof ret).should.equal("undefined");

        //overlapping rule - lbrace (custom) should overwrite lbrace (pre-defined)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        ret = rules.get("lbrace");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '"string"... Remove this comment to see the full error message
        ret.should.be.type("object");
        ret.should.have.ownProperty("create");
        ret.create.should.be.type("function");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        //rule definition exists in the file but shouldn't be included in rules because we don't enable it
        ret = rules.get("not-included");
        (typeof ret).should.equal("undefined");

        config = { "CUSTOM_RULE": true };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        rules.loadUsingDeprecatedConfigFormat.bind(rules, config, path.join(__dirname, "../extras/custom-rules-file.js")).should.throw();
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ CUSTOM_RULE: boolean; }' is not assignable... Remove this comment to see the full error message

        rules.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    it("rules set to false to be deleted, rest (pre-defined) should be expanded with rule meta info in loadUsingDeprecatedConfigFormat()", function(done) {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        let config = {
            "mixedcase": true,
            "camelcase": false,
            "lbrace": true,
            "NON_EXISTANT_RULE_2": false
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        };

        rules.loadUsingDeprecatedConfigFormat(config, path.join(__dirname, "../extras/custom-rules-file.js"));

        config.should.be.type("object");
        config.should.not.have.ownProperty("camelcase");
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
        config.should.not.have.ownProperty("NON_EXISTANT_RULE_2");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '{ mixedc... Remove this comment to see the full error message
        //a non-existant rule set to true must NOT be deleted by load (), this might be a custom-defined rule

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '{ mixedc... Remove this comment to see the full error message
        config.should.have.ownProperty("mixedcase");
        config.mixedcase.should.be.type("object");
        config.mixedcase.should.have.ownProperty("enabled");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '{ mixedc... Remove this comment to see the full error message
        config.mixedcase.enabled.should.equal(true);
        config.mixedcase.should.have.ownProperty("custom");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.mixedcase.custom.should.equal(false);
        config.mixedcase.should.have.ownProperty("recommended");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'enabled' does not exist on type 'boolean... Remove this comment to see the full error message
        config.mixedcase.recommended.should.be.type("boolean");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'custom' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.mixedcase.should.have.ownProperty("type");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.mixedcase.should.have.ownProperty("description");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'recommended' does not exist on type 'boo... Remove this comment to see the full error message
        config.mixedcase.should.have.ownProperty("id");
        config.mixedcase.id.should.be.type("number");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.should.have.ownProperty("lbrace");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.lbrace.should.be.type("object");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.lbrace.should.have.ownProperty("enabled");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'boolean'.
        config.lbrace.enabled.should.equal(true);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '{ mixedc... Remove this comment to see the full error message
        config.lbrace.should.have.ownProperty("custom");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.lbrace.custom.should.equal(false);
        config.lbrace.should.have.ownProperty("type");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'enabled' does not exist on type 'boolean... Remove this comment to see the full error message
        config.lbrace.type.should.equal("error");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.lbrace.should.have.ownProperty("id");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'custom' does not exist on type 'boolean'... Remove this comment to see the full error message
        config.lbrace.id.should.be.type("number");

        done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
    it("should handle invalid arguments passed to getRuleSeverity()", function(done) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'boolean'.
        rules.getRuleSeverity.bind(rules, undefined).should.throw();
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, null).should.throw();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        rules.getRuleSeverity.bind(rules, {}).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, 19.8927).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, -1).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, 3).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, 19028).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, "arbitrary").should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, { a: true, b: "c" }).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, []).should.throw();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity.bind(rules, [null]).should.throw();

        done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
    it("should return severity integer when a valid config value is passed", function(done) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity(0).should.equal(0);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity(1).should.equal(1);
        rules.getRuleSeverity(2).should.equal(2);
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        rules.getRuleSeverity("off").should.equal(0);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        rules.getRuleSeverity("warning").should.equal(1);
        rules.getRuleSeverity("error").should.equal(2);
        rules.getRuleSeverity([0]).should.equal(0);
        rules.getRuleSeverity([1]).should.equal(1);
        rules.getRuleSeverity([2]).should.equal(2);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity(["off"]).should.equal(0);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity(["warning"]).should.equal(1);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
        rules.getRuleSeverity(["error"]).should.equal(2);

        done();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
    it("should load rules from the new config format using load() when both \"extends\" & \"rules\" are passed", function(done) {
        let config = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
            "extends": "solium:all",
            "plugins": [],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRuleSeverity' does not exist on type ... Remove this comment to see the full error message
            "rules": {
                "pragma-on-top": "off",
                // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
                "no-with": "warning",
                "deprecated-suicide": "error",
                "variable-declarations": 0,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
                "imports-on-top": 1,
                "array-declarations": 2,
                "operator-whitespace": ["off", "double"],
                "lbrace": ["warning", 1, 2, { a: 100, h: "world" }],
                "mixedcase": ["error"],
                "camelcase": [0, 100, "hello", 9.283],
                "uppercase": [1],
                "double-quotes": [2, "double"]
            },
            "options": { "autofix": false }
        };

        let ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");

        ruleDescriptions.should.not.have.ownProperty("pragma-on-top");
        ruleDescriptions.should.not.have.ownProperty("variable-declarations");
        ruleDescriptions.should.not.have.ownProperty("operator-whitespace");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        ruleDescriptions.should.not.have.ownProperty("camelcase");

        ruleDescriptions ["no-with"].type.should.equal("warning");
        ruleDescriptions ["imports-on-top"].type.should.equal("warning");
        ruleDescriptions ["lbrace"].type.should.equal("warning");
        ruleDescriptions ["uppercase"].type.should.equal("warning");

        ruleDescriptions ["deprecated-suicide"].type.should.equal("error");
        ruleDescriptions ["array-declarations"].type.should.equal("error");
        ruleDescriptions ["mixedcase"].type.should.equal("error");
        ruleDescriptions ["double-quotes"].type.should.equal("error");

        // We extend ALL solium core rules and eliminate a few by setting their severity to 0.
        // The rest of the rules should all be available.
        // The below count will keep changing with every change in the number of core rules that exist in solium.
        Object.keys(ruleDescriptions).length.should.equal(30);

        done();
    });

    it("should load rules from the new config format using load() when only \"rules\" is passed", function(done) {
        let config = {
            "rules": {
                "pragma-on-top": "off",
                "no-with": "warning",
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'number'.
                "deprecated-suicide": "error",
                // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
                "variable-declarations": 0,
                "imports-on-top": 1,
                "array-declarations": 2,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
                "operator-whitespace": ["off", "double"],
                "lbrace": ["warning", 1, 2, { a: 100, h: "world" }],
                "mixedcase": ["error"],
                "camelcase": [0, 100, "hello", 9.283],
                "uppercase": [1],
                "double-quotes": [2, "double"]
            }
        };

        let ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");

        ruleDescriptions.should.not.have.ownProperty("pragma-on-top");
        ruleDescriptions.should.not.have.ownProperty("variable-declarations");
        ruleDescriptions.should.not.have.ownProperty("operator-whitespace");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        ruleDescriptions.should.not.have.ownProperty("camelcase");

        ruleDescriptions ["no-with"].type.should.equal("warning");
        ruleDescriptions ["imports-on-top"].type.should.equal("warning");
        ruleDescriptions ["lbrace"].type.should.equal("warning");
        ruleDescriptions ["uppercase"].type.should.equal("warning");

        ruleDescriptions ["deprecated-suicide"].type.should.equal("error");
        ruleDescriptions ["array-declarations"].type.should.equal("error");
        ruleDescriptions ["mixedcase"].type.should.equal("error");
        ruleDescriptions ["double-quotes"].type.should.equal("error");

        // Check for existence of options
        ruleDescriptions ["lbrace"].should.have.ownProperty("options");
        ruleDescriptions ["lbrace"].options.should.be.Array();

        ruleDescriptions ["double-quotes"].should.have.ownProperty("options");
        ruleDescriptions ["double-quotes"].options.should.be.Array();

        // Check for options contents
        ruleDescriptions ["lbrace"].options.length.should.equal(3);
        ruleDescriptions ["lbrace"].options [0].should.equal(1);

        ruleDescriptions ["double-quotes"].options.length.should.equal(1);
        ruleDescriptions ["double-quotes"].options [0].should.equal("double");

        // Also ensure that these rules' definitions are loaded as expected
        Object.keys(ruleDescriptions).forEach(function(name) {
            let ruleDefinition = rules.get(name);

            ruleDefinition.should.be.type("object");
            ruleDefinition.should.have.size(2);
            ruleDefinition.should.have.ownProperty("meta");
            ruleDefinition.should.have.ownProperty("create");
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
            ruleDefinition.meta.should.be.type("object");
            ruleDefinition.create.should.be.type("function");
        });

        // There should be exactly 8 properties - the rules described in "rules" with severity > 0.
        Object.keys(ruleDescriptions).length.should.equal(8);

        done();
    });

    it("should load rules from specified plugin(s) if they are installed", function(done) {
        let config = {
            "extends": "solium:all",
            "plugins": ["test"],
            "rules": {
                "quotes": 1,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'number'.
                "test/foo": 1,
                // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
                "test/bar": ["error"]
            }
        };

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");
        ruleDescriptions.should.have.ownProperty("test/foo");
        ruleDescriptions ["test/foo"].type.should.equal("warning");
        ruleDescriptions.should.have.ownProperty("test/bar");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        ruleDescriptions ["test/bar"].type.should.equal("error");

        ["test/foo", "test/bar"].forEach(function(name) {
            let ruleDefinition = rules.get(name);

            ruleDefinition.should.be.type("object");
            ruleDefinition.should.have.size(2);
            ruleDefinition.should.have.ownProperty("meta");
            ruleDefinition.should.have.ownProperty("create");
            ruleDefinition.meta.should.be.type("object");
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
            ruleDefinition.create.should.be.type("function");
        });


        delete config.extends;
        config.rules ["test/foo"] = [2];
        ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");
        ruleDescriptions.should.have.ownProperty("test/foo");
        ruleDescriptions ["test/foo"].type.should.equal("error");
        // @ts-expect-error ts-migrate(2790) FIXME: The operand of a 'delete' operator must be optiona... Remove this comment to see the full error message
        ruleDescriptions.should.have.ownProperty("test/bar");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        ruleDescriptions ["test/bar"].type.should.equal("error");

        ["test/foo", "test/bar"].forEach(function(name) {
            let ruleDefinition = rules.get(name);

            ruleDefinition.should.be.type("object");
            ruleDefinition.should.have.size(2);
            ruleDefinition.should.have.ownProperty("meta");
            ruleDefinition.should.have.ownProperty("create");
            ruleDefinition.meta.should.be.type("object");
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
            ruleDefinition.create.should.be.type("function");
        });


        delete config.rules.quotes;
        config.rules ["test/foo"] = [1];
        ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");
        ruleDescriptions.should.have.ownProperty("test/foo");
        ruleDescriptions ["test/foo"].type.should.equal("warning");
        // @ts-expect-error ts-migrate(2790) FIXME: The operand of a 'delete' operator must be optiona... Remove this comment to see the full error message
        ruleDescriptions.should.have.ownProperty("test/bar");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        ruleDescriptions ["test/bar"].type.should.equal("error");

        ["test/foo", "test/bar"].forEach(function(name) {
            let ruleDefinition = rules.get(name);

            ruleDefinition.should.be.type("object");
            ruleDefinition.should.have.size(2);
            ruleDefinition.should.have.ownProperty("meta");
            ruleDefinition.should.have.ownProperty("create");
            ruleDefinition.meta.should.be.type("object");
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
            ruleDefinition.create.should.be.type("function");
        });


        delete config.rules;
        config.extends = "solium:all";
        config.rules = { "test/foo": "error", "test/bar": 1 };
        ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");
        ruleDescriptions.should.have.ownProperty("test/foo");
        // @ts-expect-error ts-migrate(2790) FIXME: The operand of a 'delete' operator must be optiona... Remove this comment to see the full error message
        ruleDescriptions ["test/foo"].type.should.equal("error");
        ruleDescriptions.should.have.ownProperty("test/bar");
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
        ruleDescriptions ["test/bar"].type.should.equal("warning");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        ["test/foo", "test/bar"].forEach(function(name) {
            let ruleDefinition = rules.get(name);

            ruleDefinition.should.be.type("object");
            ruleDefinition.should.have.size(2);
            ruleDefinition.should.have.ownProperty("meta");
            ruleDefinition.should.have.ownProperty("create");
            ruleDefinition.meta.should.be.type("object");
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
            ruleDefinition.create.should.be.type("function");
        });


        delete config.rules;
        ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");
        ruleDescriptions.should.have.ownProperty("test/foo");
        ruleDescriptions.should.have.ownProperty("test/bar");

        ["test/foo", "test/bar"].forEach(function(name) {
            // @ts-expect-error ts-migrate(2790) FIXME: The operand of a 'delete' operator must be optiona... Remove this comment to see the full error message
            (rules.get(name) === undefined).should.be.false();
        });


        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        config.rules = { "test/foo": 0, "test/bar": 0 };
        ruleDescriptions = rules.load(config);

        ruleDescriptions.should.be.type("object");
        ruleDescriptions.should.not.have.ownProperty("test/foo");
        ruleDescriptions.should.not.have.ownProperty("test/bar");

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        ["test/foo", "test/bar"].forEach(function(name) {
            (rules.get(name) === undefined).should.be.true();
        });

        done();
    });
// @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.

    it("should handle when a specified plugin is not installed", function(done) {
        let config = {
            "extends": "solium:all",
            "plugins": ["16%^54#$^%3"]
        };

        rules.load.bind(rules, config).should.throw();

        config.plugins = "test";
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'get' does not exist on type '{}'.
        config.rules = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
            "test/somerandomrule": 1
        };

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        rules.load.bind(rules, config).should.throw();

        config = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
            "extends": "solium:all",
            "plugins": ["test-invalid-schema"]
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        rules.load.bind(rules, config).should.throw();

        done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rules' does not exist on type '{ extends... Remove this comment to see the full error message
    it("should throw when a non-existant plugin rule is specified in config", done => {
        const config = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
            "rules": {
                "security/buttercup": 2
            }
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'load' does not exist on type '{}'.
        rules.load.bind(rules, config).should.throw("\"security/buttercup\" - No such rule exists.");
        done();
    });

});
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message

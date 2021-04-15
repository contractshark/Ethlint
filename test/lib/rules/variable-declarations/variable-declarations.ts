/**
 * @fileoverview Tests for variable-declarations rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require("../../../../lib/solium"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
    wrappers = require("../../../utils/wrappers");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toFunction... Remove this comment to see the full error message
let toFunction = wrappers.toFunction, toContract = wrappers.toContract;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
    "custom-rules-filename": null,
    "rules": {
        "variable-declarations": true
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] variable-declarations: Rejections", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all variables having names \"l\", \"o\" or \"I\"", function(done) {
        let declarations = [
            "var l; var O; var I;",
            "uint l; uint O; uint I;",
            "string l; string O; string I;",
            "bytes32 l; bytes32 O; bytes32 I;",
            "mapping (uint => string) l; mapping (uint => string) O; mapping (uint => string) I;"
        ];
        let errors, code;

        code = declarations.map(function(item){return toFunction(item);});
		
        errors = Solium.lint(code [0], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [1], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [2], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [3], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [4], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);


        // var cannot be used to declare state variables, so truncate it from declarations array.
        code = declarations.slice(1).map(function(item){return toContract(item);});

        errors = Solium.lint(code [0], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [1], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [2], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        errors = Solium.lint(code [3], userConfig);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(3);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject variables whose names are provided via config instead of the default names", function(done) {
        let configWithCustomVarNames = {
            "rules": {
                "variable-declarations": ["error", ["myOwnVar", "myOwnVar2"]]
            }
        };

        let declarations = [
            "var l; var O; var I;",
            "uint l; uint O; uint I;",
            "string l; string O; string I;",
            "bytes32 l; bytes32 O; bytes32 I;",
            "mapping (uint => string) l; mapping (uint => string) O; mapping (uint => string) I;",

            "var myOwnVar; var myOwnVar2;",
            "uint myOwnVar; uint myOwnVar2;",
            "string myOwnVar; string myOwnVar2;",
            "bytes32 myOwnVar; bytes32 myOwnVar2;",
            "mapping (uint => string) myOwnVar; mapping (uint => string) myOwnVar2;"
        ];
        let errors, code;

        code = declarations.map(function(item){return toFunction(item);});
		
        errors = Solium.lint(code [0], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [1], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [2], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [3], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [4], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [5], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [6], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [7], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [8], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [9], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);


        // var cannot be used to declare state variables, so truncate it from declarations array.
        code = declarations.slice(1).map(function(item){return toContract(item);});

        errors = Solium.lint(code [0], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [1], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [2], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        errors = Solium.lint(code [3], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        // code [4] was purposely skipped since it is var and var can't be a state variable
        errors = Solium.lint(code [5], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [6], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [7], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        errors = Solium.lint(code [8], configWithCustomVarNames);
        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should not accept invalid values for its option", function(done) {
        let configWithCustomVarNames = {
            "rules": {
                "variable-declarations": ["error", null]
            }
        };
        let code = toFunction(""),
            exceptionMessage = "Invalid options were passed to rule \"variable-declarations\".";

        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'string'.
        configWithCustomVarNames.rules ["variable-declarations"] [1] = {};
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // @ts-expect-error ts-migrate(2322) FIXME: Type '0' is not assignable to type 'string | null'... Remove this comment to see the full error message
        configWithCustomVarNames.rules ["variable-declarations"] [1] = 0;
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        configWithCustomVarNames.rules ["variable-declarations"] [1] = "";
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        configWithCustomVarNames.rules ["variable-declarations"] [1] = "hello world";
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        configWithCustomVarNames.rules ["variable-declarations"] [1] = ["d", 10];
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        configWithCustomVarNames.rules ["variable-declarations"] [1] = [{}];
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'string'.
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string'.
        configWithCustomVarNames.rules ["variable-declarations"] [1] = [null];
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // @ts-expect-error ts-migrate(2322) FIXME: Type '190.2897' is not assignable to type 'string ... Remove this comment to see the full error message
        configWithCustomVarNames.rules ["variable-declarations"] [1] = 190.2897;
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        configWithCustomVarNames.rules ["variable-declarations"] [1] = [-1982];
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // @ts-expect-error ts-migrate(2322) FIXME: Type '-1982' is not assignable to type 'string | n... Remove this comment to see the full error message
        configWithCustomVarNames.rules ["variable-declarations"] [1] = -1982;
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        // Empty array is a invalid option. If you need to allow all names, simply disable the rule.
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'never[]' is not assignable to type 'string'.
        configWithCustomVarNames.rules ["variable-declarations"] [1] = [];
        Solium.lint.bind(Solium, code, configWithCustomVarNames).should.throw(exceptionMessage);

        Solium.reset();
        done();
    });

});

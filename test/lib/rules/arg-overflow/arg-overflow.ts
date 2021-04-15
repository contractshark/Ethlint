/**
 * @fileoverview Tests for indentation rules
 * @author Alex Chapman <achap5dk@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require("../../../../lib/solium"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
    wrappers = require("../../../utils/wrappers");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
let toContract = wrappers.toContract, toFunction = wrappers.toFunction;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
    "custom-rules-filename": null,
    "rules": {
        "arg-overflow": true
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] arg-overflow: Rejections", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should enforce the rule that excess element lists must go on individual lines", function(done) {
        let code = toContract("function ArgumentOverflow(int one, int two, int three, int four) {}"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);
        errors[0].message.should.equal(
            "In case of more than 3 parameters, drop each into its own line.");
        
        code = toContract("constructor(int one, int two, int three, int four) {}"),
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);
        errors[0].message.should.equal(
            "In case of more than 3 parameters, drop each into its own line.");

        code = toFunction("myFuncCall (10, \"hello world\", 20.67, 0x0);");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);
        errors [0].message.should.equal(
            "Function \"myFuncCall\": in case of more than 3 arguments, drop each into its own line.");

        code = toFunction("uint[] x = [1,2,3,4];");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);
        errors [0].message.should.equal(
            "In case of more than 3 elements, array expression needs to be spread over multiple lines with 1 element per line.");

        code = toContract("struct Sample {address a; uint b; string c; int d;}");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);
        errors [0].message.should.equal(
            "\"Sample\": In case of more than 3 properties, struct declaration needs to be spread over multiple lines with 1 property per line.");

        Solium.reset();
        done();
    });

});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] arg-overflow: Acceptances", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept <= 3 arguments on single line", function(done) {
        let code = toContract("function ArgumentOverflow(int one, int two, int three) {}"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("myFuncCall (10, \"hello world\", 20.67);");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("uint[] x = [1,2,3];");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toContract("struct Sample {address a; uint b; string c;}");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept > 3 arguments only when they are on their own lines", function(done) {
        let code = toContract("function ArgumentOverflow(\nint one,\nint two,\nint three,\nint four) {}"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("myFuncCall (\n10,\n\"hello world\",\n20.67,\n0x0);");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("uint[] x = [\n1,\n2,\n3,\n4];");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toContract("struct Sample {\naddress a;\nuint b;\nstring c; \nuint d;}");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        Solium.reset();
        done();
    });

});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] arg-overflow: Handling options", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept <= N arguments in same line, N supplied through config", function(done) {
        let userConfig = {
            "rules": {
                "arg-overflow": [1, 4]
            }
        };

        let code = toContract("function ArgumentOverflow(int one, int two, int three, int four) {}"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("myFuncCall (10, \"hello world\", 20.67, 0x0);");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("uint[] x = [1,2,3,6];");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toContract("struct Sample {address a; uint b; string c; int d;}");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);


        code = toFunction("myFuncCall (\n10,\n\"hello world\",\n20.67,\n0x0,\n100);");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toFunction("uint[] x = [\n1,\n2,\n3,\n4,\n10];");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        code = toContract("struct Sample {\naddress a;\nuint b;\nstring c; \nuint d;\nstring x;}");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(0);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject > N arguments in same line, N supplied through config", function(done) {
        let userConfig = {
            "rules": {
                "arg-overflow": [1, 4]
            }
        };

        let code = toContract("function ArgumentOverflow(int one, int two, int three, int four, int five) {}"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);

        code = toFunction("myFuncCall (10, \"hello world\", 20.67, 0x0, 100);");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);

        code = toFunction("uint[] x = [1,2,3,6,18];");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);

        code = toContract("struct Sample {address a; uint b; string c; int d; string f;}");
        errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.length.should.equal(1);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject invalid option values", function(done) {
        let config = {
            "rules": {
                "arg-overflow": [1, 0]
            }
        };
        let code = toContract("struct A { uint i; }");

        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'number'.
        config.rules ["arg-overflow"] [1] = null;
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'never[]' is not assignable to type 'number'.
        config.rules ["arg-overflow"] [1] = [];
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'number'.
        config.rules ["arg-overflow"] [1] = {};
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        config.rules ["arg-overflow"] [1] = 9.2;
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        config.rules ["arg-overflow"] [1] = -1;
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number[]' is not assignable to type 'number'... Remove this comment to see the full error message
        config.rules ["arg-overflow"] [1] = [2];
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        config.rules ["arg-overflow"] [1] = 4.01;
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
        config.rules ["arg-overflow"] [1] = "winniethepooh";
        Solium.lint.bind(
            Solium, code, config).should.throw("Invalid options were passed to rule \"arg-overflow\".");

        Solium.reset();
        done();
    });

});
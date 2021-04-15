/**
 * @fileoverview Tests for uppercase rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require("../../../../lib/solium");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
let wrappers = require("../../../utils/wrappers");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
let toContract = wrappers.toContract;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
    "custom-rules-filename": null,
    "rules": {
        "uppercase": true
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] uppercase: Acceptances", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all constants that are uppercase", function(done) {
        let code = [
            "uint256 constant N = 19028;",
            "uint256 constant A_Z = 18;",
            "uint256 constant A__90 = 18;",
            "uint constant HE = 100;",
            "address constant HELLO_WORLD = 0x0;",
            "bytes32 constant HELLOWORLD = \"dd\";",
            "string constant HELLO = \"dd\";",
            "address constant HELLO_NUMBER_9 = 0x0;",
            "uint constant HELLO_NUMBER_0 = 190;",
            "string constant HELLO_NUMBER89116 = \"hello\";",
            "string constant HELLO_98_NUMBER = \"number\";",
            "address constant H0 = 0x1;",
            "string constant _F = \"dd\";",
            "string constant D_ = \"dd\";",
            "string constant __F = \"dd\";",
            "string constant D__ = \"dd\";",
            "string constant __F__ = \"dd\";",
            "string constant _F00BAR = \"dd\";",
            "string constant D9HG8_ = \"dd\";",
            "string constant __FJO8 = \"dd\";",
            "string constant D891JK9__ = \"dd\";",
            "string constant __F9018SJ__ = \"dd\";"
        ];
        let errors;

        code = code.map(function(item){return toContract(item);});

        code.forEach(function(declaration) {
            errors = Solium.lint(declaration, userConfig);
            errors.constructor.name.should.equal("Array");
            errors.length.should.equal(0);
        });

        Solium.reset();
        done();
    });

});


// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] uppercase: Rejections", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all constants which are not uppercase", function(done) {
        let code = [
            "uint constant he = 100;",
            "address constant hello_world = 0x0;",
            "bytes32 constant helloworld= \"dd\";",
            "string constant HellO = \"dd\";",
            "string constant HeO = \"dd\";",
            "string constant _ = \"dd\";",
            "string constant ___F = \"dd\";",
            "string constant D___ = \"dd\";",
            "string constant ___F___ = \"dd\";",
            "string constant ___F00BAR = \"dd\";",
            "string constant D9HG8___ = \"dd\";",
            "string constant ___F9018SJ___ = \"dd\";"
        ];
        let errors;

        code = code.map(function(item){return toContract(item);});

        code.forEach(function(declaration) {
            errors = Solium.lint(declaration, userConfig);
            errors.constructor.name.should.equal("Array");
            errors.length.should.equal(1);
        });

        Solium.reset();
        done();
    });

});

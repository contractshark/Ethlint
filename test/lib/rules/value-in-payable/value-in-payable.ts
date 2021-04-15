/**
 * @fileoverview Tests for value-in-payable rule
 * @author Ivan Mushketyk <ivan.mushketik@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require("../../../../lib/solium"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
    { toContract } = require("../../../utils/wrappers");

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
    "rules": {
        "value-in-payable": "error"
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] value-in-payable: Acceptances", () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept functions that access 'msg.value' and have the 'payable' modifier", function(done) {
        const code = toContract("function pay() payable { require(msg.value >= MIN_PRICE); }"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.should.be.empty();

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept functions that access 'msg.value' and have the 'private' modifier", function(done) {
        const code = toContract("function pay() private { require(msg.value >= MIN_PRICE); }"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.should.be.empty();

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept functions that access 'msg.value' and have the 'internal' modifier", function(done) {
        const code = toContract("function pay() internal { require(msg.value >= MIN_PRICE); }"),
            errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.should.be.empty();

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept code that accesses 'msg.value' outside a function", function(done) {
        const code = toContract(`function foo() { }
                               unit foo1 = msg.value;`);
        const errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.should.be.empty();

        Solium.reset();
        done();
    });

});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] value-in-payable: Rejections", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all functions that access 'msg.value' and don't have the 'payable' modifier", function(done) {
        let code = [
            "function pay() public { require(msg.value >= MIN_PRICE); }"
        ];
        let errors;

        code = code.map(function(item){return toContract(item);});

        errors = Solium.lint(code[0], userConfig);
        errors.should.be.Array();
        errors.should.have.size(1);

        Solium.reset();
        done();
    });

});

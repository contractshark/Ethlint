/**
 * @fileoverview Tests for visibility-first rule.
 * @author Harrison Beckerich <https://github.com/hbeckeri>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require("../../../../lib/solium"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
    { toContract } = require("../../../utils/wrappers");

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
const userConfig = {
    "rules": {
        "visibility-first": "warning"
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] visibility-first: Acceptances", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("accepts valid contract names", done => {
        let code = [
            "function test() public onlyOwner modA modB modC modD private modE {}",
            "function test() public onlyOwner {}",
            "function test() external onlyOwner {}",
            "function test() internal onlyOwner {}",
            "function test() private onlyOwner {}",
            "function test() onlyOwner {}",
            "function test() public {}",
            "function test() external {}",
            "function test() internal {}",
            "function test() private {}",
            "function test() {}"
        ];
        let errors;

        code = code.map(item => toContract(item));

        code.forEach(snip => {
            errors = Solium.lint(snip, userConfig);
            errors.should.be.Array();
            errors.should.be.empty();
        });

        Solium.reset();
        done();
    });
});


// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] visibility-first: Rejections", () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("rejects invalid struct names", done => {
        let code = [
            "function test() onlyOwner modA modB modC public {}",
            "function test() onlyOwner modA modB modC external modD modE {}",
            "function test() onlyOwner modA modB modC internal modD modE private {}",
            "function test() onlyOwner public {}",
            "function test() onlyOwner external {}",
            "function test() onlyOwner internal {}",
            "function test() onlyOwner private {}"
        ];
        let errors;

        code = code.map(item => toContract(item));

        code.forEach(snip => {
            errors = Solium.lint(snip, userConfig);
            errors.should.be.Array();
            errors.should.have.size(1);
        });

        Solium.reset();
        done();
    });
});

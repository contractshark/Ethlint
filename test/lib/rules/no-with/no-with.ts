/**
 * @fileoverview Tests for no-with rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require("../../../../lib/solium");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toFunction... Remove this comment to see the full error message
let toFunction = require("../../../utils/wrappers").toFunction;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
    "custom-rules-filename": null,
    "rules": {
        "no-with": true
    },
    "options": {
        "returnInternalIssues": true
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] no-with: Rejection", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should produce deprecation warning if this rule is enabled", function(done) {
        let code = toFunction(""), errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.should.be.size(2);

        errors [0].type.should.equal("warning");
        errors [0].internal.should.equal(true);
        errors [0].message.startsWith(
            "[Deprecated] You are using a deprecated soliumrc configuration format."
        ).should.equal(true);

        errors [1].type.should.equal("warning");
        errors [1].internal.should.equal(true);
        errors [1].message.should.equal("[Deprecated] Rule \"no-with\" is deprecated.");

        // Only rule deprecation warning with the new config
        let newConfig = {
            "rules": {
                "no-with": "error"
            },
            "options": {
                "returnInternalIssues": true
            }
        };

        errors = Solium.lint(code, newConfig);

        errors.should.be.Array();
        errors.should.be.size(1);

        errors [0].type.should.equal("warning");
        errors [0].internal.should.equal(true);
        errors [0].message.should.equal("[Deprecated] Rule \"no-with\" is deprecated.");

        Solium.reset();
        done();
    });

});

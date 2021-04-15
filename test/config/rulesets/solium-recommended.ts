/**
 * @fileoverview Ensure that all rule files present in the lib/rules/ directory have a corresponding entry in solium-recommended.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
let fs = require("fs"), path = require("path");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'rsSoliumAl... Remove this comment to see the full error message
let rsSoliumAll = require("../../../config/rulesets/solium-recommended");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'JS_EXT'.
let JS_EXT = ".js";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Tests for solium-recommended.js ruleset", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a set of properties", function(done) {
        rsSoliumAll.should.be.type("object");
        rsSoliumAll.should.have.ownProperty("rules");
        rsSoliumAll.rules.should.be.type("object");

        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have an entry for every rule file in lib/rules directory", function(done) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
        let listOfRuleFiles = fs.readdirSync(__dirname + "/../../../lib/rules/");

        listOfRuleFiles.forEach(function(filename) {
            if (path.extname(filename) === JS_EXT) {
                rsSoliumAll.rules.should.have.ownProperty(filename.slice(0, -JS_EXT.length));
            }
        });

        done();
    });

});

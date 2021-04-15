/**
 * @fileoverview Tests for lib/utils/js-utils.js
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'jsUtils'.
let jsUtils = require("../../../lib/utils/js-utils");

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Test jsUtils functions", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should have a set of functions exposed as API", function(done) {
        jsUtils.should.have.ownProperty("isStrictlyObject");
        jsUtils.isStrictlyObject.should.be.type("function");

        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("isStrictlyObject: should correctly classify whether argument is a non-array, non-null object", function(done) {
        let iso = jsUtils.isStrictlyObject;

        iso().should.equal(false);
        iso(100).should.equal(false);
        iso(null).should.equal(false);
        iso("foo").should.equal(false);
        iso([1, 2]).should.equal(false);

        iso({}).should.equal(true);

        done();
    });
});

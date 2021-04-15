/**
 * @fileoverview Tests for lib/utils/node-event-generator.js
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'EventGener... Remove this comment to see the full error message
let EventGenerator = require("../../../lib/utils/node-event-generator"),
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
    Solium = require("../../../lib/solium");

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Testing EventGenerator instance for exposed functionality", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should create a new instance of EventGenerator and expose a set of functions", function(done) {
        let generator = new EventGenerator(Solium);

        generator.should.be.type("object");
        generator.should.be.instanceof(EventGenerator);

        generator.should.have.ownProperty("emitter");
        generator.emitter.constructor.name.should.equal("EventEmitter");

        generator.should.have.property("enterNode");
        generator.enterNode.should.be.type("function");

        generator.should.have.property("leaveNode");
        generator.leaveNode.should.be.type("function");

        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should behave as expected upon calling enterNode ()", function(done) {
        let successCountDown = 2;
        let generator = new EventGenerator(Solium);

        Solium.on("TestNodeEnter", function(emitted) {
            emitted.should.have.ownProperty("node");
            emitted.node.should.have.ownProperty("type");
            emitted.node.type.should.equal("TestNodeEnter");
            emitted.should.have.ownProperty("exit");
            emitted.exit.should.equal(false);

            successCountDown--;
            !successCountDown && (Solium.reset() || done());
        });

        Solium.on("TestNodeLeave", function(emitted) {
            emitted.should.have.ownProperty("node");
            emitted.node.should.have.ownProperty("type");
            emitted.node.type.should.equal("TestNodeLeave");
            emitted.should.have.ownProperty("exit");
            emitted.exit.should.equal(true);

            successCountDown--;
            !successCountDown && (Solium.reset() || done());
        });

        generator.enterNode({ type: "TestNodeEnter" });
        generator.leaveNode({ type: "TestNodeLeave" });
    });

});

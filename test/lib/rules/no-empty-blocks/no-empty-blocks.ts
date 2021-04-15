/**
 * @fileoverview Tests for no-empty-blocks rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require("../../../../lib/solium");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
const wrappers = require("../../../utils/wrappers");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
const toContract = wrappers.toContract;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toFunction... Remove this comment to see the full error message
const toFunction = wrappers.toFunction;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addPragma'... Remove this comment to see the full error message
const addPragma = wrappers.addPragma;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
    "custom-rules-filename": null,
    "rules": {
        "no-empty-blocks": true
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] no-empty-blocks: Acceptances", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all non-empty contract, library and interface statements", function(done) {
        let code = "contract Foo { event bar (); }",
            errors = Solium.lint(addPragma(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        code = "library Foo { event bar (); }";
        errors = Solium.lint(addPragma(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        code = "interface Foo { event bar (); }";
        errors = Solium.lint(addPragma(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all non-empty function declarations", function(done) {
        let code = "function foo () { bar (); }",
            errors = Solium.lint(toContract(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should allow fallback and payable functions & payable constructors to have empty bodies", done => {
        let snippets = [
            "function(string address) {}",
            "function foo(string address) payable external {}",
            "function(string address) payable public {}",
            "constructor(uint x) payable {}",

            "function(string address) { /* hello world */ }",
            "function foo(string address) payable external {\t\t\t\t\t\n\n\t}",
            "function(string address) payable public {       }",
            "constructor(uint x) payable {   /* testing     */    }"
        ];

        snippets.forEach(code => {
            let errors = Solium.lint(toContract(code), userConfig);
            errors.should.be.empty();
        });

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should allow constructors calling base constructors to have empty bodies", done => {
        const code = `
contract Foo is Bar {
    constructor(uint _y) Bar(_y * _y) public {}
}

contract Jax is Base(10) {
    constructor() public blah Base foo bar(100) {}
}

// This should be accepted because payable constructor
contract Ipsum is Foo {
    constructor() payable public {}
}
`;
        const errors = Solium.lint(code, userConfig);

        errors.should.be.Array();
        errors.should.be.empty();

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all non-empty if-else declarations", function(done) {
        let code = "if (true) { foo (); } else { bar (); }",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);
		
        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all non-empty for statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "for (i = 0; i < 10; i++) { foo (); }",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);
		
        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all non-empty do..while statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "do { foo (); } while (i < 20);",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);
		
        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept all non-empty while statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "while (i < 20) { bar (); }",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(0);
		
        Solium.reset();
        done();
    });

});


// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] no-empty-blocks: Rejections", function() {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all empty contract, library & interface statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "contract Foo {}",
            errors = Solium.lint(addPragma(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);

        code = "library Foo {}";
        errors = Solium.lint(addPragma(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);

        code = "interface Foo {}";
        errors = Solium.lint(addPragma(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all empty if-else declarations", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "if (true) {} else {}",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(2);
		
        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all empty for statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "for (i = 0; i < 10; i++) {}",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all empty do..while statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "do {} while (i < 20);",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);
		
        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject all empty while statements", function(done) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let code = "while (i < 20) {}",
            errors = Solium.lint(toFunction(code), userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);

        Solium.reset();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject functions & constructors with empty bodies", done => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        let snippets = [
            "function foo(string address) {}",
            "function foo(string address) external {}",
            "constructor(uint x) {}",
            "constructor(uint x) public {}",

            "function foo(string address) { /* hello world */ }",
            "function foo(string address) external {\t\t\t\t\t\n\n\t}",
            "constructor(uint x) {       }",
            "constructor(uint x) public {   /* testing     */    }"
        ];

        snippets.forEach(code => {
            let errors = Solium.lint(toContract(code), userConfig);
            errors.should.have.size(1);
        });

        Solium.reset();
        done();
    });

});

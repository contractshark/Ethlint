/**
 * @fileoverview Tests for the constructor rule
 * @author Utkarsh Patil <utkarsh2305@gmail.com>, Daniel McLellan <daniel.mclellan@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require("../../../../lib/solium");

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
let config = {
    "rules": {
        "constructor": "warning"
    }
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] constructor: Rejections", function() {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should reject constructor names that are the same as contract names", function(done) {
        let codes = [`
            contract Foo {
                function Foo() {}
                function bar() {
                    var x = 100;
                }
            }
        `, `
            contract Foo {
                function Foo(string name, address account) {
                    a.b(c);
                }
            }
        `];
        codes.forEach(code => {
            let errors = Solium.lint(code, config);
            errors.should.be.Array();
            errors.should.have.size(1);
        });

        Solium.reset();
        done();
    });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] constructor: Acceptances", function() {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should accept contracts that don't use deprecated constructors", function(done) {
        let codes = [`
            contract Foo {
                function notAConstructor() {
                    var x = 100;
                }
            }
        `, `
            contract Foo {
                constructor() {
                    a.b();
                }
            }
        `, `
            contract Foo {
                constructor(string name, address account) {}
            }
        `];

        codes.forEach(code => {
            const errors = Solium.lint(code, config);
            errors.should.be.Array();
            errors.should.have.size(0);
        });

        Solium.reset();
        done();
    });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("[RULE] constructor: fixes", () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should replace deprecated style of constructor declaration with new one", done => {
        const declarations = [
            {
                bad: "function Foo();",
                good: "constructor();"
            },
            {
                bad: "function Foo(string name, address account) { var x = 90767; }",
                good: "constructor(string name, address account) { var x = 90767; }"
            },
            {
                bad: "function                    Foo(string name, address account) {}",
                good: "constructor(string name, address account) {}"
            },
            {
                bad: "function       \t    Foo  \t\t  (string name, address account) {}",
                good: "constructor  \t\t  (string name, address account) {}"
            },
            {
                bad: "function\n\nFoo\n(string name, address account) {}",
                good: "constructor\n(string name, address account) {}"
            }
        ];

        declarations.forEach(({ bad, good }) => {
            const { fixesApplied, fixedSourceCode,
                errorMessages } = Solium.lintAndFix(`contract Foo { ${bad} }`, config);

            fixesApplied.should.be.Array();
            fixesApplied.should.have.size(1);
            errorMessages.should.be.Array();
            errorMessages.should.be.empty();
            fixedSourceCode.should.equal(`contract Foo { ${good} }`);

            console.log(fixedSourceCode);
        });

        done();
    });

});

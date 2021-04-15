/**
 * @fileoverview Tests for lib/comment-directive-parser.js
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'solidityPa... Remove this comment to see the full error message
const solidityParser = require("solparse"),
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    CommentDirectiveParser = require("../../lib/comment-directive-parser");

const code = `
// hello world
contract foo {
    /* hello world */
}
`;
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
const AST = solidityParser.parse(code, { comment: true });


describe("comment-directive-parser", () => {

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'f' implicitly has an 'any' type.
    function shouldThrow(f, msg) {
        try {
            f();
        } catch (e) {
            e.message.should.equal(msg);
        }
    }

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should expose a class to create CDP objects", done => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'typeof C... Remove this comment to see the full error message
        CommentDirectiveParser.should.be.type("function");

        const minimalAST = { type: "Program", start: 0, end: 1 };
        const myCdp = new CommentDirectiveParser([], minimalAST);
        const invalidArgError = "First argument should be an array of comment tokens.";

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
        (myCdp instanceof CommentDirectiveParser).should.be.true();
        myCdp.should.have.size(4);  // changes when properties are added/removed
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'CommentD... Remove this comment to see the full error message
        myCdp.should.have.ownProperty("lastLine");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'CommentD... Remove this comment to see the full error message
        myCdp.should.have.ownProperty("commentTokens");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'CommentD... Remove this comment to see the full error message
        myCdp.should.have.ownProperty("lineConfigurations");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'CommentD... Remove this comment to see the full error message
        myCdp.should.have.ownProperty("ALL_RULES");


        const invalidTokens = [, undefined, null, {}, 1, 90, "", 1.83, 0, -1892, true, false, ()=>{}];

        invalidTokens.forEach(t => {
            shouldThrow(() => {new CommentDirectiveParser(t, minimalAST);}, invalidArgError);
        });

        // Just check that AST validation is working, no need for extensive testing
        shouldThrow(() => {new CommentDirectiveParser([], null);}, "getEndingLine(): null is not a valid AST node.");

        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should expose a set of methods via the CDP object", done => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        const cdp = new CommentDirectiveParser(AST.comments, AST);

        cdp.isRuleEnabledOnLine.should.be.type("function");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '(ruleNam... Remove this comment to see the full error message
        cdp._constructLineConfigurations.should.be.type("function");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '() => vo... Remove this comment to see the full error message
        cdp._addRulesToLineConfig.should.be.type("function");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '(line: a... Remove this comment to see the full error message
        cdp._removeRulesFromLineConfig.should.type("function");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '(line: a... Remove this comment to see the full error message
        cdp._constructLineConfigurationFromComment.should.be.type("function");
        cdp._cleanCommentText.should.be.type("function");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '(text: a... Remove this comment to see the full error message
        cdp._parseRuleNames.should.be.type("function");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '(text: a... Remove this comment to see the full error message
        cdp._toEndOfFile.should.be.type("function");

        done();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '(from: a... Remove this comment to see the full error message
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should throw when calling isRuleEnabledOnLine() with invalid args", done => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
        const cdp = new CommentDirectiveParser(AST.comments, AST);
        const badRuleNames = [, undefined, null, {}, [], 1, 90, "", 1.83, 0, -1892, true, false, ()=>{}],
            badLineNumbers = [, undefined, null, {}, [], "h", "", 1.83, 0, -1892, true, false, ()=>{}];

        badRuleNames.forEach(r => {
            cdp.isRuleEnabledOnLine.bind(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '() => bo... Remove this comment to see the full error message
                cdp, r, 1).should.throw("Rule name should be a non-empty string.");
        });

        badLineNumbers.forEach(l => {
            cdp.isRuleEnabledOnLine.bind(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type '() => bo... Remove this comment to see the full error message
                cdp, "rule", l).should.throw("Line number should be a positive integer.");
        });

        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should throw when disable-previous-line is used on the first line", done => {
        const code = `// solium-disable-previous-line
        contract Foo {}
        `;
        const ast = solidityParser.parse(code, { comment: true });

        shouldThrow(
            () => { new CommentDirectiveParser(ast.comments, ast); },
            "Comment directive \"solium-disable-previous-line\" refers to an invalid line number."
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        );

        done();
    });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
    it("should work as expected when calling private utility functions", done => {
        const cdp = new CommentDirectiveParser(AST.comments, AST);
        const texts = [
            ["///////", "/////"],
            ["//", ""],
            ["//\t", "\t"],
            ["//hello world", "hello world"],
            ["//  foobar", "  foobar"],
            ["//baz////", "baz////"],
            ["/*****/", "***"],
            ["/**/", ""],
            ["/*\t\t*/", "\t\t"],
            ["/*hello world*/", "hello world"],
            ["/*  foobar   */", "  foobar   "],
            ["/*hello\n\n@author bro<hello@world.com>\n\n*/", "hello\n\n@author bro<hello@world.com>\n\n"],

            ["// solium-disable", " solium-disable"],
            ["// solium-disable pragma-on-top, indentation", " solium-disable pragma-on-top, indentation"],
            ["// solium-disable foorule", " solium-disable foorule"],
            ["// solium-disable-line", " solium-disable-line"],
            ["// solium-disable-line pragma-on-top, indentation", " solium-disable-line pragma-on-top, indentation"],
            ["// solium-disable-line foorule", " solium-disable-line foorule"],
            ["/* solium-disable*/", " solium-disable"],
            ["/* solium-disable pragma-on-top, indentation*/", " solium-disable pragma-on-top, indentation"],
            ["/* solium-disable foorule*/", " solium-disable foorule"],
            ["/* solium-disable-line*/", " solium-disable-line"],
            ["/* solium-disable-line pragma-on-top, indentation*/", " solium-disable-line pragma-on-top, indentation"],
            ["/* solium-disable-line foorule*/", " solium-disable-line foorule"],
            ["//   solium-disable-previous-line   ", "   solium-disable-previous-line   "],
            ["/*   solium-disable-previous-line\t*/", "   solium-disable-previous-line\t"],
            ["/* solium-disable-previous-line security/no-throw, quotes */", " solium-disable-previous-line security/no-throw, quotes "],
            ["//   solium-enable   ", "   solium-enable   "],
            ["/*   solium-enable\t*/", "   solium-enable\t"],
            ["/* solium-enable security/no-throw, quotes */", " solium-enable security/no-throw, quotes "]
        ];

        texts.forEach(([dirty, clean]) => {
            cdp._cleanCommentText(dirty).should.equal(clean);
        });


        const ruleCodes = [
            ["  \tsolium-disable\t  ", "all", "solium-disable"],
            ["  \tsolium-disable pragma-on-top,   indentation", "pragma-on-top,indentation", "solium-disable"],
            ["  \tsolium-disable  \tfoorule", "foorule", "solium-disable"],
            ["  \tsolium-disable-line", "all", "solium-disable-line"],
            ["  \tsolium-disable-line   pragma-on-top\t,  indentation", "pragma-on-top,indentation", "solium-disable-line"],
            ["  \tsolium-disable-line foorule", "foorule", "solium-disable-line"],
            ["  \tsolium-disable-next-line", "all", "solium-disable-next-line"],
            ["  \tsolium-disable-next-line   pragma-on-top\t,  indentation", "pragma-on-top,indentation", "solium-disable-next-line"],
            ["  \tsolium-disable-next-line foorule", "foorule", "solium-disable-next-line"],
            ["  \tsolium-disable", "all", "solium-disable"],
            ["  \tsolium-disable pragma-on-top, indentation", "pragma-on-top,indentation", "solium-disable"],
            ["  \tsolium-disable foorule", "foorule", "solium-disable"],
            ["  \tsolium-disable-line", "all", "solium-disable-line"],
            ["  \tsolium-disable-line  pragma-on-top,\t\tindentation", "pragma-on-top,indentation", "solium-disable-line"],
            ["  \tsolium-disable-line foorule", "foorule", "solium-disable-line"],
            ["\t\tsolium-disable-previous-line  \t ", "all", "solium-disable-previous-line"],
            [" solium-disable-previous-line security/no-throw, quotes  \t ", "security/no-throw,quotes", "solium-disable-previous-line"],
            ["\t\tsolium-enable  \t ", "all", "solium-enable"],
            [" solium-enable security/no-throw, quotes  \t ", "security/no-throw,quotes", "solium-enable"]
        ];

        ruleCodes.forEach(([text, expectedOutput, p2r]) => {
            let rules = cdp._parseRuleNames(text, p2r);

            if (rules.constructor.name === "Array") {
                rules = rules.join();
            }

            rules.should.equal(expectedOutput);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'lastLine' does not exist on type 'Commen... Remove this comment to see the full error message
        });


        let counter = 7;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentLine' implicitly has an 'any' ty... Remove this comment to see the full error message
        cdp.lastLine = 96;

        cdp._toEndOfFile(counter, currentLine => {
            currentLine.should.equal(counter++);
        });

        done();
    });

});

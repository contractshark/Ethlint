/**
 * @fileoverview Tests for no-trailing-whitespace rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require('../../../../lib/solium');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = {
  rules: {
    'no-trailing-whitespace': 'error',
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] no-trailing-whitespace: Acceptances', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept lines having no trailing whitespaces', (done) => {
    const code = `

            contract Foo {
                // a comment
                function baz() returns(uint) {
                    /*
                        another happy comment
                        on multiple lines
                    */


                    callHelloWorld(
                        100, /* another block comment              */
                        "voila!",

                        0x1892873871198
                    );
                }
            }`;

    Solium.lint(code, config).should.be.empty();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should accept comments & blank lines with trailing whitespaces if they're ignored", (done) => {
    const configLocal = {
      rules: {
        'no-trailing-whitespace': [
          'error',
          { skipBlankLines: true, ignoreComments: true },
        ],
      },
    };

    const code = `
                \t\t        \t
            contract Foo {
                // a comment         
                function baz() returns(uint) {
                    /* \t    
                        another happy comment 
                        on multiple lines\t
                    */
                                       
        \t                 \t                 
                    callHelloWorld(
                        100, /* another block comment              */
                        "voila!",
\t
                        0x1892873871198
                    );
                } // another line comment\t\t
                
                
                function /* hello */ bax() /* world */ returns(string) { /* this is a stretched    \t
                    comment */
                    return "hello";
                }
            }`;

    Solium.lint(code, configLocal).should.be.empty();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] no-trailing-whitespace: Rejections', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject code, comment & blank lines with trailing whitespaces', (done) => {
    const code = `
                \t\t        \t
            contract Foo { 
                // a comment         
                function baz() returns(uint) {
                    /* \t    
                        another happy comment 
                        on multiple lines\t
                    */   
                                       
        \t                 \t                 
                    callHelloWorld(
                        100, /* another block comment              */ 
                        "voila!",
\t
                        0x1892873871198\t
                    );
                } // another line comment\t\t
                
                
                function /* hello */ bax() /* world */ returns(string) { /* this is a stretched    \t
                    comment */
                    return "hello";
                }
            }`;

    Solium.lint(code, config).should.have.size(16);
    done();
  });
});

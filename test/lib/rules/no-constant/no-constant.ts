/**
 * @fileoverview Tests for no-constant rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require('../../../../lib/solium');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
const userConfig = {
  rules: {
    'no-constant': 'error',
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] emit: Acceptances', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should accept function declarations that don't have constant modifier", (done) => {
    const declarations = [
      'function foo() view pure returns(bool);',
      'function foo() view pure returns(bool) {}',
      'function foo() {}',
      'function foo();',
      'function(){}',
      'function foo() myModifier(100, "hello") boo;',
    ];

    declarations.forEach((func) => {
      const issues = Solium.lint(`contract Foo { ${func} }`, userConfig);

      issues.should.be.Array();
      issues.should.be.empty();
    });

    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] emit: Rejections', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject function declarations that have constant modifier', (done) => {
    const declarations = [
      'function foo() view pure constant returns(bool);',
      'function foo() constant pure returns(bool) {}',
      'function foo() constant {}',
      'function foo() constant;',
      'function()constant{}',
      'function foo() myModifier(100, "hello") constant boo;',
    ];

    declarations.forEach((func) => {
      const issues = Solium.lint(`contract Foo { ${func} }`, userConfig);

      issues.should.be.Array();
      issues.should.have.size(1);
    });

    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] emit: fixes', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should replace constant with view', (done) => {
    const declarations = [
      {
        bad: 'function foo() view pure constant returns(bool);',
        good: 'function foo() view pure view returns(bool);',
      },
      {
        bad: 'function foo() constant pure returns(bool) {}',
        good: 'function foo() view pure returns(bool) {}',
      },
      { bad: 'function foo() constant {}', good: 'function foo() view {}' },
      { bad: 'function foo() constant;', good: 'function foo() view;' },
      { bad: 'function()constant{}', good: 'function()view{}' },
      {
        bad: 'function foo() myModifier(100, "hello") constant boo;',
        good: 'function foo() myModifier(100, "hello") view boo;',
      },
    ];

    declarations.forEach(({ bad, good }) => {
      const {
        fixesApplied,
        fixedSourceCode,
        errorMessages,
      } = Solium.lintAndFix(`contract Foo { ${bad} }`, userConfig);

      fixesApplied.should.be.Array();
      fixesApplied.should.have.size(1);
      errorMessages.should.be.Array();
      errorMessages.should.be.empty();
      fixedSourceCode.should.equal(`contract Foo { ${good} }`);
    });

    done();
  });
});

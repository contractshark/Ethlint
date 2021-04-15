/**
 * @fileoverview Tests for deprecated-suicide rule
 * @author Federico Bond <federicobond@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require('../../../../lib/solium');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
let wrappers = require('../../../utils/wrappers'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
  toContract = wrappers.toContract,
  toFunction = wrappers.toFunction;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
  'custom-rules-filename': null,
  rules: {
    'deprecated-suicide': true,
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] deprecated-suicide', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject contracts using suicide', function (done) {
    let code = toContract('function foo () { suicide(0x0); }'),
      errors = Solium.lint(code, userConfig);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should replace suicide by selfdestruct when fix is applied', function (done) {
    let unfixedCode = toFunction('suicide(0x0);'),
      fixedCode = toFunction('selfdestruct(0x0);');

    let fixed = Solium.lintAndFix(unfixedCode, userConfig);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(1);

    unfixedCode = toFunction('suicide (0x0);');
    fixedCode = toFunction('selfdestruct (0x0);');

    fixed = Solium.lintAndFix(unfixedCode, userConfig);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(1);

    unfixedCode = toContract(
      'function a () { suicide(0x0); }\nfunction b () { suicide(0x0); }',
    );
    fixedCode = toContract(
      'function a () { selfdestruct(0x0); }\nfunction b () { selfdestruct(0x0); }',
    );

    fixed = Solium.lintAndFix(unfixedCode, userConfig);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(2);

    Solium.reset();
    done();
  });
});

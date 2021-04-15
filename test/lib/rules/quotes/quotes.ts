/**
 * @fileoverview Tests for quotes rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require('../../../../lib/solium'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
  path = require('path'),
  fs = require('fs');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
let toContract = require('../../../utils/wrappers').toContract;

let userConfigSingle = {
  rules: {
    quotes: [1, 'single'],
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Acceptances general', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not take action against any non-string Literals', (done) => {
    const literals = ['19028', '0x00', '0x908d819', '90182.1892'];

    literals.forEach((lit) => {
      let code = toContract(`function foo() { var myVar = ${lit}; }`),
        errors = Solium.lint(code, { rules: { quotes: [1, 'single'] } });

      errors.should.be.Array();
      errors.should.have.size(0);
    });

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Acceptances for single quote', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept when receiving single quote strings', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let code = fs.readFileSync(
        path.join(__dirname, './single-quoted.sol'),
        'utf8',
      ),
      errors = Solium.lint(toContract(code), userConfigSingle);

    errors.should.be.Array();
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Rejections for single quote', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject when receiving double quote strings', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let code = fs.readFileSync(
        path.join(__dirname, './double-quoted.sol'),
        'utf8',
      ),
      errors = Solium.lint(toContract(code), userConfigSingle);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(41);

    Solium.reset();
    done();
  });
});

let userConfigDouble = {
  rules: {
    quotes: ['error', 'double'],
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Acceptances for double quote', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept when receiving double quote strings', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let code = fs.readFileSync(
        path.join(__dirname, './double-quoted.sol'),
        'utf8',
      ),
      errors = Solium.lint(toContract(code), userConfigDouble);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Rejections for double quote', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject when receiving single quote strings', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let code = fs.readFileSync(
        path.join(__dirname, './single-quoted.sol'),
        'utf8',
      ),
      errors = Solium.lint(toContract(code), userConfigDouble);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(41);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Fix when double quotes are mandatory', function () {
  let config = {
    rules: {
      quotes: ['error', 'double'],
    },
  };

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should fix single to double', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let unfixedCode = fs.readFileSync(
        path.join(__dirname, 'single-full.sol'),
        'utf8',
      ),
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      fixedCode = fs.readFileSync(
        path.join(__dirname, 'double-full.sol'),
        'utf8',
      );

    let fixed = Solium.lintAndFix(unfixedCode, config);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(17);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should escape any unescaped double quotes in the text', function (done) {
    let unfixedCode = toContract(
        'string x = \'he\\\'"\\"llo w\\\\"or\\\\\\"l"d\';',
      ),
      fixedCode = toContract(
        'string x = "he\\\'\\"\\"llo w\\\\\\"or\\\\\\"l\\"d";',
      );

    let fixed = Solium.lintAndFix(unfixedCode, config);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(1);

    unfixedCode = toContract("string x = '';");
    fixedCode = toContract('string x = "";');
    fixed = Solium.lintAndFix(unfixedCode, config);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(1);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] quotes: Fix when single quotes are mandatory', function () {
  let config = {
    rules: {
      quotes: ['error', 'single'],
    },
  };

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should fix double to single', function (done) {
    let unfixedCode = fs.readFileSync(
        path.join(__dirname, 'double-full.sol'),
        'utf8',
      ),
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      fixedCode = fs.readFileSync(
        path.join(__dirname, 'single-full.sol'),
        'utf8',
      );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let fixed = Solium.lintAndFix(unfixedCode, config);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(17);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should escape any unescaped single quotes in the text', function (done) {
    let unfixedCode = toContract(
        "string y = \"he\\\"'\\'llo w\\\\'or\\\\\\'l'd\";",
      ),
      fixedCode = toContract(
        "string y = 'he\\\"\\'\\'llo w\\\\\\'or\\\\\\'l\\'d';",
      );

    let fixed = Solium.lintAndFix(unfixedCode, config);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(1);

    unfixedCode = toContract('string x = "";');
    fixedCode = toContract("string x = '';");
    fixed = Solium.lintAndFix(unfixedCode, config);

    fixed.should.be.type('object');
    fixed.should.have.ownProperty('fixedSourceCode');
    fixed.should.have.ownProperty('errorMessages');
    fixed.should.have.ownProperty('fixesApplied');

    fixed.fixedSourceCode.should.equal(fixedCode);
    fixed.errorMessages.should.be.Array();
    fixed.errorMessages.length.should.equal(0);
    fixed.fixesApplied.should.be.Array();
    fixed.fixesApplied.length.should.equal(1);

    Solium.reset();
    done();
  });
});

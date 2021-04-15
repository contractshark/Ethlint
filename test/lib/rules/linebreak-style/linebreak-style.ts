/**
 * @fileoverview Tests for linebreak-style rule
 * @author Arjun Nemani <nemaniarjun@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require('../../../../lib/solium'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
  wrappers = require('../../../utils/wrappers'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addPragma'... Remove this comment to see the full error message
  { addPragma } = wrappers,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
  path = require('path'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
  fs = require('fs');

const userConfigUnix = {
  rules: {
    'linebreak-style': 'error',
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] linebreak-style: Acceptances for Unix Line breaks', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept when receiving Unix Line breaks', function (done) {
    const code = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './unix-endings'))
      .toString();
    const errors = Solium.lint(addPragma(code), userConfigUnix);

    errors.should.be.Array();
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] linebreak-style: Rejections for Unix Line breaks', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject when receiving Windows Line breaks', function (done) {
    const code = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './windows-endings'))
      .toString();
    const errors = Solium.lint(code, userConfigUnix);

    errors.should.be.Array();
    errors.length.should.be.above(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] linebreak-style: Fixes for Unix Line breaks', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should change to Unix Line Breaks when receiving Windows Line breaks', function (done) {
    const unfixedCode = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './windows-endings'))
      .toString();
    const fixedCode = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './unix-endings'))
      .toString();
    const newCode = Solium.lintAndFix(unfixedCode, userConfigUnix);

    newCode.fixedSourceCode.should.equal(fixedCode);

    Solium.reset();
    done();
  });
});

const userConfigWindows = {
  rules: {
    'linebreak-style': ['error', 'windows'],
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] linebreak-style: Acceptances for Windows Line breaks', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept when receiving Windows Line breaks', function (done) {
    const code = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './windows-endings'))
      .toString();

    const errors = Solium.lint(code, userConfigWindows);

    errors.should.be.Array();
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] linebreak-style: Rejections for Windows Line breaks', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject when receiving Unix Line breaks', function (done) {
    const code = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './unix-endings'))
      .toString();

    const errors = Solium.lint(code, userConfigWindows);

    errors.should.be.Array();
    errors.length.should.be.above(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] linebreak-style: Fixes for Windows Line breaks', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should change to Windows Line breaks when receiving Unix Line breaks', function (done) {
    const unfixedCode = fs
      .readFileSync(path.join(__dirname, './unix-endings'))
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .toString();
    const fixedCode = fs
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
      .readFileSync(path.join(__dirname, './windows-endings'))
      .toString();

    const newCode = Solium.lintAndFix(unfixedCode, userConfigWindows);
    newCode.fixedSourceCode.should.equal(fixedCode);

    Solium.reset();
    done();
  });
});

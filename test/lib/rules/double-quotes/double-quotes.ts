/**
 * @fileoverview Tests for double-quotes rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

// 2 extra errors produced due to deprecation warning since this rule is now deprecated
// and config format is also deprecated & we asked for internal issues.

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require('../../../../lib/solium'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
  wrappers = require('../../../utils/wrappers'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
  fs = require('fs'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
  path = require('path');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
let toContract = wrappers.toContract;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
  'custom-rules-filename': null,
  rules: {
    'double-quotes': true,
  },
  options: { returnInternalIssues: true },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] double-quotes: Acceptances', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept strings quoted with double quotes', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let code = fs.readFileSync(
        path.join(__dirname, './accept/double-quoted.sol'),
        'utf8',
      ),
      errors = Solium.lint(toContract(code), userConfig);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(2);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] double-quotes: Rejections', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject strings quoted with single quotes', function (done) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    let code = fs.readFileSync(
        path.join(__dirname, './reject/single-quoted.sol'),
        'utf8',
      ),
      errors = Solium.lint(toContract(code), userConfig);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(7);

    Solium.reset();
    done();
  });
});

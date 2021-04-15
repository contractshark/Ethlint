/**
 * @fileoverview Tests for test/utils/wrappers.js
 * @author cgewecke <christohergewecke@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
const wrappers = require('../../utils/wrappers'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
  Solium = require('../../../lib/solium'),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'EOL'.
  { EOL } = require('os');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
  'custom-rules-filename': null,
  rules: {},
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Test wrappers', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should have a set of functions exposed as API', function (done) {
    wrappers.should.have.ownProperty('toContract');
    wrappers.toContract.should.be.type('function');

    wrappers.should.have.ownProperty('toFunction');
    wrappers.toFunction.should.be.type('function');

    wrappers.should.have.ownProperty('addPragma');
    wrappers.toFunction.should.be.type('function');

    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('toContract: should correctly wrap a solidity statement in contract code', function (done) {
    let toContract = wrappers.toContract;
    let statement = 'uint x = 1;';
    let expected =
      `pragma solidity ^0.4.3;${EOL.repeat(3)}` +
      `contract Wrap {${EOL}` +
      '\t' +
      statement +
      EOL +
      '}';

    let errors = Solium.lint(expected, userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);
    toContract(statement).should.equal(expected);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('toFunction: should correctly wrap a solidity statement in contract/function code', function (done) {
    let toFunction = wrappers.toFunction;
    let statement = 'uint x = 1;';
    let expected =
      `pragma solidity ^0.4.3;${EOL.repeat(3)}` +
      `contract Wrap {${EOL}` +
      `\tfunction wrap() {${EOL}` +
      '\t\t' +
      statement +
      EOL +
      `\t}${EOL}` +
      '}';

    let errors = Solium.lint(expected, userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);
    toFunction(statement).should.equal(expected);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('addPragma: should correctly pre-pend a pragma statement to a solidity contract or library', function (done) {
    let addPragma = wrappers.addPragma;
    let contract = 'contract Abc { }';
    let expected = `pragma solidity ^0.4.3;${EOL.repeat(3)}` + contract;

    let errors = Solium.lint(expected, userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);
    addPragma(contract).should.equal(expected);

    Solium.reset();
    done();
  });
});

/**
 * @fileoverview Tests for camelcase rule
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
let Solium = require('../../../../lib/solium');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'wrappers'.
let wrappers = require('../../../utils/wrappers');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toContract... Remove this comment to see the full error message
let toContract = wrappers.toContract;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toFunction... Remove this comment to see the full error message
let toFunction = wrappers.toFunction;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
let userConfig = {
  'custom-rules-filename': null,
  rules: {
    mixedcase: true,
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] mixedcase: Acceptances', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept all valid function declarations', function (done) {
    let code = [
      'function helloWorld () {}',
      'function h () {}',
      'function he () {}',
      'function hE () {}',
      'function _h () {}',
      'function _hE () {}',
      'function hello123World () {}',
      'function _h123 () {}',
      'function hello_ () {}',
      'function initialize (Controller _controller) external onlyControllerCaller returns(bool) {}',
      'function initialize (Controller myController) returns(bool) {}',
    ];
    let errors;

    code = code.map(function (item) {
      return toContract(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[9], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[10], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept all valid modifier declarations', function (done) {
    let code = [
      'modifier helloWorld () {}',
      'modifier h () {}',
      'modifier he () {}',
      'modifier hE () {}',
      'modifier _h () {}',
      'modifier _hE () {}',
      'modifier hello123World () {}',
      'modifier _h123 () {}',
      'modifier hello_ () {}',
      'modifier initialize (Controller _controller) external onlyControllerCaller {}',
      'modifier initialize (Controller myController) {}',
    ];
    let errors;

    code = code.map(function (item) {
      return toContract(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[9], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[10], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept all valid variable declarations', function (done) {
    let code = [
      'var helloWorld;',
      'var h;',
      'var he;',
      'var hE;',
      'var _h;',
      'var _hE;',
      'var hello123World;',
      'var _h123;',
      'var hello_;',
    ];
    let errors;

    code = code.map(function (item) {
      return toFunction(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept all valid declarative expressions', function (done) {
    let code = [
      'uint helloWorld;',
      'address h;',
      'address he;',
      'bytes32 hE;',
      'uint _h;',
      'string _hE;',
      'bytes32 hello123World;',
      'string _h123;',
      'string hello_;',
    ];
    let errors;

    code = code.map(function (item) {
      return toContract(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept all valid function parameter names', function (done) {
    let code =
        'function foo (helloWorld, h, he, hE, _h, _hE, hello123World, _h123, hello_) {}',
      errors = Solium.lint(toContract(code), userConfig);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(0);

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] mixedcase: Rejections', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject all invalid function declarations', function (done) {
    let code = [
      'function _ () {}',
      'function _H () {}',
      'function Hello () {}',
      'function HELLOWORLD () {}',
      'function hello_world () {}',
      'function __h() {}',
      'function Hello$World () {}',
      'function $helloWorld () {}',
      'function __ () {}',
      'function initialize(Controller $helloWorld) returns(bool) {}',
      'function initialize(Controller BabysDayOut) {}',
    ];
    let errors;

    code = code.map(function (item) {
      return toContract(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[9], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[10], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject all invalid modifier declarations', function (done) {
    let code = [
      'modifier _ () {}',
      'modifier _H () {}',
      'modifier Hello () {}',
      'modifier HELLOWORLD () {}',
      'modifier hello_world () {}',
      'modifier __h() {}',
      'modifier Hello$World () {}',
      'modifier $helloWorld () {}',
      'modifier __ () {}',
      'modifier initialize (Controller $controller) external onlyControllerCaller {}',
      'modifier initialize (Controller MyController) {}',
    ];
    let errors;

    code = code.map(function (item) {
      return toContract(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[9], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[10], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject all invalid variable declarations', function (done) {
    let code = [
      'var _;',
      'var _H;',
      'var Hello;',
      'var HELLOWORLD;',
      'var hello_world;',
      'var __h;',
      'var Hello$World;',
      'var $helloWorld;',
      'var __;',
    ];
    let errors;

    code = code.map(function (item) {
      return toFunction(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject all invalid declarative expressions', function (done) {
    let code = [
      'uint _;',
      'address _H;',
      'bytes32 Hello;',
      'string HELLOWORLD;',
      'uint hello_world;',
      'address __h;',
      'bytes32 Hello$World;',
      'string $helloWorld;',
      'uint __;',
    ];
    let errors;

    code = code.map(function (item) {
      return toContract(item);
    });

    errors = Solium.lint(code[0], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[1], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[2], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[3], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[4], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[5], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[6], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[7], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    errors = Solium.lint(code[8], userConfig);
    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(1);

    Solium.reset();
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject all invalid function parameter names', function (done) {
    let code =
        'function foo (uint _, uint _H, uint Hello, uint HELLOWORLD, uint hello_world, uint __h, uint hello$world, uint $helloWorld) {}',
      errors = Solium.lint(toContract(code), userConfig);

    errors.constructor.name.should.equal('Array');
    errors.length.should.equal(8);

    Solium.reset();
    done();
  });
});

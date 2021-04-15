/**
 * @fileoverview Tests for package.json
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const packageJSON = require('../package.json');

describe('Checking package.json', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'done' implicitly has an 'any' type.
  it('should enforce fixed versions on certain dependencies', (done) => {
    const fixedDeps = [
      'solparse',
      'sol-digger',
      'sol-explore',
      'solium-plugin-security',
    ];
    const fixedDevDeps = [
      'solium-config-test',
      'solium-config-test-invalid-schema',
      'solium-config-test-invalid-syntax',
      'solium-plugin-test',
      'solium-plugin-test-invalid-schema',
    ];
    const deps = packageJSON.dependencies,
      devDeps = packageJSON.devDependencies;

    fixedDeps.forEach((fd) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
      /^[0-9]$/.test(deps[fd][0]).should.be.true();
    });

    fixedDevDeps.forEach((fdd) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'should' does not exist on type 'boolean'... Remove this comment to see the full error message
      /^[0-9]$/.test(devDeps[fdd][0]).should.be.true();
    });

    done();
  });
});

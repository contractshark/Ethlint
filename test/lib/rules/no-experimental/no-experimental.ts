/**
 * @fileoverview Ensure that experimental features are not used in production
 * @author Ivan Mushketyk <ivan.mushketik@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Solium'.
const Solium = require('../../../../lib/solium');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userConfig... Remove this comment to see the full error message
const userConfig = {
  rules: {
    'no-experimental': 'error',
  },
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] no-experimental: Acceptances', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should accept contracts without 'pragma experimental'", (done) => {
    const code = 'pragma solidity ^0.4.0; contract Foo {} library Bar {}',
      errors = Solium.lint(code, userConfig);

    errors.should.be.Array();
    errors.should.be.empty();

    Solium.reset();
    done();
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('[RULE] no-experimental: Rejections', function () {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("should reject contracts with 'pragma experimental'", (done) => {
    let code = `
            pragma experimental "^0.5.0";
            contract Foo {}
        `;
    let errors = Solium.lint(code, userConfig);
    errors.should.be.Array();
    errors.should.have.size(1);

    code = `
            pragma solidity ^0.4.0;
            pragma experimental "^0.5.0";
            contract Foo {}
            contract Bar {}
        `;
    errors = Solium.lint(code, userConfig);
    errors.should.be.Array();
    errors.should.have.size(1);

    Solium.reset();
    done();
  });
});

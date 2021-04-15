#!/usr/bin/env node

/**
 * @fileoverview CLI Entry point
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
require('../lib/cli').execute(process.argv);

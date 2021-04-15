/**
 * @fileoverview The object responsible for reporting errors on commandline in a compact, readable fashion
 * @author Federico Bond <federicobond@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    reportFatal(message) {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.stderr.write(`[Fatal error] ${message}\n`);
    },

    reportInternal(message) {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.stdout.write(`[Warning] ${message}\n`);
    },

    report(filename, sourceCode, lintErrors, fixesApplied) {
        let internalIssuesExist = false;

        // Examine internal issues first
        lintErrors.forEach((issue, index) => {
            if (!issue.internal) {
                return;
            }

            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            process.stdout.write(`${issue.message}\n`);

            delete lintErrors [index];
            internalIssuesExist = true;
        });

        internalIssuesExist && process.stdout.write("\n");

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        lintErrors.forEach(error => {
            const { line, column, type, message, ruleName } = error;
            // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
            process.stdout.write(`${filename}:${line}:${column}: ${type}: ${message} [${ruleName}]\n`);
        });

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        Array.isArray(fixesApplied) && process.stdout.write(`\nNumber of fixes applied: ${fixesApplied.length}\n`);
    }

};
/**
 * @fileoverview The object responsible for reporting errors on commandline in a compact, readable fashion
 * @author Federico Bond <federicobond@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path'),
  jsdiff = require('diff'),
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  sort = require('lodash/sortBy'),
  Table = require('text-table'),
  { EOL } = require('os');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
require('colors');

let counts = {};

function color(type) {
  return type === 'warning' ? 'yellow' : 'red';
}

function colorInternalIssue(type) {
  return type === 'warning' ? 'blue' : 'red';
}

function getDiffLine(diffPart) {
  if (diffPart.startsWith('+')) {
    return diffPart.green;
  } else if (diffPart.startsWith('-')) {
    return diffPart.red;
  }

  return diffPart;
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  // Convenience method when only a message needs to be passed as part of an internal issue
  reportInternal(message) {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stdout.write(
      `[Warning] ${message}${EOL}`[colorInternalIssue('warning')],
    );
  },

  reportFatal(message) {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stderr.write(
      `\u2716 [Fatal error] ${message}${EOL}`[colorInternalIssue('error')],
    );
  },

  report(filename, sourceCode, lintErrors, fixesApplied) {
    // Remove internal issue, so only rule errors reach the next loop
    lintErrors.forEach((issue, index) => {
      if (!issue.internal) {
        return;
      }

      const { message, type } = issue;
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      process.stdout.write(`${message[colorInternalIssue(type)]}${EOL}`);

      delete lintErrors[index];
    });

    // Print the file name
    process.stdout.write(
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      `${EOL}${filename.replace(path.join(process.cwd(), '/'), '')}${EOL}`
        .underline,
    );

    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    const errorEntries = [];

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'underline' does not exist on type 'strin... Remove this comment to see the full error message
    lintErrors.forEach((error) => {
      const { line, column, type, message, ruleName } = error;

      // Collect the file's errors as rows to feed to text-table
      errorEntries.push([
        `  ${line}:${column}  `.bold,
        // @ts-expect-error ts-migrate(2550) FIXME: Property 'bold' does not exist on type 'string'. D... Remove this comment to see the full error message
        `${type}  `[color(type)],
        `${message}  `,
        ruleName.italic,
      ]);

      // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
      // When the first issue of its type is encountered, create its attribute inside counts object & init to 0
      if (!counts[error.type]) {
        counts[error.type] = 0;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      }

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      counts[error.type] += 1;
    });

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // Generate & print the aligned table of errors
    process.stdout.write(Table(errorEntries) + EOL);

    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    if (Array.isArray(fixesApplied)) {
      counts.fixes = (counts.fixes || 0) + fixesApplied.length;
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
  reportDiff(fileName, sourceCode, fixedSourceCode, issuesFixed) {
    let diff = jsdiff.structuredPatch(
      fileName,
      fileName,
      sourceCode,
      fixedSourceCode,
      'old-header',
      'new-header',
    );

    if (diff.hunks.length == 0) {
      return;
    }

    process.stdout.write(`Diff for: ${fileName}${EOL}`.cyan);
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    diff.hunks.forEach(function (hunk) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cyan' does not exist on type 'string'.
      process.stdout.write(
        `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@${EOL}`
          .cyan,
      );
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cyan' does not exist on type 'string'.
      hunk.lines.forEach((line) => {
        process.stdout.write(getDiffLine(line) + EOL);
      });
    });
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stdout.write(
      `${EOL}${issuesFixed} lint issue(s) can be fixed.${EOL}`.green,
    );
  },

  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  finalize() {
    process.stdout.write(EOL);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'green' does not exist on type 'string'.
    if (typeof counts.fixes !== 'undefined') {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      if (counts.fixes === 1) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
        process.stdout.write('\u2714'.green + ' 1 fix was');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
      } else {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.stdout.write(
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'green' does not exist on type '"✔"'.
          (counts.fixes === 0 ? 'No' : '\u2714 '.green + counts.fixes) +
            ' fixes were',
        );
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
      process.stdout.write(` applied.${EOL}`);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
    }

    delete counts.fixes;
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    const errorTypes = sort(Object.keys(counts));

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fixes' does not exist on type '{}'.
    if (errorTypes.length === 0) {
      process.stdout.write(`No issues found.${EOL.repeat(2)}`.green);
    } else {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      process.stdout.write('\u2716 '.red);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'green' does not exist on type 'string'.
      errorTypes.forEach((type, i) => {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        const sep = i === 0 ? '' : ', ';
        const plural = counts[type] !== 1 ? 's' : '';

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        process.stdout.write((sep + (counts[type] + ' ' + type + plural)).red);
      });

      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      process.stdout.write(` found.${EOL.repeat(2)}`.red);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'red' does not exist on type 'string'.
    counts = {};
  },

  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
};

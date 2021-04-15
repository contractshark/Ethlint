/**
 * @fileoverview Ensure that the visibility modifier for a function should come before any custom modifiers.
 * @author Harrison Beckerich <https://github.com/hbeckeri>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  meta: {
    docs: {
      recommended: true,
      type: 'warning',
      description:
        'Ensure that the visibility modifier for a function should come before any custom modifiers',
    },

    schema: [],
  },

  create(context) {
    // Find index of the first visibility modifier in declaration.
    // Find the first non-VM before this first VM found above.
    // If non-VM found, report the VM.
    function inspectFD(emitted) {
      const { node } = emitted,
        visibilityModifiers = ['public', 'external', 'internal', 'private'];
      const modifiers = node.modifiers || [],
        // @ts-expect-error ts-migrate(2550) FIXME: Property 'includes' does not exist on type 'string... Remove this comment to see the full error message
        firstVisibilityModifierIndex = modifiers.findIndex((m) =>
          visibilityModifiers.includes(m.name),
        );

      // If no visibility modifiers exist in function declaration, exit now
      if (emitted.exit || firstVisibilityModifierIndex === -1) {
        return;
      }

      const firstNonVisModifBeforeFirstVisModif = modifiers
        .slice(0, firstVisibilityModifierIndex)
        .find((m) => !visibilityModifiers.includes(m.name));

      // @ts-expect-error ts-migrate(2550) FIXME: Property 'includes' does not exist on type 'string... Remove this comment to see the full error message
      // TODO: Add fix() for this rule
      if (firstNonVisModifBeforeFirstVisModif) {
        const issue = {
          node: modifiers[firstVisibilityModifierIndex],
          message: `Visibility modifier "${modifiers[firstVisibilityModifierIndex].name}" should come before other modifiers.`,
        };
        context.report(issue);
      }
    }

    return {
      FunctionDeclaration: inspectFD,
    };
  },
};

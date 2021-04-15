/**
 * @fileoverview Flag all the variables that were declared but never used
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: "error",
            description: "Flag all the variables that were declared but never used"
        },

        schema: []

    },

    create: function(context) {

        let allVariableDeclarations = {};

        //collect all variable declarations from VariableDeclarators and DeclarativeExpressions
        function inspectVariableDeclarator(emitted) {
            let node = emitted.node;

            if (!emitted.exit) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                allVariableDeclarations [node.id.name] = node;
            }
        }

        function inspectDeclarativeExpression(emitted) {
            let node = emitted.node;

            //do not examine if the declaration is part of a Struct definition
            if (!emitted.exit && node.parent.type !== "StructDeclaration") {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                allVariableDeclarations [node.name] = node;
            }
        }

        //While exiting Progam Node, all the vars that haven't been used still exist inside VariableDeclarations. Report them
        function inspectProgram(emitted) {

            if (emitted.exit) {
                Object.keys(allVariableDeclarations).forEach(function(name) {
                    context.report({
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        node: allVariableDeclarations [name],
                        message: "Variable '" + name + "' is declared but never used."
                    });
                });
            }

        }

        //As soon as the first use of a variable is encountered, delete that variable's node from allVariableDeclarations
        function inspectIdentifier(emitted) {
            if (!emitted.exit) {
                let node = emitted.node,
                    sourceCode = context.getSourceCode();

                if (
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    allVariableDeclarations [node.name] &&
					sourceCode.getParent(node).type !== "VariableDeclarator"
                ) {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    delete allVariableDeclarations [node.name];
                }
            }
        }


        return {
            Identifier: inspectIdentifier,
            Program: inspectProgram,
            DeclarativeExpression: inspectDeclarativeExpression,
            VariableDeclarator: inspectVariableDeclarator
        };

    }

};

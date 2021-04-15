/**
 * @fileoverview Class definition of the object responsible for notifying the rules when a node they've subscribed to is entered or left
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

/**
 * EventGenerator object constructor
 * @param {Object} emitter EventEmitter object
 */
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'this'.
function EventGenerator(emitter) {
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'this'.
  this.emitter = emitter;

  // Increase limit on number of listeners to allow more rules to subscribe peacefully
  // This limit may further be increased in future
  this.emitter.setMaxListeners(35);
}

EventGenerator.prototype = {
  constructor: EventGenerator,

  /**
   * emit event that the node with type = node.type is being entered
   * @param {Object} node The AST node being entered
   */
  enterNode(node) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    this.emitter.emit(node.type, {
      node,
      exit: false,
    });
  },

  /**
   * emit event that the node with type = node.type is being left
   * @param {Object} node The AST node being left
   */
  leaveNode(node) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    this.emitter.emit(node.type, {
      node,
      exit: true,
    });
  },
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = EventGenerator;

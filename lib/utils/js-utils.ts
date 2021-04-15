/**
 * @fileoverview Utility functions for rest of teh code base
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  /**
   * Check if given argument is a non-null, non-Array javascript object
   * @param {Object} possibleObject Argument to check for validity
   * @returns {Boolean} isObject true if given argument is object, false otherwise
   */
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'possibleObject' implicitly has an 'any'... Remove this comment to see the full error message
  isStrictlyObject: function (possibleObject) {
    return (
      possibleObject !== null && //because typeof null equals 'object', make sure the object is non-null
      typeof possibleObject === 'object' &&
      possibleObject.constructor.name === 'Object'
    );
  },
};

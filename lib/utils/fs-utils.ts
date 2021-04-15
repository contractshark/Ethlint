/**
 * @fileoverview Utility functions for working with files
 * @author Federico Bond <federicobond@gmail.com>
 */

"use strict";

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require("fs");

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {

    isDirectory(path) {
        try  {
            return fs.statSync(path).isDirectory();
        } catch (e) {
            if (e.code === "ENOENT") {
                return false;
            }
            throw e;
        }
    },

    isFile(path) {
        try  {
            return fs.statSync(path).isFile();
        } catch (e) {
            if (e.code === "ENOENT") {
                return false;
            }
            throw e;
        }
    }

};

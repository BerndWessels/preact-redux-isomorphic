/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import material design lite only on the client.
 */
if (typeof window == 'undefined') {
  global.window = global.window || global;
  global.mdl = {
    downgradeElements: () => {
    },
    upgradeElement: () => {
    }
  };
}
else {
  require('material-design-lite/material');
}

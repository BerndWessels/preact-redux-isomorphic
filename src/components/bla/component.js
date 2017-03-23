/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import dependencies.
 */
import {h, Component} from 'preact';

/**
 * Import local dependencies.
 */
import styles from './styles';

class Bla extends Component {
  render({blub, children}, state) {
    return (
      <div class={{[`${styles.root}`]: true}}>!{blub}!{children}!</div>
    );
  }
}

/**
 * Export the component.
 */
export default Bla;

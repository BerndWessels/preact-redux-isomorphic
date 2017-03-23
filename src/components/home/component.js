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
import Bla from '../bla/component';

/**
 * Create the component.
 */
class Home extends Component {
  render(props, state) {
    return (
      <div><Bla blub="Home">Child</Bla></div>
    );
  }
}

/**
 * Export the component.
 */
export default Home;

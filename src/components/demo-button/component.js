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
import Button from 'preact-mdc/material-button';
import Fab from 'preact-mdc/material-fab';

/**
 * Import styles.
 */
import styles from './styles';

/**
 * Create the component.
 */
class Demo extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render(props, state) {
    return (
      <div>
        <Button dense raised primary onClick={()=>console.log('click')}>Button</Button>
        <Fab icon="favorite_border"/>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

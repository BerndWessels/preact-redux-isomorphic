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
import IconToggle from 'preact-mdc/material-icon-toggle';

/**
 * Import styles.
 */
import styles from './styles';

/**
 * Create the component.
 */
class Demo extends Component {

  render(state, props) {

    return (
      <ul>
        <li>
          <h3>Icon toggle</h3>
          <IconToggle icon="favorite"
                      iconPressed="favorite_border"
                      label="Add to favorites"
                      labelPresses="Remove from favorites"
                      onClick={(e, pressed) => console.log(e, pressed)}
          />
        </li>
        <li>
          <h3>primary</h3>
          <IconToggle primary
                      icon="favorite"
                      iconPressed="favorite_border"
                      label="Add to favorites"
                      labelPresses="Remove from favorites"
                      onClick={(e, pressed) => console.log(e, pressed)}
          />
        </li>
        <li>
          <h3>accent</h3>
          <IconToggle accent
                      icon="favorite"
                      iconPressed="favorite_border"
                      label="Add to favorites"
                      labelPresses="Remove from favorites"
                      onClick={(e, pressed) => console.log(e, pressed)}
          />
        </li>
        <li>
          <h3>disabled</h3>
          <IconToggle disabled
                      icon="favorite"
                      iconPressed="favorite_border"
                      label="Add to favorites"
                      labelPresses="Remove from favorites"
                      onClick={(e, pressed) => console.log(e, pressed)}
          />
        </li>
      </ul>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

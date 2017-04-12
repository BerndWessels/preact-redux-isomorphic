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
import classnames from 'classnames/dedupe';

/**
 * Import local dependencies.
 */
import Button from 'preact-mdc/material-button';

/**
 * Import styles.
 */
import '@material/theme/mdc-theme.scss';
import '@material/typography/mdc-typography.scss';
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
    let root = classnames('mdc-typography', styles.root);
    let dark = classnames('mdc-theme--dark', styles.darkBg);
    return (
      <div class={root}>
        <h1>Light Theme</h1>
        <section>
          <Button>Button</Button>
        </section>
        <h1>Dark Theme</h1>
        <section class={dark}>
          <Button>Button</Button>
        </section>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

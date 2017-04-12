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
import CheckboxLabel from 'preact-mdc/material-checkbox-label';
import FormField from 'preact-mdc/material-form-field';
import Switch from 'preact-mdc/material-switch';

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
      <div class={styles.root}>
        <FormField>
          <Switch id="s1" onChange={e => console.log(e.target.checked)}/>
          <CheckboxLabel for="s1">Switch me</CheckboxLabel>
        </FormField>
        <FormField>
          <Switch id="s2" disabled/>
          <CheckboxLabel for="s2">Disabled</CheckboxLabel>
        </FormField>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

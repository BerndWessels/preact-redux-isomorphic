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
import Checkbox from 'preact-mdc/material-checkbox';
import CheckboxLabel from 'preact-mdc/material-checkbox-label';
import FormField from 'preact-mdc/material-form-field';
import Radio from 'preact-mdc/material-radio';

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
        <FormField>
          <Checkbox onChange={e => this.setState({disabled: e.target.checked})}/>
          <CheckboxLabel>Disabled</CheckboxLabel>
        </FormField>
        <FormField>
          <Radio name="group1"/>
          <CheckboxLabel>Radio 1</CheckboxLabel>
        </FormField>
        <FormField>
          <Radio name="group1"/>
          <CheckboxLabel>Radio 2</CheckboxLabel>
        </FormField>
        <FormField>
          <Radio name="group1"/>
          <CheckboxLabel>Radio 3</CheckboxLabel>
        </FormField>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

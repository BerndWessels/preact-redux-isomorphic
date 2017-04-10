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
import Checkbox from '../material-checkbox/component';
import CheckboxLabel from '../material-checkbox-label/component';
import FormField from '../material-form-field/component';
import Radio from '../material-radio/component';

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

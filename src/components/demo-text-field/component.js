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
import Button from '../material-button/component';
import Checkbox from '../material-checkbox/component';
import CheckboxLabel from '../material-checkbox-label/component';
import FormField from '../material-form-field/component';
import TextField from '../material-text-field/component';

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
    this.state = {
      type: 'text',
      value: null,
      label: 'Label',
      placeholder: 'Placeholder',
      disabled: false,
      rtl: false,
      dark: false,
      dense: false,
      required: false,
      pattern: '.{8,}',
      helpText: null,
      helpTextPersistent: false,
      helpTextValidation: false
    };
  }

  render(props, state) {
    return (
      <div>
        <Button dense raised primary onClick={e => this.setState({value: new Date().toLocaleTimeString()})}>Set
          Value</Button>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({disabled: checked})}/>
          <CheckboxLabel>Disabled</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({rtl: checked})}/>
          <CheckboxLabel>RTL</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({dark: checked})}/>
          <CheckboxLabel>Dark</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({dense: checked})}/>
          <CheckboxLabel>Dense</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({required: checked})}/>
          <CheckboxLabel>Required</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({helpText: checked ? 'Helptext' : null})}/>
          <CheckboxLabel>Help Text</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({helpTextPersistent: checked})}/>
          <CheckboxLabel>Help Text Persistent</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={(checked) => this.setState({helpTextValidation: checked})}/>
          <CheckboxLabel>Help Text Validation</CheckboxLabel>
        </FormField>
        <TextField {...state} onChange={value => this.setState({value})}/>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

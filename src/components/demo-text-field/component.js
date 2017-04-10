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
      dense: false,
      required: false,
      pattern: '.{8,}',
      helpText: null,
      helpTextPersistent: false,
      helpTextValidation: false
    };
  }

  render(props, {rtl, ...state}) {
    return (
      <div>
        <Button dense raised primary onClick={e => this.setState({value: new Date().toLocaleTimeString()})}>Set
          Value</Button>
        <FormField>
          <Checkbox onChange={e => this.setState({disabled: e.target.checked})}/>
          <CheckboxLabel>Disabled</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={e => this.setState({rtl: e.target.checked})}/>
          <CheckboxLabel>RTL</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={e => this.setState({dense: e.target.checked})}/>
          <CheckboxLabel>Dense</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={e => this.setState({required: e.target.checked})}/>
          <CheckboxLabel>Required</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={e => this.setState({helpText: e.target.checked ? 'Helptext' : null})}/>
          <CheckboxLabel>Help Text</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={e => this.setState({helpTextPersistent: e.target.checked})}/>
          <CheckboxLabel>Help Text Persistent</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox onChange={e => this.setState({helpTextValidation: e.target.checked})}/>
          <CheckboxLabel>Help Text Validation</CheckboxLabel>
        </FormField>
        <section dir={rtl ? 'rtl' : false}>
          <TextField {...state} onChange={e => this.setState({value: e.target.value})}/>
        </section>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

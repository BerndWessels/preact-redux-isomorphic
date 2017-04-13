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
import Checkbox from 'preact-mdc/material-checkbox';
import CheckboxLabel from 'preact-mdc/material-checkbox-label';
import FormField from 'preact-mdc/material-form-field';
import TextField from 'preact-mdc/material-text-field';

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

  render(props, {
           disabled,
           rtl,
           dense,
           required,
           helpText,
           helpTextPersistent,
           helpTextValidation,
           ...state
         }, context) {
    return (
      <div>
        <Button dense raised primary onClick={e => this.setState({value: new Date().toLocaleTimeString()})}>Set
          Value</Button>
        <FormField>
          <Checkbox id="c1" checked={disabled} onChange={e => this.setState({disabled: e.target.checked})}/>
          <CheckboxLabel for="c1">Disabled</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c2" checked={rtl} onChange={e => this.setState({rtl: e.target.checked})}/>
          <CheckboxLabel for="c2">RTL</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c3" checked={dense} onChange={e => this.setState({dense: e.target.checked})}/>
          <CheckboxLabel for="c3">Dense</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c4" checked={required} onChange={e => this.setState({required: e.target.checked})}/>
          <CheckboxLabel for="c4">Required</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c5" checked={helpText !== null}
                    onChange={e => this.setState({helpText: e.target.checked ? 'Helptext' : null})}/>
          <CheckboxLabel for="c5">Help Text</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c6" checked={helpTextPersistent}
                    onChange={e => this.setState({helpTextPersistent: e.target.checked})}/>
          <CheckboxLabel for="c6">Help Text Persistent</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c7" checked={helpTextValidation}
                    onChange={e => this.setState({helpTextValidation: e.target.checked})}/>
          <CheckboxLabel for="c7">Help Text Validation</CheckboxLabel>
        </FormField>
        <section dir={rtl ? 'rtl' : false}>
          <TextField disabled={disabled}
                     rtl={rtl}
                     dense={dense}
                     required={required}
                     helpText={helpText}
                     helpTextPersistent={helpTextPersistent}
                     helpTextValidation={helpTextValidation}
                     {...state}
                     onChange={e => this.setState({value: e.target.value})}/>
        </section>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

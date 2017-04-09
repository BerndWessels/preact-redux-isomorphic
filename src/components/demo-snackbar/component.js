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
import Snackbar from '../material-snackbar/component';

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
      active: false,
      multiline: false,
      actionOnBottom: false
    };
  }

  handleClick = () => {
    this.setState({active: true});
    setTimeout(() => {
      this.setState({active: false})
    }, 2000);
  };

  render(props, {active, multiline, actionOnBottom}) {
    return (
      <div class={styles.root}>
        <Button primary raised onClick={this.handleClick}>Snackbar</Button>
        <FormField>
          <Checkbox id="c1" onChange={(checked) => this.setState({multiline: checked})}/>
          <CheckboxLabel for="c1">Multiline</CheckboxLabel>
        </FormField>
        <FormField>
          <Checkbox id="c2" onChange={(checked) => this.setState({actionOnBottom: checked})}/>
          <CheckboxLabel for="c2">Action on bottom</CheckboxLabel>
        </FormField>
        <Snackbar text="A notification" active={active} multiline={multiline} actionOnBottom={actionOnBottom}>
          <Button type="button" class="mdc-snackbar__action-button">Undo</Button>
          <Button type="button" class="mdc-snackbar__action-button">Redo</Button>
        </Snackbar>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

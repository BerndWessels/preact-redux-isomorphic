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
    this.state = {active: false};
  }

  handleClick = () => {
    this.setState({active: true});
    setTimeout(() => {
      this.setState({active: false})
    }, 2000);
  };

  render(props, {active}) {
    return (
      <div class={styles.root}>
        <Button onClick={this.handleClick}>Snackbar</Button>
        <Snackbar text="A notification" active={active}>
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

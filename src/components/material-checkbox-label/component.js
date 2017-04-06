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

/**
 * Import styles.
 */
import '@material/form-field/mdc-form-field.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * for: PropTypes.string.isRequired,
 * id: PropTypes.string.isRequired
 * }
 */
export default class CheckboxLabel extends Component {
  render(props, state) {
    const {id, children} = this.props;
    const inputId = this.props['for'];
    return (
      <label className='mdc-checkbox-label' id={id} for={inputId}>
        {children}
      </label>
    )
  }
}

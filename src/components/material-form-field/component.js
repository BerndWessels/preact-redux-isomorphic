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

/**
 * Import styles.
 */
import '@material/checkbox/mdc-checkbox.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * alignEnd: PropTypes.bool
 * }
 */
export default class FormField extends Component {
  render({alignEnd, className, children}, state) {
    const baseClasses = {
      'mdc-form-field': true
    };
    const classes = classnames(baseClasses, {
      'mdc-form-field--align-end': alignEnd
    }, className);
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

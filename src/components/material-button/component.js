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
import '@material/button/mdc-button.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * class: PropTypes.string,
 * children: PropTypes.node,
 * compact: PropTypes.bool,
 * primary: PropTypes.bool,
 * accent: PropTypes.bool,
 * raised: PropTypes.bool,
 * dense: PropTypes.bool
 * }
 */
export default class Button extends Component {
  render({
           'class': className,
           children,
           compact,
           primary,
           accent,
           raised,
           dense,
           ...props
         }, state) {

    const classes = classnames('mdc-button', {
      'mdc-button--compact': compact,
      'mdc-button--primary': primary,
      'mdc-button--accent': accent,
      'mdc-button--raised': raised,
      'mdc-button--dense': dense
    }, className);

    return (
      <button {...props} class={classes}>
        {children}
      </button>
    );
  }
}

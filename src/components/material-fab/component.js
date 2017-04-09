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
import MDCRipple from '../material-ripple';

/**
 * Import local dependencies.
 */

/**
 * Import styles.
 */
import '@material/fab/mdc-fab.scss';
import '@material/ripple/mdc-ripple.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * class: PropTypes.string,
 * children: PropTypes.node,
 * icon: PropTypes.bool,
 * plain: PropTypes.bool,
 * mini: PropTypes.bool
 * }
 */
export default class Fab extends Component {

  componentDidMount = () => {
    if (process.env.WEB) {
      this.ripple = new MDCRipple(this.rippleElement);
    }
  };

  componentDidUnmount = () => {
    if (process.env.WEB) {
      this.ripple.destroy();
    }
  };

  render({
           'class': className,
           children,
           icon,
           plain,
           mini,
           ...props
         }, state) {

    const classes = classnames('material-icons mdc-fab', {
      'mdc-fab--plain': plain,
      'mdc-fab--mini': mini
    }, className);

    return (
      <button {...props} class={classes} aria-label={icon} ref={e => this.rippleElement = e}>
        <span class='mdc-fab__icon'>
          {icon}
        </span>
      </button>
    );
  }
}

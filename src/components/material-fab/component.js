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
import '@material/fab/mdc-fab.scss';

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
      <button {...props} class={classes} aria-label={icon}>
        <span class='mdc-fab__icon'>
          {icon}
        </span>
      </button>
    );
  }
}

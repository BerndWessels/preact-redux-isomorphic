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
import '@material/toolbar/mdc-toolbar.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 *   class: PropTypes.string,
 *   fixed: PropTypes.bool
 * }
 */
export default class Toolbar extends Component {
  render({'class': className, fixed, children}, state) {
    let classes = classnames('mdc-toolbar', {
      'mdc-toolbar--fixed': fixed
    }, className);
    return (
      <header class={classes}>{children}</header>
    );
  }
}

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
import '@material/list/mdc-list.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 *   className: PropTypes.string,
 *   children: PropTypes: node,
 *   end: PropTypes: bool
 * }
 */
export default class ListItemDetail extends Component {
  render({
           'class': className,
           children,
           end,
           ...props
         }, state) {
    let classes = classnames({
      'mdc-list-item__start-detail': !end,
      'mdc-list-item__end-detail': end
    }, className);
    return (
      <span {...props} class={classes}>{children}</span>
    );
  }
}

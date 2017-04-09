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
import '@material/snackbar/mdc-snackbar.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * }
 * static defaultProps = {
 * }
 */
export default class Snackbar extends Component {

  render({
           'class': className,
           children,
           active,
           text,
           multiline,
           actionOnBottom,
           ...props
         }, state) {
    let classes = classnames('mdc-snackbar', {
      'mdc-snackbar--active': active,
      'mdc-snackbar--multiline': multiline,
      'mdc-snackbar--action-on-bottom': actionOnBottom,
    }, className);
    return (
      <div {...props} class={classes} aria-live="assertive" aria-atomic="true" aria-hidden={!active}>
        <div class="mdc-snackbar__text">{text}</div>
        <div class="mdc-snackbar__action-wrapper">
          {children}
        </div>
      </div>
    );
  }
}

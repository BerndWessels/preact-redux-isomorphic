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
import '@material/radio/mdc-radio.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * }
 * static defaultProps = {
 * }
 */
export default class Radio extends Component {

  componentDidMount = () => {
    if (process.env.WEB) {
      this.ripple = new MDCRipple(this.rippleElement);
      this.ripple.unbounded = true;
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
           disabled,
           ...props
         }, state) {
    let classes = classnames('mdc-radio', {
      'mdc-radio--disabled': disabled
    }, className);
    return (
      <div class={classes} ref={e => this.rippleElement = e}>
        <input class="mdc-radio__native-control" type="radio" disabled={disabled} {...props}/>
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"/>
          <div class="mdc-radio__inner-circle"/>
        </div>
      </div>
    );
  }
}

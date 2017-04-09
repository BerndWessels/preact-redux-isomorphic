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
import '@material/ripple/mdc-ripple.scss';
import '@material/switch/mdc-switch.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * }
 * static defaultProps = {
 * }
 */
export default class Switch extends Component {

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
    let classes = classnames('mdc-switch', {
      'mdc-switch--disabled': disabled
    }, className);
    return (
      <div class={classes} ref={e => this.rippleElement = e}>
        <input class="mdc-switch__native-control" type="checkbox" disabled={disabled} {...props}/>
        <div className='mdc-switch__background'>
          <div className='mdc-switch__knob'/>
        </div>
      </div>
    );
  }
}

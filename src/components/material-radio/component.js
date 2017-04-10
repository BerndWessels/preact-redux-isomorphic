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
import '@material/radio/mdc-radio.scss';
import '@material/ripple/mdc-ripple.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * }
 * static defaultProps = {
 * }
 */
export default class Radio extends Component {

  // Initialize local component state.
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      ripple: false
    };
  }

  handleFocus = (e) => {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus(e);
  };

  handleBlur = (e) => {
    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  };

  handleChange = (e) => {
    this.setState({ripple: true});
    setTimeout(() => {
      this.setState({ripple: false});
    }, 300);
    this.props.onChange && this.props.onChange(e);
  };

  render({
           'class': className,
           children,
           disabled,
           onFocus,
           onBlur,
           onChange,
           ...props
         }, {
           focus,
           ripple
         }, context) {
    let classes = classnames('mdc-radio mdc-ripple-upgraded mdc-ripple-upgraded--unbounded', {
      'mdc-radio--disabled': disabled,
      'mdc-ripple-upgraded--background-active-fill': ripple,
      'mdc-ripple-upgraded--foreground-activation': ripple,
      'mdc-ripple-upgraded--foreground-deactivation': !ripple,
      'mdc-ripple-upgraded--background-focused': focus
    }, className);
    return (
      <div class={classes}
           style="--mdc-ripple-surface-width:40px; --mdc-ripple-surface-height:40px; --mdc-ripple-fg-size:24px; --mdc-ripple-fg-scale:2.77369; --mdc-ripple-left:8px; --mdc-ripple-top:8px;">
        <input class="mdc-radio__native-control"
               type="radio"
               disabled={disabled}
               onFocus={this.handleFocus}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
               {...props}
        />
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"/>
          <div class="mdc-radio__inner-circle"/>
        </div>
      </div>
    );
  }
}

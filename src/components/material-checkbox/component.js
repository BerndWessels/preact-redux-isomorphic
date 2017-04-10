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
import '@material/ripple/mdc-ripple.scss';

/**
 * Create the component.
 *
 * static propTypes = {
 * id: PropTypes.string,
 * labelId: PropTypes.string,
 * checked: PropTypes.bool,
 * disabled: PropTypes.bool,
 * indeterminate: PropTypes.bool,
 * onChange: PropTypes.func
 * }
 * static defaultProps = {
 * checked: false,
 * disabled: false,
 * indeterminate: false,
 * onChange: () => {}
 * }
 */
export default class Checkbox extends Component {

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
    let classes = classnames('mdc-checkbox mdc-ripple-upgraded mdc-ripple-upgraded--unbounded', {
      'mdc-checkbox--disabled': disabled,
      'mdc-ripple-upgraded--background-active-fill': ripple,
      'mdc-ripple-upgraded--foreground-activation': ripple,
      'mdc-ripple-upgraded--foreground-deactivation': !ripple,
      'mdc-ripple-upgraded--background-focused': focus
    }, className);
    return (
      <div class={classes}
           style="--mdc-ripple-surface-width:40px; --mdc-ripple-surface-height:40px; --mdc-ripple-fg-size:24px; --mdc-ripple-fg-scale:2.77369; --mdc-ripple-left:8px; --mdc-ripple-top:8px;">
        <input class="mdc-checkbox__native-control"
               type="checkbox"
               disabled={disabled}
               onFocus={this.handleFocus}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
               {...props}
        />
        <div className="mdc-checkbox__background">
          <svg className="mdc-checkbox__checkmark"
               viewBox="0 0 24 24">
            <path className="mdc-checkbox__checkmark__path"
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div className="mdc-checkbox__mixedmark"/>
        </div>
      </div>
    );
  }
}

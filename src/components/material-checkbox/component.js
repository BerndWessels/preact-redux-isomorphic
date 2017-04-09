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
import '@material/checkbox/mdc-checkbox.scss';

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
      focused: false
    };
  }

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
         }, {
           focused
         }) {
    let classes = classnames('mdc-checkbox', {
      'mdc-checkbox--disabled': disabled,
      'mdc-ripple-upgraded--background-focused': focused
    }, className);
    return (
      <div class={classes} ref={e => this.rippleElement = e}>
        <input class="mdc-checkbox__native-control"
               type="checkbox"
               disabled={disabled}
               {...props}
               onBlur={() => this.setState({focused: false})}
               onFocus={() => this.setState({focused: true})}
        />
        <div className="mdc-checkbox__background">
          <svg className="mdc-checkbox__checkmark"
               viewBox="0 0 24 24">
            <path className="mdc-checkbox__checkmark__path"
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div className="mdc-checkbox__mixedmark"></div>
        </div>
      </div>
    );
  }
}

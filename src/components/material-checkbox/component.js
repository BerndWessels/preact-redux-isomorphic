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
  constructor({checked, disabled, indeterminate}) {
    super({checked, disabled, indeterminate});
    this.refs = {};
    this.state = {
      checkedInternal: checked || false,
      disabledInternal: disabled || false,
      indeterminateInternal: indeterminate || false
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

  // Here we synchronize the internal state of the UI component based on what the user has specified.
  componentWillReceiveProps(nextProps) {
    let {checked, disabled, indeterminate} = this.props;
    if (nextProps.checked !== checked) {
      this.setState({checkedInternal: nextProps.checked, indeterminateInternal: false});
    }
    if (nextProps.indeterminate !== indeterminate) {
      this.setState({indeterminateInternal: nextProps.indeterminate});
    }
    if (nextProps.disabled !== disabled) {
      this.setState({disabledInternal: nextProps.disabled});
    }
  }

  // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
  // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
  // render()).
  componentDidUpdate() {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.indeterminate = this.state.indeterminateInternal;
    }
  }

  render({id, labelId, onChange}, {checkedInternal, disabledInternal}) {
    // Within render, we generate the html needed to render a proper MDC-Web checkbox.
    return (
      <div class="mdc-checkbox" ref={e => this.rippleElement = e}>
        <input id={id}
               type="checkbox"
               className="mdc-checkbox__native-control"
               aria-labelledby={labelId}
               checked={checkedInternal}
               disabled={disabledInternal}
               onChange={evt => {
                 this.setState({
                   checkedInternal: this.refs.nativeCb.checked,
                   indeterminateInternal: false
                 });
                 onChange ? onChange(this.refs.nativeCb.checked) : void 0;
               }}
               ref={e => this.refs.nativeCb = e}
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

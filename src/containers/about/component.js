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
import {connect} from 'preact-redux';
import {FormattedMessage} from 'react-intl';

/**
 * Import local dependencies.
 */

/**
 * Create the component.
 */
class About extends Component {
  render(props, state) {
    return (
      <h1>
        <FormattedMessage id="about" description="The about page heading." defaultMessage={`About`}/>
      </h1>
    );
  }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = (state) => {
  return {}
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
  return {}
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, {
    pure: false
  }
)(About);

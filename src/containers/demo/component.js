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
import {connect} from 'preact-redux';
import {push} from 'react-router-redux';
import {FormattedMessage} from 'react-intl';

/**
 * Import local dependencies.
 */
import List from 'preact-mdc/material-list';
import ListItem from 'preact-mdc/material-list-item';

/**
 * Import actions.
 */
import {rootStateReadyToRenderCreator} from '../../actions';

/**
 * Import styles.
 */
import '@material/typography/mdc-typography.scss';
import styles from './styles';

/**
 * Create the component.
 */
class Demo extends Component {

  componentDidMount = () => {
    this.props.onReady(); // TODO Usually a GraphQL response would trigger the SSR to render.
  };

  render({onNavigate}, state) {
    let classes = classnames(styles.root, 'mdc-typography');
    return (
      <div class={classes}>
        <h1>
          <FormattedMessage id="demoTitle"
                            description="This is the title of the demo page."
                            defaultMessage={`Preact Material Design Components Web (preact-mdc)`}/>
        </h1>
        <List links>
          <ListItem link href="/button" onClick={(e) => onNavigate(e, '/button')}>Button Demo</ListItem>
          <ListItem link href="/card" onClick={(e) => onNavigate(e, '/card')}>Card Demo</ListItem>
          <ListItem link href="/checkbox" onClick={(e) => onNavigate(e, '/checkbox')}>Checkbox / Radio Demo</ListItem>
          <ListItem link href="/drawer" onClick={(e) => onNavigate(e, '/drawer')}>Drawer / Toolbar Demo</ListItem>
          <ListItem link href="/icon-toggle" onClick={(e) => onNavigate(e, '/icon-toggle')}>Icon Toggle Demo</ListItem>
          <ListItem link href="/list" onClick={(e) => onNavigate(e, '/list')}>List Demo</ListItem>
          <ListItem link href="/snackbar" onClick={(e) => onNavigate(e, '/snackbar')}>Snackbar Demo</ListItem>
          <ListItem link href="/switch" onClick={(e) => onNavigate(e, '/switch')}>Switch Demo</ListItem>
          <ListItem link href="/text-field" onClick={(e) => onNavigate(e, '/text-field')}>Text field Demo</ListItem>
          <ListItem link href="/theme" onClick={(e) => onNavigate(e, '/theme')}>Theme Demo</ListItem>
        </List>
      </div>
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
  return {
    onNavigate: (e, path) => {
      e.preventDefault();
      dispatch(push(path));
    },
    onReady: () => dispatch(rootStateReadyToRenderCreator())
  };
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
)(Demo);

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

/**
 * Import local dependencies.
 */
import List from '../../components/material-list/component';
import ListDivider from '../../components/material-list-divider/component';
import ListGroup from '../../components/material-list-group/component';
import ListGroupDivider from '../../components/material-list-group-divider/component';
import ListGroupHeader from '../../components/material-list-group-header/component';
import ListItem from '../../components/material-list-item/component';
import ListItemDetail from '../../components/material-list-item-detail/component';
import ListItemText from '../../components/material-list-item-text/component';
import ListItemTextPrimary from '../../components/material-list-item-text-primary/component';
import ListItemTextSecondary from '../../components/material-list-item-text-secondary/component';

/**
 * Import styles.
 */
import '@material/typography/mdc-typography.scss';
import styles from './styles';

/**
 * Create the component.
 */
class Demo extends Component {

  render({onNavigate}, state) {
    let classes = classnames(styles.root, 'mdc-typography');
    return (
      <div class={classes}>
        <h1>Preact Material Design Components Web (preact-mdc)</h1>
        <h4>All these components will be moved into the preact-mdc repo once they are complete.</h4>
        <List links>
          <ListItem link href="/button" onClick={(e) => onNavigate(e, '/button')}>Button Demo</ListItem>
          <ListItem link href="/card" onClick={(e) => onNavigate(e, '/card')}>Card Demo</ListItem>
          <ListItem link href="/drawer" onClick={(e) => onNavigate(e, '/drawer')}>Drawer Demo</ListItem>
          <ListItem link href="/list" onClick={(e) => onNavigate(e, '/list')}>List Demo</ListItem>
          <ListItem link href="/text-field" onClick={(e) => onNavigate(e, '/text-field')}>Text field Demo</ListItem>
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
    }
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

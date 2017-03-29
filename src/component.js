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
import {push} from 'react-router-redux';
import './mdl';
import {Layout} from 'preact-mdl';

/**
 * Import local dependencies.
 */
import AppDrawer from './components/app-drawer/component';
import AppHeader from './components/app-header/component';
import AppContent from './components/app-content/component';
import {fetchGraphQLQueryCreator} from './actions';

/**
 * Import styles.
 */
import 'material-design-lite/src/material-design-lite.scss';
import 'material-design-icons/iconfont/material-icons.css';
import styles from './styles';

/**
 * Create the component.
 */
class App extends Component {

  /**
   * Initialize local component state.
   */
  constructor() {
    super();
    this.state = {
      drawerCollapsed: true // TODO maybe better in redux state?
    };
  }

  // Called on server and client.
  componentWillMount = () => {
    // Load data if necessary.
    setTimeout(() => {
      if (!this.props.alreadyLoaded) {
        this.props.onReady();
      }
    });
  };

  // Collapse or expand the drawer.
  toggleDrawer = () => {
    this.setState({drawerCollapsed: !this.state.drawerCollapsed});
  };

  // Render the component.
  render({onNavigate, aTest}, {drawerCollapsed}) {
    return (
      <Layout fixed-header={true} js={false}>
        <AppDrawer collapsed={this.state.drawerCollapsed} onCollapse={this.toggleDrawer} onNavigate={onNavigate}/>
        <AppHeader onExpand={this.toggleDrawer} onNavigate={onNavigate}/>
        <AppContent/>
      </Layout>
    );
  }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = (state) => {
  return {
    aTest: state.a.test,
    alreadyLoaded: state.a.hasOwnProperty('report')
  }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onNavigate: (path) => dispatch(push(path)),
    onReady: () => dispatch(fetchGraphQLQueryCreator({query: `{ report(id: 4711) { name } }`})
    )
  }
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
)(App);

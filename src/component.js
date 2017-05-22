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
import {Route} from 'react-router';

/**
 * Import local dependencies.
 */
import Demo from './containers/demo/component';
import DemoButton from './components/demo-button/component';
import DemoCard from './components/demo-card/component';
import DemoCheckbox from './components/demo-checkbox/component';
import DemoDrawer from './components/demo-drawer/component';
import DemoIconToggle from './components/demo-icon-toggle/component';
import DemoList from './components/demo-list/component';
import DemoSnackbar from './components/demo-snackbar/component';
import DemoSwitch from './components/demo-switch/component';
import DemoTextField from './components/demo-text-field/component';
import DemoTheme from './components/demo-theme/component';

/**
 * Import actions.
 */
import {fetchGraphQLQueryCreator} from './actions';
import {rootStateReadyToRenderCreator} from './actions';

/**
 * Import styles.
 */
import 'roboto-fontface/css/roboto/sass/roboto-fontface-regular.scss';
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
    this.state = {};
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

  // Render the component.
  render({onNavigate, aTest}, {drawerCollapsed}) {
    return (
      <div class={styles.root}>
        <Route exact path="/" component={Demo}/>
        <Route path="/button" component={DemoButton}/>
        <Route path="/card" component={DemoCard}/>
        <Route path="/checkbox" component={DemoCheckbox}/>
        <Route path="/drawer" component={DemoDrawer}/>
        <Route path="/icon-toggle" component={DemoIconToggle}/>
        <Route path="/list" component={DemoList}/>
        <Route path="/snackbar" component={DemoSnackbar}/>
        <Route path="/switch" component={DemoSwitch}/>
        <Route path="/text-field" component={DemoTextField}/>
        <Route path="/theme" component={DemoTheme}/>
      </div>
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
    onReady: () => dispatch(rootStateReadyToRenderCreator())
    //   onReady: () => dispatch(fetchGraphQLQueryCreator({
    //       query: `{
    //         Fake {
    //           _id
    //           firstName
    //           lastName
    //           Address {
    //             country
    //             countryCode
    //           }
    //         }
    //       }
    //     `
    //     })
    //   )
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

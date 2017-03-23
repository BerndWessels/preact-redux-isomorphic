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
import {Route} from 'react-router'
import {push} from 'react-router-redux'

/**
 * Import local dependencies.
 */
import Home from './components/home/component';
import About from './components/about/component';

import {fetchGraphQLQueryCreator} from './actions';

/**
 * Create the component.
 */
class App extends Component {

  // Called on server and client.
  componentWillMount = () => {
    console.log('componentWillMount');
    setTimeout(() => {
      if(!this.props.alreadyLoaded) {
        this.props.onReady();
      }
    });
  };

  // Called only on the client.
  componentDidMount = () => {
    console.log('componentDidMount');
  };

  // Render the component.
  render({onNavigateAbout, onNavigateHome, aTest}, state) {
    return (
      <div>
        <ul>
          <li>
            <div onClick={onNavigateHome}>Home really??? {aTest}</div>
          </li>
          <li>
            <div onClick={onNavigateAbout}>About you!</div>
          </li>
        </ul>
        <hr/>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </div>
      </div>
    );
  }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = (state) => {
  console.log(state);
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
    onNavigateAbout: () => dispatch(push('/about')),
    onNavigateHome: () => dispatch(push('/')),
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

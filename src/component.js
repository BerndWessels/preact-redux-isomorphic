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
import {Route} from 'react-router';
import {push} from 'react-router-redux';
import './mdl';
import {Button} from 'preact-mdl';

/**
 * Import local dependencies.
 */
import Home from './components/home/component';
import About from './components/about/component';
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

  // Called on server and client.
  componentWillMount = () => {
    console.log('componentWillMount');
    setTimeout(() => {
      if (!this.props.alreadyLoaded) {
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
      <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">Home</span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
                <i class="material-icons">search</i>
              </label>
              <div class="mdl-textfield__expandable-holder">
                <input class="mdl-textfield__input" type="text" id="search"/>
                  <label class="mdl-textfield__label" for="search">Enter your query...</label>
              </div>
            </div>
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
              <li class="mdl-menu__item">About</li>
              <li class="mdl-menu__item">Contact</li>
              <li class="mdl-menu__item">Legal information</li>
            </ul>
          </div>
        </header>
        <ul>
          <li>
            <div onClick={onNavigateHome}>Home really??? {aTest}</div>
          </li>
          <li>
            <Button raised colored>I am button!</Button>
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

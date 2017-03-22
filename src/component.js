import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {Route} from 'react-router'
import {push} from 'react-router-redux'

import Home from './components/home/component';
import About from './components/about/component';

import {fetchGraphQLQueryCreator} from './actions';

class App extends Component {

  // Called on server and client.
  componentWillMount = () => {
    console.log('componentWillMount');
    setTimeout(() => {
      this.props.onReady();
    });
  };

  // Called only on the client.
  componentDidMount = () => {
    console.log('componentDidMount');
  };

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

const mapStateToProps = (state) => {
  return {
    aTest: state.a.test
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigateAbout: () => dispatch(push('/about')),
    onNavigateHome: () => dispatch(push('/')),
    onReady: () => dispatch(fetchGraphQLQueryCreator({query: `{ report(id: 4711) { name } }`})
    )
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, {
    pure: false
  }
)(App);

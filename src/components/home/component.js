import {h, Component} from 'preact';
import Bla from '../bla/component';

export default class Home extends Component {
  render(props, state) {
    return (
      <div><Bla blub="Home">Child</Bla></div>
    );
  }
}

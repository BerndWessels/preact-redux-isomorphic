import {h, Component} from 'preact';
import styles from './styles';

export default class Bla extends Component {
  render({blub, children}, state) {
    return (
      <div class={{[`${styles.root}`]: true}}>!{blub}!{children}!</div>
    );
  }
}

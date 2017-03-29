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
import {Layout} from 'preact-mdl';
import {Route} from 'react-router';

/**
 * Import local dependencies.
 */
import Home from '../../containers/home/component';
import About from '../../containers/about/component';

/**
 * Import styles.
 */
import styles from './styles';

/**
 * Create the component.
 */
class Drawer extends Component {
  render(props, state) {
    return (
      <Layout.Content id="content">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Layout.Content>
    );
  }
}

/**
 * Export the component.
 */
export default Drawer;

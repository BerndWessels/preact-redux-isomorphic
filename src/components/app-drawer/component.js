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
import {Button, Icon, Layout, Navigation} from 'preact-mdl';

/**
 * Import local dependencies.
 */

/**
 * Import styles.
 */
import styles from './styles';

/**
 * Create the component.
 */
class Drawer extends Component {
  render({collapsed, onCollapse, onNavigate}, state) {
    return (
      <Layout.Drawer js={false} class={!collapsed ? 'is-visible' : null}>
        <Button class="menu" icon onClick={onCollapse}>
          <Icon icon="menu"/>
        </Button>
        <Layout.Title>
          <Navigation.Link href="/profile" route={() => onNavigate('/')}>Bernd</Navigation.Link>
        </Layout.Title>
        <Navigation>
          <Navigation.Link href="/" route={() => onNavigate('/')}>Home</Navigation.Link>
          <Navigation.Link href="/about" route={() => onNavigate('/about')}>About</Navigation.Link>
        </Navigation>
      </Layout.Drawer>
    );
  }
}

/**
 * Export the component.
 */
export default Drawer;

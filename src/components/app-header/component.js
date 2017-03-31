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
import {Button, Icon, Layout} from 'preact-mdl';

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
class AppHeader extends Component {
  render({onExpand, onNavigate}, state) {
    return (
      <Layout.Header manual waterfall scroll>
        <Layout.HeaderRow>
          <Button icon onClick={onExpand}>
            <Icon icon="menu"/>
          </Button>
          <Layout.Title>
            <span style="cursor:pointer;" onClick={() => onNavigate('/')}>Title</span>
          </Layout.Title>
          <Layout.Spacer />
          <Button icon onClick={() => {
          }}>
            <span class="logo">🍑</span>
          </Button>
          <Layout.Spacer />
          <Button icon onClick={() => {
          }}>
            <Icon icon="person add"/>
          </Button>
          <Button icon style="overflow:visible" onClick={() => {
          }}>
            <Icon icon="notifications" badge={5 || null}/>
          </Button>
        </Layout.HeaderRow>
        <Layout.HeaderRow>
          <Button icon>
            <Icon icon="alarm"/>
          </Button>
        </Layout.HeaderRow>
      </Layout.Header>
    );
  }
}

/**
 * Export the component.
 */
export default AppHeader;

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

/**
 * Import local dependencies.
 */
import Drawer from '../material-drawer/component';
import DrawerToolbarSpacer from '../material-drawer-toolbar-spacer/component';
import DrawerHeader from '../material-drawer-header/component';
import DrawerContent from '../material-drawer-content/component';
import Toolbar from '../material-toolbar/component';
import ToolbarRow from '../material-toolbar-row/component';
import ToolbarSection from '../material-toolbar-section/component';
import ToolbarTitle from '../material-toolbar-title/component';

/**
 * Import styles.
 */
import '@material/theme/mdc-theme.scss';
import '@material/typography/mdc-typography.scss';
import styles from './styles';

/**
 * Create the component.
 */
class Demo extends Component {

  constructor() {
    super();
    this.state = {
      open: true,
      permanent: false
    };
  }

  render(props, {open, permanent}) {
    return (
      <div class={styles.root}>
        <Drawer permanent={permanent} open={open} class="mdc-typography" onClick={()=>{this.setState({open: false})}}>
          {permanent &&
          <DrawerToolbarSpacer permanent={permanent}/>
          }
          {!permanent &&
          <DrawerHeader permanent={permanent}
                        class="mdc-theme--primary-bg mdc-theme--text-primary-on-primary">Header</DrawerHeader>
          }
          <DrawerContent permanent={permanent}>
            <nav>Bla</nav>
          </DrawerContent>
        </Drawer>
        <main class={styles.main}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection start>
                <ToolbarTitle>Title</ToolbarTitle>
              </ToolbarSection>
              <ToolbarSection end>
                <i class="material-icons">alarm</i>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <div>Content</div>
        </main>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

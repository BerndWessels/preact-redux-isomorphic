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
import Button from 'preact-mdc/material-button';
import Drawer from 'preact-mdc/material-drawer';
import DrawerToolbarSpacer from 'preact-mdc/material-drawer-toolbar-spacer';
import DrawerHeader from 'preact-mdc/material-drawer-header';
import DrawerContent from 'preact-mdc/material-drawer-content';
import FormField from 'preact-mdc/material-form-field';
import Checkbox from 'preact-mdc/material-checkbox';
import CheckboxLabel from 'preact-mdc/material-checkbox-label';
import Toolbar from 'preact-mdc/material-toolbar';
import ToolbarRow from 'preact-mdc/material-toolbar-row';
import ToolbarSection from 'preact-mdc/material-toolbar-section';
import ToolbarTitle from 'preact-mdc/material-toolbar-title';

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
        <Drawer permanent={permanent} open={open} class="mdc-typography" onClick={() => {
          this.setState({open: false})
        }}>
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
                {!permanent &&
                <Button class="material-icons" onClick={() => {
                  this.setState({open: true})
                }}>menu</Button>
                }
                <ToolbarTitle>Title</ToolbarTitle>
              </ToolbarSection>
              <ToolbarSection end>
                <i class="material-icons">alarm</i>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <FormField>
            <Checkbox id="permanent" checked={permanent} onChange={e => this.setState({permanent: e.target.checked})}/>
            <CheckboxLabel for="permanent">Permanent Drawer</CheckboxLabel>
          </FormField>
        </main>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

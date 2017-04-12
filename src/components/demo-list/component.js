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
import classnames from 'classnames/dedupe';

/**
 * Import local dependencies.
 */
import List from 'preact-mdc/material-list';
import ListDivider from 'preact-mdc/material-list-divider';
import ListGroup from 'preact-mdc/material-list-group';
import ListGroupDivider from 'preact-mdc/material-list-group-divider';
import ListGroupHeader from 'preact-mdc/material-list-group-header';
import ListItem from 'preact-mdc/material-list-item';
import ListItemDetail from 'preact-mdc/material-list-item-detail';
import ListItemText from 'preact-mdc/material-list-item-text';
import ListItemTextPrimary from 'preact-mdc/material-list-item-text-primary';
import ListItemTextSecondary from 'preact-mdc/material-list-item-text-secondary';

/**
 * Import styles.
 */
import '@material/typography/mdc-typography.scss';
import styles from './styles';

/**
 * Create the component.
 */
class Demo extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render(props, state) {
    let classes = classnames(styles.root, 'mdc-typography');
    return (
      <div class={classes}>
        <h1>Simple List</h1>
        <List>
          <ListItem>Single-line item</ListItem>
          <ListItem>Single-line item</ListItem>
          <ListDivider/>
          <ListItem>Single-line item</ListItem>
        </List>
        <h1>Simple List (dense)</h1>
        <List dense>
          <ListItem>Single-line item</ListItem>
          <ListItem>Single-line item</ListItem>
          <ListItem>Single-line item</ListItem>
        </List>
        <h1>Two-line list</h1>
        <List twoLine>
          <ListItem>
            <ListItemText>
              <ListItemTextPrimary>Two-line item</ListItemTextPrimary>
              <ListItemTextSecondary>Secondary text</ListItemTextSecondary>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <ListItemTextPrimary>Two-line item</ListItemTextPrimary>
              <ListItemTextSecondary>Secondary text</ListItemTextSecondary>
            </ListItemText>
          </ListItem>
        </List>
        <h1>List with details</h1>
        <List>
          <ListItem>
            <ListItemDetail><i class="material-icons">network_wifi</i></ListItemDetail>
            Wi-Fi
          </ListItem>
          <ListItem>
            <ListItemDetail><i class="material-icons">bluetooth</i></ListItemDetail>
            Bluetooth
          </ListItem>
          <ListDivider inset/>
          <ListItem>
            <ListItemDetail><i class="material-icons">data_usage</i></ListItemDetail>
            Data Usage
          </ListItem>
        </List>
        <h1>List with details (end)</h1>
        <List>
          <ListItem>
            Peter
            <ListItemDetail end><i class="material-icons">favorite</i></ListItemDetail>
          </ListItem>
          <ListItem>
            Paul
            <ListItemDetail end><i class="material-icons">favorite_border</i></ListItemDetail>
          </ListItem>
        </List>
        <h1>List with avatar</h1>
        <List avatar>
          <ListItem>
            <ListItemDetail><img src="/assets/img/avatar.svg" width="40" height="40" alt="avatar"/></ListItemDetail>
            Avatar
          </ListItem>
          <ListItem>
            <ListItemDetail><img src="/assets/img/avatar.svg" width="40" height="40" alt="avatar"/></ListItemDetail>
            Avatar
          </ListItem>
        </List>
        <h1>List Groups</h1>
        <ListGroup class={styles.hover}>
          <ListGroupHeader>Folders</ListGroupHeader>
          <List twoLine avatar>
            <ListItem>
              <ListItemDetail class={styles.fileAvatar}>
                <i class="material-icons" aria-hidden="true">folder</i>
              </ListItemDetail>
              <ListItemText>
                <ListItemTextPrimary>Photos</ListItemTextPrimary>
                <ListItemTextSecondary>1/1/2000</ListItemTextSecondary>
              </ListItemText>
              <ListItemDetail end><i class="material-icons">info</i></ListItemDetail>
            </ListItem>
            <ListItem>
              <ListItemDetail class={styles.fileAvatar}>
                <i class="material-icons" aria-hidden="true">folder</i>
              </ListItemDetail>
              <ListItemText>
                <ListItemTextPrimary>Documents</ListItemTextPrimary>
                <ListItemTextSecondary>9/9/2009</ListItemTextSecondary>
              </ListItemText>
              <ListItemDetail end><i class="material-icons">info</i></ListItemDetail>
            </ListItem>
          </List>
          <ListGroupDivider inset/>
          <ListGroupHeader>Files</ListGroupHeader>
          <List twoLine avatar>
            <ListItem>
              <ListItemDetail class={styles.fileAvatar}>
                <i class="material-icons" aria-hidden="true">insert_drive_file</i>
              </ListItemDetail>
              <ListItemText>
                <ListItemTextPrimary>House on fire</ListItemTextPrimary>
                <ListItemTextSecondary>1/1/2000</ListItemTextSecondary>
              </ListItemText>
              <ListItemDetail end>
                <i class="material-icons">info</i>
              </ListItemDetail>
            </ListItem>
            <ListItem>
              <ListItemDetail class={styles.fileAvatar}>
                <i class="material-icons" aria-hidden="true">insert_drive_file</i>
              </ListItemDetail>
              <ListItemText>
                <ListItemTextPrimary>Our new house</ListItemTextPrimary>
                <ListItemTextSecondary>9/9/2009</ListItemTextSecondary>
              </ListItemText>
              <ListItemDetail end><i class="material-icons">info</i></ListItemDetail>
            </ListItem>
          </List>
        </ListGroup>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

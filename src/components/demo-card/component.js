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
import Card from 'preact-mdc/material-card';
import CardPrimary from 'preact-mdc/material-card-primary';
import CardTitle from 'preact-mdc/material-card-title';
import CardSubTitle from 'preact-mdc/material-card-subtitle';
import CardSupportingText from 'preact-mdc/material-card-supporting-text';
import CardActions from 'preact-mdc/material-card-actions';
import CardAction from 'preact-mdc/material-card-action';
import CardMedia from 'preact-mdc/material-card-media';
import CardMediaItem from 'preact-mdc/material-card-media-item';
import CardHorizontalBlock from 'preact-mdc/material-card-horizontal-block';

/**
 * Import styles.
 */
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
    return (
      <div style={{padding: '20px'}}>
        <Card>
          <CardMedia class={styles.media}/>
          <CardPrimary>
            <CardTitle>Title</CardTitle>
            <CardSubTitle>Subtitle</CardSubTitle>
          </CardPrimary>
          <CardSupportingText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </CardSupportingText>
          <CardActions>
            <CardAction primary raised>Raised</CardAction>
            <CardAction>Action</CardAction>
          </CardActions>
        </Card>
        <br/>
        <Card>
          <CardHorizontalBlock>
            <CardPrimary>
              <CardTitle large>Large Title</CardTitle>
              <CardSubTitle>Subtitle</CardSubTitle>
            </CardPrimary>
            <CardMediaItem class={styles.mediaItem}/>
          </CardHorizontalBlock>
          <CardActions vertical>
            <CardAction>Vertical</CardAction>
            <CardAction>Actions</CardAction>
          </CardActions>
        </Card>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Demo;

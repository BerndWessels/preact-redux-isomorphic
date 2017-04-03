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
import {connect} from 'preact-redux';
import {FormattedMessage} from 'react-intl';
import {Button, Icon, Card, CardTitle, CardText, CardActions, CardMenu, Grid, Cell} from 'preact-mdl';
import classnames from 'classnames';

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
class Home extends Component {
  render(props, state) {
    let rootStyles = classnames(styles.root);
    return (
      <Grid class={rootStyles}>
        <Cell class="mdl-cell--4-col">
          <Card shadow={2}>
            <CardTitle style={{
              color: '#fff',
              height: '176px',
              background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'
            }}>Welcome</CardTitle>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris sagittis pellentesque lacus eleifend lacinia...
            </CardText>
            <CardActions border>
              <Button colored>Get Started</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <Button name="share">
                <Icon icon="notifications"/>
              </Button>
            </CardMenu>
          </Card>
        </Cell>
        <Cell class="mdl-cell--4-col">
          <Card shadow={2}>
            <CardTitle style={{
              color: '#fff',
              height: '176px',
              background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'
            }}>Welcome</CardTitle>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris sagittis pellentesque lacus eleifend lacinia...
            </CardText>
            <CardActions border>
              <Button colored>Get Started</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <Button name="share">
                <Icon icon="notifications"/>
              </Button>
            </CardMenu>
          </Card>
        </Cell>
        <Cell class="mdl-cell--4-col">
          <Card shadow={2}>
            <CardTitle style={{
              color: '#fff',
              height: '176px',
              background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'
            }}>Welcome</CardTitle>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris sagittis pellentesque lacus eleifend lacinia...
            </CardText>
            <CardActions border>
              <Button colored>Get Started</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <Button name="share">
                <Icon icon="notifications"/>
              </Button>
            </CardMenu>
          </Card>
        </Cell>
      </Grid>
    );
  }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = (state) => {
  return {}
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
  return {}
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, {
    pure: false
  }
)(Home);

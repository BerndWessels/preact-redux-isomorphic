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
import {FormattedMessage} from 'react-intl';

/**
 * Import local dependencies.
 */
import Bla from '../bla/component';

/**
 * Create the component.
 */
class Home extends Component {
  render(props, state) {
    return (
      <div>
        <Bla blub="Home">
          <FormattedMessage id="welcome"
                            description="Something or so."
                            defaultMessage={`Hello {name},
                            there {unreadCount, plural, one {is} other {are}}
                            {unreadCount, number} other
                            {unreadCount, plural, one {company} other {companies}}`}
                            values={{name: <b>NAME</b>, unreadCount: 5}}
          />
        </Bla>
      </div>
    );
  }
}

/**
 * Export the component.
 */
export default Home;

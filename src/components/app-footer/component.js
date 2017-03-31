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
import {MegaFooter, MegaFooterMiddleSection, MegaFooterBottomSection, MegaFooterDropDownSection, MegaFooterLinkList} from 'preact-mdl';

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
class AppFooter extends Component {
  render(props, state) {
    return (
      <MegaFooter size="mega">
        <MegaFooterMiddleSection type="middle">
          <MegaFooterDropDownSection title="Features">
            <MegaFooterLinkList>
              <li><a href="/about">About</a></li>
              <li><a href="">Terms</a></li>
              <li><a href="">Partners</a></li>
              <li><a href="">Updates</a></li>
            </MegaFooterLinkList>
          </MegaFooterDropDownSection>
          <MegaFooterDropDownSection title="Details">
            <MegaFooterLinkList>
              <li><a href="">Specs</a></li>
              <li><a href="">Tools</a></li>
              <li><a href="">Resources</a></li>
            </MegaFooterLinkList>
          </MegaFooterDropDownSection>
          <MegaFooterDropDownSection title="Technology">
            <MegaFooterLinkList>
              <li><a href="">How it works</a></li>
              <li><a href="">Patterns</a></li>
              <li><a href="">Usage</a></li>
              <li><a href="">Products</a></li>
              <li><a href="">Contracts</a></li>
            </MegaFooterLinkList>
          </MegaFooterDropDownSection>
          <MegaFooterDropDownSection title="FAQ">
            <MegaFooterLinkList>
              <li><a href="">Questions</a></li>
              <li><a href="">Answers</a></li>
              <li><a href="">Contact Us</a></li>
            </MegaFooterLinkList>
          </MegaFooterDropDownSection>
        </MegaFooterMiddleSection>
        <MegaFooterBottomSection type="bottom" logo="Title">
          <MegaFooterLinkList>
            <li><a href="">Help</a></li>
            <li><a href="">Privacy & Terms</a></li>
          </MegaFooterLinkList>
        </MegaFooterBottomSection>
      </MegaFooter>
    );
  }
}

/**
 * Export the component.
 */
export default AppFooter;

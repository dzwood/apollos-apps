import React from 'react';
import PropTypes from 'prop-types';
import { styled, GradientOverlayImage } from '@apollosproject/ui-kit';

import UiSplash from './ui/Splash';

const FullScreenImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
})(GradientOverlayImage);

const Splash = ({ navigation }) => (
  <UiSplash
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={'https://picsum.photos/375/812/?random'} />
    }
    primaryNavText={"Let's go!"}
  />
);

Splash.navigationOptions = {
  header: null,
};

Splash.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Splash;

import React from 'react';
import PropTypes from 'prop-types';
import UiSplash from './ui/Splash';

const Splash = ({ navigation }) => (
  <UiSplash onPressPrimary={() => navigation.push('Auth')} />
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

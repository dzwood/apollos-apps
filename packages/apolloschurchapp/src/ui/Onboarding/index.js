import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';
import {
  withTheme,
  BackgroundView,
  GradientOverlayImage,
} from '@apollosproject/ui-kit';
import { SafeAreaView } from 'react-navigation';

import {
  AskNotificationsConnected,
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
} from './slides';

// Provides themed colors to Swiper dots
const ThemedSwiper = withTheme(({ theme }) => ({
  dotColor: theme.colors.background.inactive, // theme.colors.lightSecondary looks the best.
  activeDotColor: theme.colors.action.primary,
}))(({ swiperRef, ...props }) => <Swiper ref={swiperRef} {...props} />);

const forceInset = {
  top: 'always',
  bottom: 'always',
};

class Onboarding extends Component {
  static navigationOptions = () => ({
    title: 'Onboarding',
    header: null,
    gesturesEnabled: false,
  });

  swiper = null;

  state = {
    swiperVisible: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ swiperVisible: true });
    }, 0);
  }

  // Creates ref to Swiper to be passed as a prop to children.
  setSwiperRef = (r) => {
    this.swiper = r;

    return this.swiper;
  };

  // Advance swiper 1 slide. See Swiper documentation for scrollBy details. https://github.com/leecade/react-native-swiper#methods
  handleOnPressPrimary = () => this.swiper.scrollBy(1);

  render() {
    // nasty hack. Relevant github issues: https://github.com/leecade/react-native-swiper/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+content+invisible
    if (!this.state.swiperVisible) return null;

    return (
      <BackgroundView>
        <SafeAreaView style={StyleSheet.absoluteFill} forceInset={forceInset}>
          <ThemedSwiper
            loop={false}
            /* Disables swipe gestures. We currently we dont display a back button so this is our
             * only back navigation option. */
            // scrollEnabled={false}
            showsButtons={false}
            swiperRef={this.setSwiperRef}
          >
            <AskNameConnected onPressPrimary={this.handleOnPressPrimary} />
            <FeaturesConnected
              onPressPrimary={this.handleOnPressPrimary}
              BackgroundComponent={
                <GradientOverlayImage
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <AboutYouConnected
              onPressPrimary={this.handleOnPressPrimary}
              BackgroundComponent={
                <GradientOverlayImage
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <LocationFinderConnected
              onPressPrimary={this.handleOnPressPrimary}
              BackgroundComponent={
                <GradientOverlayImage
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <AskNotificationsConnected
              onPressPrimary={() => this.props.navigation.navigate('Home')}
              primaryNavText={'Finish'}
              BackgroundComponent={
                <GradientOverlayImage
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
          </ThemedSwiper>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Onboarding;

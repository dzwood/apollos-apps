import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { styled } from '@apollosproject/ui-kit';
import { SafeAreaView } from 'react-navigation';
import { MediaPlayerConsumer } from '../Provider';
import { MINI_PLAYER_HEIGHT } from './MiniControls';

import MediaPlayerSafeLayout from './MediaPlayerSafeLayout';
import { GET_MEDIA_PLAYER_VISIBILITY } from './queries';

const MediaPlayerSafeLayoutWithSpacing = styled({
  paddingBottom: MINI_PLAYER_HEIGHT,
})(MediaPlayerSafeLayout);

const spacers = [];

let spacerCount = 0;

class MediaPlayerSpacer extends Component {
  spacerI = spacerCount++;

  componentWillUnmount() {
    delete spacers[this.spacerI];
    this.animateSpacing();
  }

  handleLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    console.log('handleLayout', height, spacers, this.spacerI);
    spacers[this.spacerI] = height;
    this.animateSpacing();
  };

  animateSpacing = () => {
    console.log('animate', spacers, spacerI);
    Animated.spring(this.props.spacerOffset, {
      toValue: spacers[spacers.length - 1],
      useNativeDriver: true,
    }).start();
  };

  render() {
    return <View {...this.props} onLayout={this.handleLayout} />;
  }
}

const MediaPlayerSpacerWithOffset = (props) => (
  <MediaPlayerConsumer>
    {({ spacerOffset }) => (
      <MediaPlayerSpacer spacerOffset={spacerOffset} {...props} />
    )}
  </MediaPlayerConsumer>
);

/*
<Query query={GET_MEDIA_PLAYER_VISIBILITY}>
    {({ data = {} }) =>
      get(data, 'mediaPlayer.isVisible') ? (
        <MediaPlayerSafeLayoutWithSpacing {...props} />
      ) : (
        <SafeAreaView forceInset={{ bottom: 'always' }} {...props} />
      )
    }
  </Query>
*/

export default MediaPlayerSpacerWithOffset;

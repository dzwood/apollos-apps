import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Mutation, Query } from 'react-apollo';

import {
  styled,
  Touchable,
  MediaThumbnail,
  MediaThumbnailItem,
  MediaThumbnailIcon,
} from '@apollosproject/ui-kit';

import Seeker from './Seeker';

import { GET_CONTROL_STATE } from './queries';

import { GO_FULLSCREEN, DISMISS, PLAY, PAUSE } from './mutations';

const MINI_PLAYER_HEIGHT = 16 * 5;

const MiniSeeker = styled({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
})(Seeker);

const Wrapper = styled({
  backgroundColor: 'transparent',
  height: MINI_PLAYER_HEIGHT,
  margin: 0,
  marginVertical: 0,
  marginHorizontal: 0,
})(MediaThumbnail);

const hitSlop = { top: 16, bottom: 16, left: 16, right: 16 };

/**
 * The MiniControls renders basic track info and a play/pause button.
 * Also displays a close button to close the player when the track is paused.
 */
class MiniControls extends Component {
  dismissAnimator = new Animated.Value(0);

  shouldComponentUpdate() {
    return false;
  }

  renderMiniControls = ({
    data: { mediaPlayer: { isPlaying = false } = {} } = {},
  }) => {
    Animated.spring(this.dismissAnimator, {
      toValue: isPlaying ? 0 : 0.8,
      overshootClamping: true,
      useNativeDriver: true,
    }).start();
    return (
      <Mutation mutation={GO_FULLSCREEN}>
        {(goFullscreen) => (
          <Mutation mutation={DISMISS}>
            {(dismiss) => (
              <Mutation mutation={isPlaying ? PAUSE : PLAY}>
                {(playPause) => (
                  <Wrapper>
                    <MiniSeeker minimal />
                    <Touchable
                      style={StyleSheet.absoluteFill}
                      onPress={() => goFullscreen()}
                    >
                      <View style={StyleSheet.absoluteFill} />
                    </Touchable>
                    <MediaThumbnailItem top right>
                      <Touchable onPress={() => dismiss()}>
                        <MediaThumbnailIcon name="close" />
                      </Touchable>
                    </MediaThumbnailItem>
                    <MediaThumbnailItem bottom left>
                      <Touchable hitSlop={hitSlop} onPress={() => playPause()}>
                        <MediaThumbnailIcon
                          name={isPlaying ? 'pause' : 'play'}
                        />
                      </Touchable>
                    </MediaThumbnailItem>
                  </Wrapper>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  };

  render() {
    return <Query query={GET_CONTROL_STATE}>{this.renderMiniControls}</Query>;
  }
}

export { MiniControls as default, MINI_PLAYER_HEIGHT };

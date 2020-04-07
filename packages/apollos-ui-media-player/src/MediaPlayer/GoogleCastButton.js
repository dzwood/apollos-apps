import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { get } from 'lodash';
import GoogleCast, { CastButton } from 'react-native-google-cast';

import { styled } from '@apollosproject/ui-kit';

const Wrapper = styled({
  justifyContent: 'center',
  alignItems: 'center',
})(View);

const StyledCastButton = styled(({ theme }) => ({
  width: 40 + theme.sizing.baseUnit * 1.25,
  height: 40 + theme.sizing.baseUnit * 1.25,
  tintColor: 'gray',
}))(CastButton);

const CastBtn = ({
  media,
  onCastConnected,
  onCastEnded,
  onUpdateCastPosition,
  onPlay,
  onPause,
  castPosition,
  playerPositionAnimation,
}) => {
  useEffect(() => {
    // get Google Cast state
    // TODO: this should update seeker position and set player UI accordingly
    // not currently working
    GoogleCast.getCastState().then((state) => {
      if (state === 'Connected') onCastConnected();
    });

    // Google Cast Connection established
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
      let playPosition;
      playerPositionAnimation.stopAnimation((value) => {
        playPosition = value;
      });
      GoogleCast.castMedia({
        // TODO need to insure Google Cast can accept the format (maybe)
        mediaUrl: get(media, 'currentTrack.mediaSource.uri', ''),
        imageUrl: get(media, 'currentTrack.posterSources[0].uri', ''),
        title: get(media, 'currentTrack.title', ''),
        subtitle: get(media, 'currentTrack.artist', ''),
        // TODO, get this information from API
        // studio: 'Apollos Church',
        // streamDuration: 596,
        // contentType: 'video/mp4', // Optional, default is "video/mp4"
        playPosition,
      });
      onCastConnected();
    });

    // Google Cast Disconnected (error provides explanation if ended forcefully)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, (error) => {
      console.log(error);
      onCastEnded();
    });

    // Google Cast media status update
    GoogleCast.EventEmitter.addListener(
      GoogleCast.MEDIA_STATUS_UPDATED,
      ({ mediaStatus }) => {
        if (mediaStatus.streamPosition !== castPosition) {
          onUpdateCastPosition(mediaStatus.streamPosition);
        }
        // NOTE: I'm sure the library has these as constants but I couldn't find
        // them in the documentation
        // TODO need to investigate if this is happening too often
        // may just need to check if player is already playing before hitting play again
        // this is just to try and keep the seeker in the same position as
        // the cast media
        if (mediaStatus.playerState === 2) onPlay();
        if (mediaStatus.playerState === 3) onPause();
      }
    );
  }, []);

  // render button
  return (
    <Wrapper>
      <StyledCastButton />
    </Wrapper>
  );
};

CastBtn.propTypes = {
  onCastConnected: PropTypes.func,
  onCastEnded: PropTypes.func,
  onUpdateCastPosition: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  playerPositionAnimation: PropTypes.shape({ stopAnimation: PropTypes.func }),
  castPosition: PropTypes.number,
  media: PropTypes.shape({
    currentTrack: PropTypes.shape({
      mediaSource: PropTypes.shape({ uri: PropTypes.string }),
      posterSources: PropTypes.arrayOf(
        PropTypes.shape({ uri: PropTypes.string })
      ),
      title: PropTypes.string,
      artist: PropTypes.string,
    }),
  }),
};
export default CastBtn;

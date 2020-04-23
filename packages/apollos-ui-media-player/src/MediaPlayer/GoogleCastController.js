import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import GoogleCast from 'react-native-google-cast';
import { Query } from 'react-apollo';
import { PLAY, PAUSE } from './mutations';
import { GET_CAST_INFO } from './queries';

const styles = StyleSheet.create({
  animatedPosterImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

const Controller = ({ client, media, playerPositionAnimation }) => {
  useEffect(() => {
    // get Google Cast state on mount
    // TODO: this should update seeker position and set player UI accordingly
    // GoogleCast.getCastState().then((state) => {
    // if (state === 'Connected') onCastConnected();
    // });

    // Google Cast Connection established
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
      // TODO maybe could pull this from local state
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
    });

    // Google Cast Disconnected (error provides explanation if ended forcefully)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, (error) => {
      console.log(error);
      client.mutate({ mutation: PAUSE });
    });

    // Google Cast media status update
    GoogleCast.EventEmitter.addListener(
      GoogleCast.MEDIA_STATUS_UPDATED,
      ({ mediaStatus }) => {
        // TODO update current time in local state
        //
        // NOTE: need to investigate if this is happening too often
        // may just need to check if player is already playing before hitting play again
        //
        // I'm sure the library has these as constants but I couldn't find
        // them in the documentation
        if (mediaStatus.playerState === 2) client.mutate({ mutation: PLAY });
        if (mediaStatus.playerState === 3) client.mutate({ mutation: PAUSE });
      }
    );
  }, []);

  return (
    <Animated.Image
      key="poster"
      style={[styles.animatedPosterImage]}
      source={get(media, 'currentTrack.posterSources', [])}
    />
  );
};

Controller.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func,
  }),
  playerPositionAnimation: PropTypes.shape({ stopAnimation: PropTypes.func }),
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

const ControllerWithData = ({ ...props }) => (
  <Query query={GET_CAST_INFO}>
    {({ data: { mediaPlayer: cast = {} } = {} }) => (
      <Controller {...props} media={cast} />
    )}
  </Query>
);

export default ControllerWithData;

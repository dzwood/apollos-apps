import { merge, get } from 'lodash';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { track } from '@apollosproject/ui-analytics';

export const defaults = {
  __typename: 'MediaPlayerState',
  currentTrack: null,
  isPlaying: false,
  isFullscreen: false,
  isVisible: false,
  currentTime: 0,
  showVideo: true,
  muted: false,
};

export const schema = `
extend type Query {
  mediaPlayer: MediaPlayerState
}

type MediaPlayerState {
  currentTrack: MediaPlayerTrack
  isPlaying: Boolean
  isFullscreen: Boolean
  isVisible: Boolean
  currentTime: Float
}

type MediaPlayerProgress {
  currentTime: Float
  playableDuration: Float
  seekableDuration: Float
  duration: Float
}

type MediaPlayerTrack {
  id: ID!
  parentId: ID
  mediaSource: VideoMediaSource!
  posterSources: [ImageMediaSource]
  title: String
  artist: String
  isVideo: Boolean
}
`;

const defaultContext = {
  spacerOffset: new Animated.Value(0),
};

const MediaPlayerContext = React.createContext(defaultContext);

let trackId = 0;

export const resolvers = {
  Query: {},
  Mutation: {
    mediaPlayerPlayNow: (root, trackInfo, { cache, client }) => {
      const query = gql`
        query {
          mediaPlayer {
            isFullscreen
          }
        }
      `;
      const mediaTrack = merge(
        {
          __typename: 'MediaPlayerTrack',
          parentId: null,
          mediaSource: null,
          posterSources: null,
          title: null,
          artist: null,
          isVideo: false,
        },
        trackInfo
      );

      const { mediaPlayer } = cache.readQuery({ query });

      const newMediaPlayerState = {
        __typename: 'MediaPlayerState',
        isPlaying: true,
        isVisible: true,
        isFullscreen: mediaTrack.isVideo
          ? true
          : (mediaPlayer && mediaPlayer.isFullscreen) || false,
        currentTrack: mediaTrack,
        currentTime: 0,
        showVideo: mediaTrack.isVideo,
        muted: false,
      };

      if (
        // if same track
        mediaPlayer &&
        mediaPlayer.currentTrack &&
        mediaPlayer.currentTrack.mediaSource.uri === mediaTrack.mediaSource.uri
      ) {
        // use the same Id
        newMediaPlayerState.currentTrack.id = mediaPlayer.currentTrack.id;
      } else {
        // otherwise reset progress and use new Id
        newMediaPlayerState.currentTrack.id = trackId;
        newMediaPlayerState.progress = null;
        trackId += 1;
      }

      cache.writeData({
        query,
        data: {
          mediaPlayer: newMediaPlayerState,
        },
      });
      track({
        client,
        eventName: 'UserPlayedMedia',
        properties: {
          uri: mediaTrack.uri,
          title: mediaTrack.title,
          type: mediaTrack.isVideo ? 'Video' : 'Audio',
        },
      });
      return null;
    },
    mediaPlayerUpdateState: (
      root,
      { isPlaying, isFullscreen, isVisible, showVideo, muted },
      { cache }
    ) => {
      const query = gql`
        query {
          mediaPlayer @client {
            isPlaying
            isFullscreen
            isVisible
            showVideo
            muted
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: merge(mediaPlayer, {
            isPlaying,
            isFullscreen,
            isVisible,
            showVideo,
            muted,
            __typename: 'MediaPlayerState',
          }),
        },
      });
      return null;
    },
    mediaPlayerSetPlayhead: (root, { currentTime }, { cache }) => {
      const query = gql`
        query {
          mediaPlayer @client {
            currentTime
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: {
            __typename: 'MediaPlayerState',
            currentTime:
              currentTime || get(mediaPlayer.progress, 'currentTime') || 0,
          },
        },
      });
      return null;
    },
  },
};

let loaded = false;
const Provider = ({ children, ...otherContext }) => (
  <MediaPlayerContext.Provider
    value={{
      ...defaultContext,
      ...otherContext,
      spacerOffset: new Animated.Value(0),
    }}
  >
    <ApolloConsumer>
      {(client) => {
        if (!loaded) {
          client.addResolvers(resolvers);
          client.writeData({ data: { mediaPlayer: defaults } });
          client.onResetStore(() =>
            client.writeData({ data: { mediaPlayer: defaults } })
          );
          loaded = true;
        }

        return children;
      }}
    </ApolloConsumer>
  </MediaPlayerContext.Provider>
);

Provider.propTypes = {
  children: PropTypes.node,
};

Provider.defaultProps = {};

export const MediaPlayerConsumer = MediaPlayerContext.Consumer;

export default Provider;

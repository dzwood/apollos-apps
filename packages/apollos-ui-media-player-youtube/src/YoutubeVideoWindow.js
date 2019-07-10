import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';

class YoutubeVideoWindow extends Component { // eslint-disable-line
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string,
    }),
    paused: PropTypes.bool,
    onLoadStart: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBuffer: PropTypes.func.isRequired,
    onProgress: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
  };

  didLoad = false;

  didEnd = false;

  lastDuration = 1;

  componentWillUnmount() {
    if (this.playListener) clearInterval(this.playListener);
  }

  setVideoRef = (element) => {
    this.video = element;
  };

  handleOnReady = () => {
    this.didLoad = false;
    if (this.props.onLoadStart) this.props.onLoadStart();
  };

  handleOnChangeState = ({ state }) => {
    if (this.props.onBuffer)
      this.props.onBuffer({ isBuffering: state === 'buffering' });

    if (state === 'ended') {
      this.video.seekTo(0);
      this.props.onProgress({
        currentTime: 0,
        playableDuration: this.lastDuration,
        seekableDuration: this.lastDuration,
      });
      this.props.onEnd();
    }

    this.handlePlayListener(state === 'playing');
  };

  handleOnError = (...args) => {
    this.props.onError(...args);
  };

  handleOnProgress = ({ currentTime, duration }) => {
    if (!this.didLoad || duration !== this.lastDuration) {
      this.didLoad = true;
      this.props.onLoad({ duration });
    }

    this.lastDuration = duration;

    this.props.onProgress({
      currentTime,
      playableDuration: duration,
      seekableDuration: duration,
    });
  };

  handlePlayListener = (isPlaying) => {
    // TODO: This is untested
    if (Platform.OS !== 'android') return;
    if (isPlaying) {
      this.playListener = setInterval(async () => {
        const currentTime = await this.video.currentTime();
        const duration = await this.video.duration();
        this.handleOnProgress({ currentTime, duration });
      }, 500);
    } else if (this.playListener) {
      clearInterval(this.playListener);
    }
  };

  seek = (time) => {
    this.video.seekTo(time);
  };

  render() {
    // gracefully handle non-youtube videos
    if (this.props.source && this.props.source.uri.includes('http'))
      return <Video {...this.props} />;

    const { source, paused } = this.props;
    const videoId = source.uri;

    return (
      <YouTube
        videoId={videoId}
        fullscreen={false}
        play={!paused}
        // loop={repeat}
        controls={0}
        showFullscreenButton={false}
        showinfo={false}
        modestbranding
        resumePlayAndroid
        style={StyleSheet.absoluteFill}
        onReady={this.handleOnReady}
        onChangeState={this.handleOnChangeState}
        onProgress={this.handleOnProgress}
        onError={this.handleOnError}
        ref={this.setVideoRef}
      />
    );
  }
}

export default YoutubeVideoWindow;

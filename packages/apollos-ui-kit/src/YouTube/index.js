import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
// import { WebView } from 'react-native-webview'; // can't seem to get this to work
import { WebView } from 'react-native';
import PropTypes from 'prop-types';

const enhance = compose(
  pure,
  setPropTypes({
    src: PropTypes.string,
  })
);

const buildSourceObject = (source) => ({ uri: source });

const YouTube = enhance(({ source, ...otherProps }) => (
  <WebView
    source={buildSourceObject(source)}
    mediaPlaybackRequiresUserAction={false}
    allowsInlineMediaPlayback
    bounces={false}
    scrollEnabled={false}
    {...otherProps}
  />
));

export default YouTube;

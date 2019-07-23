/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { ScrollView, View } from 'react-native';
import {
  ConnectedImage,
  GradientOverlayImage,
  PaddedView,
  H1,
  H2,
  H3,
} from '@apollosproject/ui-kit';

import StretchyView from '.';

const imageStyle = { width: '100%', aspectRatio: 1 };

storiesOf('StretchyView', module)
  .add('stretchy as a background', () => (
    <StretchyView
      StretchyComponent={
        <GradientOverlayImage
          overlayColor="white"
          overlayType="featured"
          source={{ uri: 'https://picsum.photos/600/600' }}
          style={imageStyle}
        />
      }
    >
      {(scrollViewProps) => (
        <ScrollView {...scrollViewProps}>
          <PaddedView>
            <H1 padded>Well hello there!</H1>
            <H2 padded>
              Hello there!
              {'\n'}
            </H2>
            <H3 padded>Hello there!</H3>
            <H1 padded>Try to scroll me around.</H1>
          </PaddedView>
        </ScrollView>
      )}
    </StretchyView>
  ))
  .add('stretchy as a header', () => (
    <StretchyView
      StretchyComponent={
        <ConnectedImage
          style={imageStyle}
          source={{ uri: 'https://picsum.photos/600/600' }}
        />
      }
    >
      {({ stretchyHeight, ...scrollViewProps }) => (
        <ScrollView {...scrollViewProps}>
          <View
            style={{
              height: stretchyHeight,
              alingItems: 'center',
              justifyContent: 'center',
            }}
          >
            <H2>Text on top of the stretchy!</H2>
          </View>
          <PaddedView>
            <H1 padded>Well hello there!</H1>
            <H2 padded>
              Hello there!
              {'\n'}
            </H2>
            <H3 padded>Hello there!</H3>
            <H1 padded>Try to scroll me around.</H1>
          </PaddedView>
        </ScrollView>
      )}
    </StretchyView>
  ));

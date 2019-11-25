/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from 'react-native';
import {
  ConnectedImage,
  GradientOverlayImage,
  PaddedView,
  H1,
  H2,
  H3,
  FeedView,
} from '@apollosproject/ui-kit';

import StretchyView from '.';

const itemStyle = {
  height: Dimensions.get('window').height / 1.5,
  width: '100%',
  backgroundColor: 'green',
  marginVertical: 20,
};
const imageStyle = { width: '100%', aspectRatio: 1 };

storiesOf('StretchyView', module)
  .add('stretchy as a background', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
        <ScrollView {...scrollViewProps}>
          <Stretchy background>
            <GradientOverlayImage
              overlayColor="white"
              overlayType="featured"
              source={{ uri: 'https://picsum.photos/id/233/600/600' }}
              style={imageStyle}
            />
          </Stretchy>
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
      {({ Stretchy, stretchyHeight, ...scrollViewProps }) => (
        <FlatList
          {...scrollViewProps}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          onEndReached={() => console.log('done')}
          ListHeaderComponent={() => (
            <View>
              <Stretchy>
                <ConnectedImage
                  style={imageStyle}
                  source={{ uri: 'https://picsum.photos/id/342/600/600' }}
                />
              </Stretchy>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <H2>Text on top of the stretchy!</H2>
              </View>
            </View>
          )}
          renderItem={() => (
            <PaddedView>
              <H1 padded>Well bye there!</H1>
              <H2 padded>
                Hello there!
                {'\n'}
              </H2>
              <H3 padded>Hello there!</H3>
              <H1 padded>Try to scroll me around.</H1>
            </PaddedView>
          )}
        />
      )}
    </StretchyView>
  ))
  .add('stretchy as a footer', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
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
          <Stretchy stretchOn="bottom">
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/id/342/600/600' }}
            />
          </Stretchy>
        </ScrollView>
      )}
    </StretchyView>
  ))
  .add('multiple stretchies', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
        <ScrollView {...scrollViewProps}>
          <Stretchy stretchyKey="header" stretchOn="top">
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/id/342/600/600' }}
            />
          </Stretchy>
          <PaddedView>
            <H1 padded>Well hello there!</H1>
            <H2 padded>
              Hello there!
              {'\n'}
            </H2>
            <H3 padded>Hello there!</H3>
            <H1 padded>Try to scroll me around.</H1>
          </PaddedView>
          <Stretchy stretchyKey="footer" stretchOn="bottom">
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/id/342/600/600' }}
            />
          </Stretchy>
        </ScrollView>
      )}
    </StretchyView>
  ))
  .add('embeded FeedView', () => (
    <StretchyView
      StretchyComponent={
        <ConnectedImage
          style={imageStyle}
          source={{ uri: 'https://picsum.photos/600/600' }}
        />
      }
    >
      {({ Stretchy, stretchyHeight, ...scrollViewProps }) => (
        <FeedView
          {...scrollViewProps}
          ListHeaderComponent={<Stretchy />}
          content={[{}, {}]}
          renderItem={() => <View style={itemStyle} />}
          fetchMore={() => console.warn('fetchMore')}
        />
      )}
    </StretchyView>
  ));

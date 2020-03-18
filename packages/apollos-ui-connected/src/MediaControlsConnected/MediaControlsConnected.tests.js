import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from '../utils/fragmentTypes.json';

import { Providers } from '../utils/testUtils';

import GET_CONTENT_MEDIA from './getContentMedia';
import MediaControlsConnected from './MediaControlsConnected';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe('MediaControlsConnected', () => {
  it('should render', async () => {
    const mock = {
      request: {
        query: GET_CONTENT_MEDIA,
        variables: { contentId: '1' },
      },
      result: {
        data: {
          node: {
            id: '1',
            title: 'Making Prayer a Spiritual Habit',

            parentChannel: {
              id: 'ContentChannel:772fcb6087247ebad630814e2ce0cd16',
              name: 'Sermon',
              __typename: 'ContentChannel',
            },
            coverImage: {
              sources: [
                {
                  uri:
                    'https://apollosrock.newspring.cc/GetImage.ashx?guid=55be1fd5-d8eb-43a6-aa70-f8e27bb63d31',
                  __typename: 'ImageMediaSource',
                },
              ],
              __typename: 'ImageMedia',
            },
            videos: [
              {
                sources: [
                  {
                    uri:
                      'http://embed.wistia.com/deliveries/f2238d5ea29dffe0e17027db93a7eb327eb68089.bin',
                    __typename: 'VideoMediaSource',
                  },
                ],
                __typename: 'VideoMedia',
              },
            ],
            __typename: 'WeekendContentItem',
          },
        },
      },
    };

    const tree = renderer.create(
      <Providers
        mocks={[mock]}
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <MediaControlsConnected contentId={'1'} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});

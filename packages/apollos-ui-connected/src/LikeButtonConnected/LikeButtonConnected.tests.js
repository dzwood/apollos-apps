import React from 'react';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'apolloschurchapp/src/client/fragmentTypes.json';

import { Providers, renderWithApolloData } from '../utils/testUtils';
import GET_LIKED_CONTENT_ITEM from './getLikedContentItem';

import LikeButtonConnected from './LikeButtonConnected';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe('LikeButtonConnected component', () => {
  it('renders Unliked LikeButtonConnected', async () => {
    const mock = {
      request: {
        query: GET_LIKED_CONTENT_ITEM,
        variables: { itemId: '1' },
      },
      result: {
        data: {
          node: {
            id: '1',
            isLiked: false,
            __typename: 'FAKE_TYPE_NAME',
          },
        },
      },
    };

    const tree = await renderWithApolloData(
      <Providers
        mocks={[mock]}
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <LikeButtonConnected itemId={'1'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders Liked LikeButtonConnected', async () => {
    const mock = {
      request: {
        query: GET_LIKED_CONTENT_ITEM,
        variables: { itemId: '1' },
      },
      result: {
        data: {
          node: {
            id: '1',
            isLiked: true,
            __typename: 'FAKE_TYPE_NAME',
          },
        },
      },
    };

    const tree = await renderWithApolloData(
      <Providers
        mocks={[mock]}
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <LikeButtonConnected itemId={'1'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});

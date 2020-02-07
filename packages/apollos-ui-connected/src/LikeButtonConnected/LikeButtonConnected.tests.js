import React from 'react';
import renderer from 'react-test-renderer';

import { Providers } from '../utils/testUtils';
import GET_LIKED_CONTENT_ITEM from './getLikedContentItem';

import LikeButtonConnected from './LikeButtonConnected';

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

    const tree = renderer.create(
      <Providers mocks={[mock]}>
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

    const tree = renderer.create(
      <Providers mocks={[mock]}>
        <LikeButtonConnected itemId={'1'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});

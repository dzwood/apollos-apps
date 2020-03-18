import React from 'react';
import renderer from 'react-test-renderer';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../utils/fragmentTypes.json';

import { Providers } from '../../utils/testUtils';

import { LikeIcon } from '.';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe('the LikeButton component', () => {
  it('should render a Like', () => {
    const tree = renderer.create(
      <Providers
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <LikeIcon itemId={'abc'} isLiked={false} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render a UnLike', () => {
    const tree = renderer.create(
      <Providers
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <LikeIcon itemId={'abc'} isLiked />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});

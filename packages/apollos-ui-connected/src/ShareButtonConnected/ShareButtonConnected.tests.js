import React from 'react';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from 'apolloschurchapp/src/client/fragmentTypes.json';
import { Providers, renderWithApolloData } from '../utils/testUtils';

import getShareContent from './getShareContent';
import ShareButtonConnected from '.';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const shareMock = {
  request: {
    query: getShareContent,
    variables: { itemId: '1' },
  },
  result: {
    data: {
      node: {
        id: '1',
        __typename: 'ContentSeriesContentItem',
        sharing: {
          url: 'https://apolloschurchapp.newspring.cc',
          title: 'Test Title ',
          message: 'test message',
          __typename: 'SharableContentItem',
        },
      },
    },
  },
};

const mocks = [shareMock];

describe('the ShareButtonConnected', () => {
  it('renders a share button', async () => {
    const tree = await renderWithApolloData(
      <Providers
        mocks={mocks}
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <ShareButtonConnected itemId={'1'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a share button with custom url, and title', async () => {
    const tree = await renderWithApolloData(
      <Providers
        mocks={mocks}
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <ShareButtonConnected
          itemId={'1'}
          url={'https://apollosrock.com'}
          title="Some great title"
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});

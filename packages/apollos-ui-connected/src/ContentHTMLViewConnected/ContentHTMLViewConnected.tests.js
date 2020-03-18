import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../utils/fragmentTypes.json';

import { Providers } from '../utils/testUtils';
import GET_CONTENT_ITEM_CONTENT from './getContentItemContent';

import ContentHTMLViewConnected from './ContentHTMLViewConnected';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe('ContentHTMLViewConnected component', () => {
  it('renders ContentHTMLViewConnected', async () => {
    const mock = {
      request: {
        query: GET_CONTENT_ITEM_CONTENT,
        variables: { contentId: '1' },
      },
      result: {
        data: {
          node: {
            __typename: 'DevotionalContentItem',
            id: '1',
            htmlContent: '<b>Some content!</b>',
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
        <ContentHTMLViewConnected contentId={'1'} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});

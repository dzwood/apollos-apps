import React from 'react';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from '../utils/fragmentTypes.json';

import { Providers, renderWithApolloData } from '../utils/testUtils';
import GET_CONTENT_CARD from '../ContentCardConnected/getContentCard';

import HorizontalContentCardConnected from '.';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe('HorizontalContentCardConnected component', () => {
  it('renders HorizontalContentCardConnected', async () => {
    const mock = {
      request: {
        query: GET_CONTENT_CARD,
        variables: {
          contentId: 'DevotionalContentItem:d395278cd4b68e074ca4e595c8feab6d',
        },
      },
      result: {
        data: {
          node: {
            id: 'DevotionalContentItem:d395278cd4b68e074ca4e595c8feab6d',
            title: 'God sees who you can be not who you are',
            parentChannel: {
              id: 'ContentChannel:559b23fd0aa90e81b1c023e72e230fa1',
              name: 'Devotional',
              iconName: 'text',
              __typename: 'ContentChannel',
            },
            hyphenatedTitle: 'Fake-hyphenated-title',
            summary: 'bla bla bla',
            isLiked: false,
            theme: null,
            coverImage: {
              sources: [
                {
                  uri:
                    'https://apollosrock.newspring.cc/GetImage.ashx?guid=993efb47-47ec-4dec-a3d3-47bcacfbd58e',
                  __typename: 'ImageMediaSource',
                },
              ],
              __typename: 'ImageMedia',
            },
            __typename: 'DevotionalContentItem',
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
        <HorizontalContentCardConnected
          contentId={'DevotionalContentItem:d395278cd4b68e074ca4e595c8feab6d'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});

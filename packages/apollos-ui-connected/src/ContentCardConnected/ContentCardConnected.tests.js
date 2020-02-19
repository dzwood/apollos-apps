import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'apolloschurchapp/src/client/fragmentTypes.json';

import { FeaturedCard } from '@apollosproject/ui-kit';

import { Providers } from '../utils/testUtils';
import GET_CONTENT_CARD from './getContentCard';

import ContentCardConnected from './ContentCardConnected';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe('ContentCardConnected component', () => {
  it('renders ContentCardConnected', async () => {
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
            node: {
              id: 'DevotionalContentItem:d395278cd4b68e074ca4e595c8feab6d',
              coverImage: {
                name: 'Square Image',
                sources: [
                  {
                    uri:
                      'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D31af1a61-360c-4b1e-8e62-45517c06a9a2',
                    __typename: 'ImageMediaSource',
                  },
                ],
                __typename: 'ImageMedia',
              },
              parentChannel: {
                id: 'ContentChannel:559b23fd0aa90e81b1c023e72e230fa1',
                name: 'Devotional',
                iconName: 'text',
                __typename: 'ContentChannel',
              },
              title: 'God sees who you can be not who you are',
              sharing: {
                url:
                  'https://apollosrock.newspring.cc/devotional/god-sees-who-you-can-be-not-who-you-are',
                message:
                  'God sees who you can be not who you are - Life is challenging enough.',
                title: 'Share via ...',
                __typename: 'SharableContentItem',
              },
              __typename: 'DevotionalContentItem',
            },
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
    const tree = renderer.create(
      <Providers
        mocks={[mock]}
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <ContentCardConnected
          Component={FeaturedCard}
          contentId={'DevotionalContentItem:d395278cd4b68e074ca4e595c8feab6d'}
          isLoading={false}
        />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});

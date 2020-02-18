import React from 'react';
import { Text } from 'react-native';

import { renderWithApolloData } from '../testUtils';

import fetchMoreResolver from '.';

describe('the fetchMoreResolver util', () => {
  const args = {
    collectionName: 'userFeed',
    variables: { first: 10, after: null },
    fetchMore: jest.fn(),
    data: {
      userFeed: {
        edges: [
          {
            node: { id: 'foo' },
          },
          {
            node: { id: 'bar' },
          },
        ],
        pageInfo: { endCursor: 'abc123' },
      },
    },
  };
  test('no endCursor', async () => {
    expect(
      await fetchMoreResolver({
        ...args,
        data: { userFeed: { edges: [], pageInfo: {} } },
      })()
    ).toBeUndefined();
  });
  test('combines data', async () => {
    await fetchMoreResolver({ ...args })();
    const previousResult = args.data;
    const fetchMoreResult = {
      userFeed: {
        edges: [{ node: { id: 'baz' } }],
        pageInfo: { endCursor: 'def456' },
      },
    };
    expect(
      args.fetchMore.mock.calls[0][0].updateQuery(previousResult, {
        fetchMoreResult,
      })
    ).toEqual({
      userFeed: {
        edges: [
          {
            node: { id: 'foo' },
          },
          {
            node: { id: 'bar' },
          },
          {
            node: { id: 'baz' },
          },
        ],
        pageInfo: { endCursor: 'def456' },
      },
    });
  });
});

test('renderWithApolloData renders the component', async () => {
  const tree = await renderWithApolloData(<Text>hello, world!</Text>);
  expect(tree).toMatchSnapshot();
});

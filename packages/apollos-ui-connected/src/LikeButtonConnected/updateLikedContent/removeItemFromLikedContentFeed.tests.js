import { GET_LIKED_CONTENT } from '../../LikedContentFeedConnected';

import removeItemFromLikedContentFeed from './removeItemFromLikedContentFeed';

const cache = {
  readQuery: jest.fn(),
  writeQuery: jest.fn(),
};

const data = {
  likedContent: {
    __typename: 'ContentItemsConnection',
    pageInfo: {
      __typename: 'PaginationInfo',
      endCursor: '123',
    },
    edges: [
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          audios: [],
          coverImage: null,
          hyphenatedTitle: 'Mea Animal Aperiam Ornatus Eu',
          id: 'UniversalContentItem:4',
          isLiked: true,
          likedCount: 0,
          parentChannel: {
            __typename: 'ContentChannel',
            iconName: 'text',
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
          },
          summary: 'Bla bla bla',
          theme: null,
          title: 'Mea Animal Aperiam Ornatus Eu',
          videos: [],
        },
      },
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          id: 'UniversalContentItem:1',
          coverImage: null,
          parentChannel: {
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
            iconName: 'text',
            __typename: 'ContentChannel',
          },
          title: 'Mea Animal Aperiam Ornatus Eu',
          hyphenatedTitle: 'Mea Animal Aperiam Ornatus Eu',
          summary: 'Bla bla bla',
          theme: null,
          isLiked: true,
          likedCount: 0,
          videos: [],
          audios: [],
        },
      },
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          id: 'UniversalContentItem:2',
          coverImage: null,
          parentChannel: {
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
            iconName: 'text',
            __typename: 'ContentChannel',
          },
          title: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          hyphenatedTitle: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          summary: 'Bla bla bla',
          theme: null,
          isLiked: true,
          likedCount: 0,
          videos: [],
          audios: [],
        },
      },
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          id: 'UniversalContentItem:3',
          coverImage: null,
          parentChannel: {
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
            iconName: 'text',
            __typename: 'ContentChannel',
          },
          title: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          hyphenatedTitle: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          summary: 'Bla bla bla',
          theme: null,
          isLiked: true,
          likedCount: 0,
          videos: [],
          audios: [],
        },
      },
    ],
  },
};

const writeQueryData = {
  likedContent: {
    __typename: 'ContentItemsConnection',
    edges: [
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          audios: [],
          coverImage: null,
          hyphenatedTitle: 'Mea Animal Aperiam Ornatus Eu',
          id: 'UniversalContentItem:1',
          isLiked: true,
          likedCount: 0,
          parentChannel: {
            __typename: 'ContentChannel',
            iconName: 'text',
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
          },
          summary: 'Bla bla bla',
          theme: null,
          title: 'Mea Animal Aperiam Ornatus Eu',
          videos: [],
        },
      },
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          audios: [],
          coverImage: null,
          hyphenatedTitle: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          id: 'UniversalContentItem:2',
          isLiked: true,
          likedCount: 0,
          parentChannel: {
            __typename: 'ContentChannel',
            iconName: 'text',
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
          },
          summary: 'Bla bla bla',
          theme: null,
          title: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          videos: [],
        },
      },
      {
        __typename: 'ContentItemsConnectionEdge',
        node: {
          __typename: 'UniversalContentItem',
          audios: [],
          coverImage: null,
          hyphenatedTitle: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          id: 'UniversalContentItem:3',
          isLiked: true,
          likedCount: 0,
          parentChannel: {
            __typename: 'ContentChannel',
            iconName: 'text',
            id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
            name: 'Editorial',
          },
          summary: 'Bla bla bla',
          theme: null,
          title: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
          videos: [],
        },
      },
    ],
    pageInfo: {
      __typename: 'PaginationInfo',
      endCursor: '123',
    },
  },
};

describe('removeItemFromLikedContentFeed', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should remove liked item to likedContent', async () => {
    cache.readQuery.mockReturnValue({
      ...data,
    });

    removeItemFromLikedContentFeed({
      cache,
      item: {
        id: 'UniversalContentItem:4',
        isLiked: false,
        __typename: 'UniversalContentItem',
      },

      variables: { first: 3 },
    });
    expect(cache.readQuery).toHaveBeenCalledTimes(1);
    expect(cache.writeQuery).toHaveBeenCalledTimes(1);
    expect(cache.readQuery).toHaveBeenCalledWith({
      query: GET_LIKED_CONTENT,
      variables: { first: 3 },
    });
    expect(cache.writeQuery).toHaveBeenCalledWith({
      query: GET_LIKED_CONTENT,
      variables: { first: 3 },
      data: writeQueryData,
    });
  });
});

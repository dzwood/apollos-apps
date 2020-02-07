import { GET_LIKED_CONTENT } from '../../LikedContentFeedConnected';

import removeItemFromLikedContentFeed from './removeItemFromLikedContentFeed';

const mockCache = {
  readQuery: jest.fn(),
  writeQuery: jest.fn(),
};

describe('removeItemFromLikedContentFeed', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should call GET_LIKED_CONTENT query', async () => {
    mockCache.readQuery.mockReturnValueOnce({
      result: {
        data: {
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
                  id: '1',
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
                  isLiked: false,
                  likedCount: 0,
                  videos: [],
                  audios: [],
                },
              },
              {
                __typename: 'ContentItemsConnectionEdge',
                node: {
                  __typename: 'UniversalContentItem',
                  id: '2',
                  coverImage: null,
                  parentChannel: {
                    id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Editorial',
                    iconName: 'text',
                    __typename: 'ContentChannel',
                  },
                  title: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
                  hyphenatedTitle:
                    'Probo Senserit Id Mea, Ut Sed Malis Postea,',
                  summary: 'Bla bla bla',
                  theme: null,
                  isLiked: false,
                  likedCount: 0,
                  videos: [],
                  audios: [],
                },
              },
            ],
          },
        },
      },
    });

    removeItemFromLikedContentFeed({
      cache: mockCache,
      item: { id: 1 },
      variables: { first: 3 },
    });
    expect(mockCache.readQuery).toHaveBeenCalledTimes(1);
    expect(mockCache.readQuery).toHaveBeenCalledWith({
      query: GET_LIKED_CONTENT,
      variables: { first: 3 },
    });
  });
});

import updateLikedContent from './updateLikedContent';
import addItemToLikedContentFeed from './addItemToLikedContentFeed';
import removeItemFromLikedContentFeed from './removeItemFromLikedContentFeed';

jest.mock('./addItemToLikedContentFeed', () => jest.fn());
jest.mock('./removeItemFromLikedContentFeed', () => jest.fn());

describe('updateLikedContent', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls addItemToLikedContentFeed if liked', () => {
    updateLikedContent({
      liked: true,
      cache: { item: 'FAKE_CACHE_ITEM' },
      item: { item: 'FAKE_ITEM' },
    });
    expect(removeItemFromLikedContentFeed).toHaveBeenCalledTimes(0);
    expect(addItemToLikedContentFeed).toHaveBeenCalledTimes(2);
    expect(addItemToLikedContentFeed).toHaveBeenCalledWith({
      cache: { item: 'FAKE_CACHE_ITEM' },
      item: { item: 'FAKE_ITEM' },
      variables: { first: 3 },
    });
    expect(addItemToLikedContentFeed).toHaveBeenCalledWith({
      cache: { item: 'FAKE_CACHE_ITEM' },
      item: { item: 'FAKE_ITEM' },
      variables: { first: 20 },
    });
  });

  it('call removeItemFromLikedContentFeed if not liked', () => {
    updateLikedContent({
      liked: false,
      cache: { item: 'FAKE_CACHE_ITEM' },
      item: { item: 'FAKE_ITEM' },
    });
    expect(addItemToLikedContentFeed).toHaveBeenCalledTimes(0);
    expect(removeItemFromLikedContentFeed).toHaveBeenCalledTimes(2);
    expect(removeItemFromLikedContentFeed).toHaveBeenCalledWith({
      cache: { item: 'FAKE_CACHE_ITEM' },
      item: { item: 'FAKE_ITEM' },
      variables: { first: 3 },
    });
    expect(removeItemFromLikedContentFeed).toHaveBeenCalledWith({
      cache: { item: 'FAKE_CACHE_ITEM' },
      item: { item: 'FAKE_ITEM' },
      variables: { first: 20 },
    });
  });
});

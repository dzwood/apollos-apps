import addItemToLikedContentFeed from './addItemToLikedContentFeed';
import removeItemFromLikedContentFeed from './removeItemFromLikedContentFeed';

const updateLikedContent = ({ liked, cache, item }) => {
  if (liked) {
    addItemToLikedContentFeed({ cache, item, variables: { first: 3 } });
    addItemToLikedContentFeed({ cache, item, variables: { first: 20 } });
  } else {
    removeItemFromLikedContentFeed({ cache, item, variables: { first: 3 } });
    removeItemFromLikedContentFeed({ cache, item, variables: { first: 20 } });
  }
};

export default updateLikedContent;

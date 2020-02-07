import { GET_LIKED_CONTENT } from '../../LikedContentFeedConnected';

const removeItemFromLikedContentFeed = ({ cache, item, variables }) => {
  try {
    const data = cache.readQuery({
      query: GET_LIKED_CONTENT,
      variables,
    });

    const filteredEdges = data.likedContent.edges.filter(
      ({ node }) => node.id !== item.id
    );

    cache.writeQuery({
      query: GET_LIKED_CONTENT,
      variables,
      data: {
        ...data,
        likedContent: {
          ...data.likedContent,
          edges: filteredEdges,
        },
      },
    });
  } catch (e) {
    console.log(e);
    // Most likely we haven't ran the `GET_LIKED_CONTENT` query yet.
    // We can safely exit.
  }
};

export default removeItemFromLikedContentFeed;

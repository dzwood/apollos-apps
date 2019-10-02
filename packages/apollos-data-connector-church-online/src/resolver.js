export default {
  Query: {
    liveStream: (root, args, { dataSources }) =>
      dataSources.LiveStream.getLiveStream(),
    activeLiveStreamContent: (root, args, { dataSources }) =>
      dataSources.ContentItem.getActiveLiveStreamContent(),
  },
};

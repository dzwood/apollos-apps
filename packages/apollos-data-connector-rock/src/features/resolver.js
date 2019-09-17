export default {
  WeekendContentItem: {
    features: (root, args, { dataSources: { ContentItem } }) =>
      ContentItem.getFeatures(root),
  },
  ContentSeriesContentItem: {
    features: (root, args, { dataSources: { ContentItem } }) =>
      ContentItem.getFeatures(root),
  },
  Feature: {
    // Implementors must attach __typename to root.
    __resolveType: ({ __typename }) => __typename,
  },
  TextFeature: {
    sharing: (root) => root,
  },
  TextFeatureSharable: {
    message: ({ body }) => body,
    title: () => 'Share text via...',
  },
  ScriptureFeature: {
    scriptures: ({ reference }, args, { dataSources: { Scripture } }) =>
      Scripture.getScriptures(reference),
    sharing: (root) => root,
  },
  ScriptureFeatureSharable: {
    message: ({ reference }, args, { dataSources: { Features } }) =>
      Features.getScriptureShareMessage(reference),
    title: () => 'Share scripture via...',
  },
  Query: {
    userFeedFeatures: async (root, args, { dataSources: { Features } }) =>
      Features.getHomeFeedFeatures(),
  },
};

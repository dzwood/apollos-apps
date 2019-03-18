import gql from 'graphql-tag';

// These are default implementations of different types
// TODO: Including these types should automatically detect the other features you have enabled (such as Themeable)

// eslint-disable-next-line
export const universalContentItem = gql`
  type UniversalContentItem implements ContentItem & ContentItemInSeries & ContentMedia & Node & Themeable & Shareable & Followable & CardFeedable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    contentSeriesFeed(input: FeedInput): Feed

    videos: [VideoMedia]
    audios: [AudioMedia]

    sharing: Share
    theme: Theme

    isLiked: Boolean
    likeCount: Int

    parentChannel: ContentChannel @deprecated
    siblingFeed(input: FeedInput): Feed @deprecated
  }
`;

export const devotionalContentItem = gql`
  type DevotionalContentItem implements ContentItem & ContentItemInSeries & Node & Themeable & Shareable & Followable & CardFeedable & Scriptureable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    contentSeriesFeed(input: FeedInput): Feed

    theme: Theme
    sharing: Share
    scripture: [Scripture]

    isLiked: Boolean
    likeCount: Int

    parentChannel: ContentChannel @deprecated
    siblingFeed(input: FeedInput): Feed @deprecated
  }
`;

export const mediaContentItem = gql`
  type MediaContentItem implements ContentItem & ContentMedia & ContentItemInSeries & Node & Themeable & Shareable & Followable & CardFeedable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    videos: [VideoMedia]
    audios: [AudioMedia]

    contentSeriesFeed(input: FeedInput): Feed

    sharing: Share
    theme: Theme

    isLiked: Boolean
    likeCount: Int

    parentChannel: ContentChannel @deprecated
    siblingFeed(input: FeedInput): Feed @deprecated
  }
`;

export const contentSeriesContentItem = gql`
  type ContentSeriesContentItem implements ContentItem & ContentMedia & ContentItemInSeries & Node & Themeable & Shareable & Followable & CardFeedable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    videos: [VideoMedia]
    audios: [AudioMedia]

    contentSeriesFeed(input: FeedInput): Feed

    sharing: Share
    theme: Theme

    isLiked: Boolean
    likeCount: Int

    parentChannel: ContentChannel @deprecated
    siblingFeed(input: FeedInput): Feed @deprecated
  }
`;

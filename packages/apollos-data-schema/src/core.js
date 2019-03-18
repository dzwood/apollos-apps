import gql from 'graphql-tag';

// These are the core type and interface definitions for Apollos API
// And should be included on any Apollos API server

export const contentSharableSchema = gql`
  type Share {
    url: String
    message: String
    title: String
  }

  interface Shareable {
    sharing: Share
  }
`;

export const contentItemSchema = gql`
  interface ContentItem {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
  }

  interface ContentItemInSeries {
    contentSeriesFeed(input: FeedInput): Feed
  }

  interface ContentMedia {
    videos: [VideoMedia]
    audios: [AudioMedia]
  }
`;

export const feedSchema = gql`
  interface CardFeedable {
    id: ID!
    title: String
    summary: String
    coverImage: ImageMedia
  }

  type Feed {
    edges: [FeedEdge]
    pageInfo: PaginationInfo
  }

  type PaginationInfo {
    startCursor: String
    endCursor: String
  }

  type FeedEdge {
    node: CardFeedable
    cursor: String
  }

  input FeedInput {
    first: Int
    after: String
  }

  extend type Query {
    userFeed(first: Int, after: String): Feed
    personaFeed(first: Int, after: String): Feed
  }
`;

export const scriptureSchema = gql`
  type Scripture {
    id: String
    html: String
    reference: String
    copyright: String
  }

  interface Scriptureable {
    scripture: [Scripture]
  }

  extend type Query {
    scripture(query: String!): Scripture
    scriptures(query: String!): [Scripture]
  }
`;

export const themeSchema = gql`
  type Theme {
    type: ThemeType
    colors: ThemeColors
  }

  interface Themeable {
    theme: Theme
  }

  enum ThemeType {
    LIGHT
    DARK
  }

  scalar Color

  type ThemeColors {
    primary: Color
    secondary: Color
    screen: Color
    paper: Color
    alert: Color
  }
`;

export const mediaSchema = gql`
  interface Media {
    name: String
    key: String
    sources: [MediaSource]
  }

  interface MediaSource {
    uri: String
  }

  type ImageMedia implements Media {
    name: String
    key: String
    sources: [ImageMediaSource]
  }

  type VideoMedia implements Media {
    name: String
    key: String
    sources: [VideoMediaSource]
    # duration: Float
    embedHtml: String
  }

  type AudioMedia implements Media {
    name: String
    key: String
    # duration: Float
    sources: [AudioMediaSource]
  }

  type AudioMediaSource implements MediaSource {
    uri: String
    # format: String
    # size: String
  }

  type ImageMediaSource implements MediaSource {
    uri: String
    # width: Int
    # height: Int
  }

  type VideoMediaSource implements MediaSource {
    uri: String
    # format: String
    # size: String
  }

  enum MediaInputType {
    IMAGE
    VIDEO
    AUDIO
  }
`;

const coreSchema = gql`
  ${contentSharableSchema}
  ${contentItemSchema}
  ${feedSchema}
  ${scriptureSchema}
  ${themeSchema}
  ${mediaSchema}
`;

export default coreSchema;

import gql from 'graphql-tag';
import { extendForEachContentItemType } from './utils';

export const testSchema = gql`
  scalar Upload
`;

export const authSmsSchema = gql`
  type SmsPinResult {
    success: Boolean
  }

  extend type Mutation {
    requestSmsLoginPin(phoneNumber: String!): SmsPinResult
    authenticateWithSms(phoneNumber: String!, pin: String!): Authentication
  }
`;

export const authSchema = gql`
  type AuthenticatedUser @cacheControl(maxAge: 0) {
    id: ID!
    profile: Person
    rockToken: String
  }

  type Authentication {
    user: AuthenticatedUser
    token: String
  }

  extend type Mutation {
    authenticate(identity: String!, password: String!): Authentication
    changePassword(password: String!): Authentication
    registerPerson(email: String!, password: String!): Authentication
  }

  extend type Query {
    currentUser: AuthenticatedUser
  }
`;

export const peopleSchema = gql`
  enum UPDATEABLE_PROFILE_FIELDS {
    FirstName
    LastName
    Email
    NickName
  }

  input UpdateProfileInput {
    field: UPDATEABLE_PROFILE_FIELDS!
    value: String!
  }

  type Person implements Node @cacheControl(maxAge: 0) {
    id: ID!
    firstName: String!
    lastName: String!
    nickName: String
    email: String
    photo: ImageMediaSource
  }

  extend type Mutation {
    updateProfileField(input: UpdateProfileInput!): Person
    updateProfileFields(input: [UpdateProfileInput]!): Person
    uploadProfileImage(file: Upload!, size: Int!): Person
  }

  extend type Query {
    people(email: String!): [Person]
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
`;

export const analyticsSchema = gql`
  # Not supported right now...
  # union AnalyticsValue = String | Float | Boolean | Int
  scalar AnalyticsValue

  input AnalyticsMetaField {
    field: String!
    value: AnalyticsValue
  }

  enum AnalyticsPlatform {
    iOS
    Android
  }

  input AnalyticsDeviceInfo {
    platform: AnalyticsPlatform
    deviceId: String
    deviceModel: String
    osVersion: String
    appVersion: String
  }

  input AnalyticsIdentifyInput {
    traits: [AnalyticsMetaField]
    anonymousId: String!
    deviceInfo: AnalyticsDeviceInfo
  }

  input AnalyticsTrackInput {
    eventName: String!
    properties: [AnalyticsMetaField]
    anonymousId: String
    deviceInfo: AnalyticsDeviceInfo
  }

  type AnalyticsResult {
    success: Boolean
  }

  extend type Mutation {
    identifySelf(input: AnalyticsIdentifyInput!): AnalyticsResult
    trackEvent(input: AnalyticsTrackInput!): AnalyticsResult
  }
`;

export const feedSchema = gql`
  interface CardFeedable {
    id: ID!
    title: String
    summary: String
    coverImage: ImageMedia
    hasMedia: Boolean
  }

  type Feed {
    edges: [FeedEdge]
    pageInfo: PaginationInfo
  }

  type FeedEdge {
    node: FeedNode
    cursor: String
  }

  input FeedInput {
    first: Int
    after: String
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

  type ContentItemsConnection {
    edges: [ContentItemsConnectionEdge]
    pageInfo: PaginationInfo
  }

  type ContentItemsConnectionEdge {
    node: ContentItem
    cursor: String
  }
`;

export const contentChannelSchema = gql`
  type ContentChannel implements Node & CardFeedable {
    id: ID!
    title: String
    summary: String
    coverImage: ImageMedia
    hasMedia: Boolean

    feed(first: Int, after: String): Feed
  }
`;

export const contentItemDefaultTypes = gql`
  type UniversalContentItem implements ContentItem & ContentMedia & Node & Themeable & Shareable & CardFeedable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    videos: [VideoMedia]
    audios: [AudioMedia]

    sharing: Share
    theme: Theme
  }

  type DevotionalContentItem implements ContentItem & ContentItemInSeries & Node & Themeable & Shareable & CardFeedable & Scriptureable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    contentSeriesFeed(input: FeedInput): Feed

    theme: Theme
    sharing: sharing
    scripture: [Scripture]
  }

  type MediaContentItem implements ContentItem & ContentMedia & ContentItemInSeries & Node & Themeable & Shareable & CardFeedable {
    id: ID!
    title: String
    coverImage: ImageMedia
    htmlContent: String
    summary: String

    contentSeriesFeed(input: FeedInput): Feed

    sharing: Share
    theme: Theme
  }

  type ContentSeriesContentItem implements ContentItem & ContentMedia & ContentItemInSeries & Node & Themeable & Shareable & CardFeedable {
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
  }
`;

export const contentSharableSchema = gql`
  interface Share {
    url: String
    message: String
    title: String
  }

  interface Shareable {
    sharing: Share
  }
`;

export const familySchema = gql`
  extend type Person {
    location: String
  }
`;

export const liveSchema = gql`
  type LiveStream {
    isLive: Boolean
    eventStartTime: String
  }

  extend type Query {
    liveStream: LiveStream
  }
`;

export const pushSchema = gql`
  input PushSettingsInput {
    enabled: Boolean
    pushProviderUserId: String
  }

  extend type Mutation {
    updateUserPushSettings(input: PushSettingsInput!): Person
  }
`;

export const campusSchema = gql`
  type Campus implements Node {
    id: ID!
    name: String!
    street1: String
    street2: String
    city: String
    state: String
    postalCode: String
    latitude: Float
    longitude: Float
    image: ImageMediaSource
    distanceFromLocation(location: CampusLocationInput): Float
  }

  extend type Query {
    campuses(location: CampusLocationInput): [Campus]
  }

  input CampusLocationInput {
    latitude: Float!
    longitude: Float!
  }
`;

export const followingsSchema = gql`
  enum LIKE_OPERATION {
    Like
    Unlike
  }

  input LikeEntityInput {
    nodeId: ID!
    operation: LIKE_OPERATION!
  }

  extend type Mutation {
    updateLikeEntity(input: LikeEntityInput!): ContentItem
  }

  ${extendForEachContentItemType(`
    isLiked: Boolean @cacheControl(maxAge: 0)
    likedCount: Int @cacheControl(maxAge: 0)
`)}

  extend type Query {
    getAllLikedContent: [ContentItem] @cacheControl(maxAge: 0)
  }
`;

export const passSchema = gql`
  extend type Query {
    userPass: Pass
  }

  type Pass implements Node {
    id: ID!
    type: PassType!
    description: String!
    logo: ImageMediaSource
    thumbnail: ImageMediaSource
    barcode: ImageMediaSource
    primaryFields: [PassField]
    secondaryFields: [PassField]
    backgroundColor: Color
    foregroundColor: Color
    labelColor: Color
    logoText: String
    passkitFileUrl: String
  }

  type PassField {
    key: String!
    label: String
    value: String!
    textAlignment: PassFieldTextAlignment
  }

  enum PassFieldTextAlignment {
    LEFT
    CENTER
    RIGHT
    NATURAL
  }

  enum PassType {
    GENERIC
  }
`;

export { extendForEachContentItemType };

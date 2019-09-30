import gql from 'graphql-tag';

export default gql`
  query getLiveContent {
    activeLiveStreamContent {
      id
      __typename
      ... on WeekendContentItem {
        liveStream {
          isLive
          eventStartTime
          media {
            sources {
              uri
            }
          }
          webViewUrl
        }
      }
    }
  }
`;

import gql from 'graphql-tag';

import { largeCardFragment } from '../ContentCardConnected';
import { contentItemFragment } from '../ContentSingle/getContentItem';

export default gql`
  query getContentFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentChannel {
        childContentItemsConnection {
          edges {
            node {
              ...contentItemFragment
              ...largeCardFragment
            }
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;

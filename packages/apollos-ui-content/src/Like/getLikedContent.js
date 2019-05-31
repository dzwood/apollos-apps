import gql from 'graphql-tag';

import { largeCardFragment } from '../ContentCardConnected/query';
import { contentItemFragment } from '../ContentSingle/getContentItem';

export default gql`
  query getAllLikedContent($first: Int) {
    likedContent(first: $first) {
      edges {
        node {
          ... on ContentItem {
            ...contentItemFragment
            ...largeCardFragment
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;

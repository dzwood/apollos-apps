import gql from 'graphql-tag';

import {
  largeCardFragment,
  contentItemFragment,
} from '@apollosproject/ui-content';

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

import gql from 'graphql-tag';

import {
  contentItemFragment,
  largeCardFragment,
} from '@apollosproject/ui-content';

export default gql`
  query getUserFeed {
    userFeed {
      edges {
        node {
          ...largeCardFragment
          ...contentItemFragment
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;

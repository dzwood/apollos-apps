import gql from 'graphql-tag';

import {
  largeCardFragment,
  contentItemFragment,
} from '@apollosproject/ui-content';

export default gql`
  query campaigns {
    campaigns {
      edges {
        node {
          childContentItemsConnection {
            edges {
              node {
                ...largeCardFragment
                ...contentItemFragment
              }
            }
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;

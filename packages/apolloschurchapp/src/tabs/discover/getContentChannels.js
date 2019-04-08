import gql from 'graphql-tag';

import {
  tileCardFragment,
  contentItemFragment,
} from '@apollosproject/ui-content';

export default gql`
  query getContentChannels {
    contentChannels {
      id
      name
      childContentItemsConnection(first: 3) {
        edges {
          node {
            id
            ...contentItemFragment
            ...tileCardFragment
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${tileCardFragment}
`;

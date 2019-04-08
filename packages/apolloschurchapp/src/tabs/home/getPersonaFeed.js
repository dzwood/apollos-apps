import gql from 'graphql-tag';

import {
  contentItemFragment,
  largeCardFragment,
} from '@apollosproject/ui-content';

export default gql`
  query getPersonaFeed {
    personaFeed(first: 4) {
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

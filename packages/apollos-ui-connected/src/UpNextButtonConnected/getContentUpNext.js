import ApollosConfig from '@apollosproject/config';
import gql from 'graphql-tag';

export default gql`
query getContentUpNext(nodeId: ID!) {
  node(id: ID!){
    ...ContentUpNextFragment
  }
}
${ApollosConfig.FRAGMENTS.CONTENT_UP_NEXT_FRAGMENT}
`;

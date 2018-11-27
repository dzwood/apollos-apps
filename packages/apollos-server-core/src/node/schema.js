import gql from 'graphql-tag';

export default gql`
  extend type Query {
    node(id: ID!): Node @cacheControl(maxAge: 3600)
  }

  interface Node {
    id: ID!
  }
`;

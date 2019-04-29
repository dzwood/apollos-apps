import gql from 'graphql-tag';

export default gql`
  query getUserFirstName {
    currentUser {
      id
      profile {
        firstName
      }
    }
  }
`;

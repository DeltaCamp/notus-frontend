import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment userFragment on User {
    id
  }
`;

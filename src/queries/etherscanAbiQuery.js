import gql from 'graphql-tag'

export const etherscanAbiQuery = gql`
  query etherscanAbiQuery($address: String!) {
    etherscanAbi(address: $address) {
      abiString: result
    }
  }
`
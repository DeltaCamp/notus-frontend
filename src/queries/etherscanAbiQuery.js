import gql from 'graphql-tag'

export const etherscanAbiQuery = gql`
  query etherscanAbiQuery($address: String!, $networkId: Float!) {
    etherscanAbi(address: $address, networkId: $networkId) {
      abiString: result
    }
  }
`
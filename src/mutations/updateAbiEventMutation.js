import gql from 'graphql-tag'

export const updateAbiEventMutation = gql`
  mutation updateAbiEventMutation($abiEvent: AbiEventDto!) {
    updateAbiEvent(abiEvent: $abiEvent) {
      id
      title
    }
  }
`

import gql from 'graphql-tag'

export const updateAbiEventInputMutation = gql`
  mutation updateAbiEventInputMutation($abiEventInput: AbiEventInputDto!) {
    updateAbiEventInput(abiEventInput: $abiEventInput) {
      id
      name
      type
      metaType
    }
  }
`

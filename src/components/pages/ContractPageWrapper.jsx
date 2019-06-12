import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { IsAuthed } from '~/components/IsAuthed'
import { ContractPage } from '~/components/pages/ContractPage'
import { contractQuery } from '~/queries/contractQuery'
import { updateAbiEventMutation } from '~/mutations/updateAbiEventMutation'
import { updateAbiEventInputMutation } from '~/mutations/updateAbiEventInputMutation'
import { updateContractMutation } from '~/mutations/updateContractMutation'

export const ContractPageWrapper =
  IsAuthed(
    graphql(updateContractMutation, { name: 'updateContractMutation' })(
      graphql(updateAbiEventMutation, { name: 'updateAbiEventMutation' })(
        graphql(updateAbiEventInputMutation, { name: 'updateAbiEventInputMutation' })(
          graphql(contractQuery, {
            name: 'contractData',
            skip: (props) => !props.match.params.contractId,
            options: (props) => ({
              fetchPolicy: 'network',
              variables: { id: parseInt(props.match.params.contractId, 10) }
            })
          })(
            class _ContractPageWrapper extends Component {
              render () {
                return <ContractPage {...this.props} />
              }
            }
          )
        )
      )
    )
  )

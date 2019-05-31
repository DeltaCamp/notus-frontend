import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { contractsQuery } from '~/queries/contractsQuery'
import { SCOPES, SCOPE_LABELS } from '~/constants'

const debug = require('debug')('notus:ScopeAndContractSelect')

export const ScopeAndContractSelect = graphql(contractsQuery, {
  name: 'contractsData',
  skip: (props) => !props.networkId,
  options: (props) => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      contractsQuery: {
        hasAbiEvents: true,
        networkId: props.networkId
      }
    }
  })
})(
  class _ScopeAndContractSelect extends PureComponent {
    static propTypes = {
      scope: PropTypes.number.isRequired,
      onChangeScopeAndContractId: PropTypes.func.isRequired,
      menuIsOpen: PropTypes.bool.isRequired,
      handleStopEditing: PropTypes.func.isRequired
    }

    onChange = (option) => {
      if (option.contract) {
        this.props.onChangeScopeAndContractId({
          scope: SCOPES.CONTRACT_EVENT,
          contract: option.contract
        })
      } else {
        this.props.onChangeScopeAndContractId({
          scope: option.value,
          contractId: null,
          abiEventId: null // do this here?
        })
      }

      this.props.handleStopEditing()
    }

    render () {
      const { scope, contractId } = this.props

      const scopeOptions = [
        {
          label: SCOPE_LABELS[SCOPES.TRANSACTION],
          value: SCOPES.TRANSACTION
        },
        {
          label: SCOPE_LABELS[SCOPES.BLOCK],
          value: SCOPES.BLOCK
        }
      ]

      const scopeGroup = {
        label: 'General',
        options: scopeOptions
      }

      let options = []
      let contracts = []
      const { contractsData } = this.props
      const { loading, error } = contractsData
      contracts = contractsData?.contracts?.contracts

      if (error) {
        console.error(error)
      } else if (!loading) {
        options = contracts.map(contract => {
          return {
            label: contract.name,
            value: `contract-${contract.id}`,
            contract
          }
        })
      }
      const contractsGroup = {
        label: 'Contract Event',
        options: options
      }

      let value
      if (scope === SCOPES.CONTRACT_EVENT) {
        value = options.find(contractOption => {
          const optionContractId = parseInt(contractOption.contract.id, 10)
          return contractOption.contract
            && optionContractId === parseInt(contractId, 10)
        })
      } else {
        value = scopeOptions.find(option => option.value === scope)
      }

      debug(`Scope: ${scope} contractId: ${contractId} value: `, value)

      return <NotusSelect
        {...this.props}
        value={value}
        options={[scopeGroup, contractsGroup]}
        onChange={this.onChange}
      />
    }
  }
)

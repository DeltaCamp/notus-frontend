import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { NotusSelect } from '~/components/forms/NotusSelect'

const debug = require('debug')('notus:components:AbiSelect')

export const AbiSelect = 
  class _AbiSelect extends PureComponent {
    static propTypes = {
      abiId: PropTypes.number,
      handleChangeAbi: PropTypes.func.isRequired,
      handleToggleAbiSelect: PropTypes.func.isRequired
    }

    onChange = (option) => {
      debug('run onChange')
      // if (option.contract) {
      //   this.props.onChangeScopeAndContractId({
      //     scope: SCOPES.CONTRACT_EVENT,
      //     contract: option.contract
      //   })
      // } else {
      //   this.props.onChangeScopeAndContractId({
      //     scope: option.value,
      //     contractId: null,
      //     abiEventId: null
      //   })
      // }
    }

    handleOpenReactSelect = () => {
      this.props.handleToggleAbiSelect(true)
    }

    handleCloseReactSelect = () => {
      this.props.handleToggleAbiSelect(false)
    }

    render () {
      let options = []
      let abis = []
      const { value } = this.props

      const createOptions = [
        {
          label: 'Copy & Paste ABI',
          value: 'paste'
        },
        {
          label: 'Upload ABI',
          value: 'upload'
        },
        {
          label: 'Pull from Etherscan',
          value: 'pull'
        }
      ]

      const createGroup = {
        label: 'Create ABI',
        options: createOptions
      }
      
      const { abisData } = this.props
      const { loading, error } = abisData
      abis = abisData?.abis?.abis

      if (error) {
        console.error(error)
      } else if (!loading) {
        options = abis.map(abi => {
          return {
            label: abi.name,
            value: abi.id,
            // value: `abi-${abi.id}`,
            abi
          }
        })
      }
      const abisGroup = {
        label: 'Choose Existing ABI',
        options: options
      }

      // let value
      // value = createOptions.find(option => option.value === scope)
      debug(`Scope: ${scope} contractId: ${contractId} value: `, value)

      return <NotusSelect
        {...this.props}
        value={value}
        options={[createGroup, abisGroup]}
        className='react-select__half-width'
        onChange={this.onChange}
        handleOpenReactSelect={this.handleOpenReactSelect}
        handleCloseReactSelect={this.handleCloseReactSelect}
      />
    }
  }

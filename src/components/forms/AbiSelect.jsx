import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { abisQuery } from '~/queries/abisQuery'

const debug = require('debug')('notus:components:AbiSelect')

export const AbiSelect = 
  graphql(abisQuery, {
    name: 'abisData',
    options: (props) => ({
      fetchPolicy: 'cache-and-network'
    })
  })(
    class _AbiSelect extends PureComponent {
      static propTypes = {
        abiId: PropTypes.string,
        abiCreateMethod: PropTypes.string,
        handleChangeAbi: PropTypes.func.isRequired,
      }

      handleChange = (option) => {
        debug('run handleChange option: ', option)

        if (option.abi) {
          this.props.handleChangeAbi({
            abiId: option.value,
            value: option.value
          })  
        } else {
          this.props.handleChangeAbi({
            abiId: null,
            value: option.value
          })
        }
      }

      render () {
        let value
        let existingOptions = []
        let abis = []

        const { abiId, abiCreateMethod } = this.props

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
          existingOptions = abis.map(abi => {
            return {
              label: abi.name,
              value: abi.id,
              abi
            }
          })
        }
        const abisGroup = {
          label: 'Choose Existing ABI',
          options: existingOptions
        }

        if (abiId) {
          value = existingOptions.find(option => option.value === abiId)
        } else if (abiCreateMethod) {
          value = createOptions.find(option => option.value === abiCreateMethod)
        }

        debug(`abiId: ${abiId}, abiCreateMethod: ${abiCreateMethod}, value: ${value}`)

        return <NotusSelect
          {...this.props}
          value={value}
          options={[createGroup, abisGroup]}
          className='react-select__half-width'
          onChange={this.handleChange}
        />
      }
    }
  )
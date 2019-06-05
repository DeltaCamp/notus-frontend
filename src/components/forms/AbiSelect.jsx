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
        abiId: PropTypes.number,
        handleChangeAbi: PropTypes.func.isRequired,
        handleToggleAbiSelect: PropTypes.func.isRequired
      }

      handleChange = (option) => {
        debug('run handleChange option: ', option)
        this.props.handleChangeAbi({
          abiId: option.value
        })
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

        const { abiId } = this.props
        let value = this.props.value || null

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

        if (abiId) {
          value = createOptions.find(option => option.value === abiId)
        }

        debug(`abiId: ${abiId} value: `, value)

        return <NotusSelect
          {...this.props}
          value={value}
          options={[createGroup, abisGroup]}
          className='react-select__half-width'
          onChange={this.handleChange}
          handleOpenReactSelect={this.handleOpenReactSelect}
          handleCloseReactSelect={this.handleCloseReactSelect}
        />
      }
    }
  )
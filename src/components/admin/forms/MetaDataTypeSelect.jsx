import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { metaDataTypesQuery } from '~/queries/metaDataTypesQuery'

export const MetaDataTypeSelect =
  graphql(metaDataTypesQuery, { name: 'metaDataTypesData' })(
    class _MetaDataTypeSelect extends PureComponent {
      static propTypes = {
        abiEventInputId: PropTypes.number.isRequired,
        value: PropTypes.string,
        handleMetaDataTypeChange: PropTypes.func.isRequired,
      }

      onChange = (newValue) => {
        const abiEventInputClone = {
          id: this.props.abiEventInputId,
          metaType: newValue?.value || null
        }

        this.props.handleMetaDataTypeChange(abiEventInputClone)
      }

      render() {
        let props = this.props

        const {
          metaDataTypesData,
          value,
        } = this.props

        const error = metaDataTypesData.error

        if (error) {
          console.error(error)
        }
        let options = metaDataTypesData.metaDataTypes || []

        options = options.map(metaDataType => (
          {
            value: metaDataType.metaDataType,
            label: metaDataType.title
          }
        ))

        let selectedOption
        if (value !== null && value !== undefined) {
          selectedOption = options.find(option => option.value === value)

          if (!selectedOption) {
            selectedOption = options[0]
          }

          props = { ...this.props, value: selectedOption }
        }

        return <NotusSelect
          {...props}
          options={options}
          isSearchable={false}
          isClearable
          onChange={this.onChange}
        />
      }
    }
  )

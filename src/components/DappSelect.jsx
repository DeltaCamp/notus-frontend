import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { PropTypes } from 'prop-types'
import { get } from 'lodash'
import AsyncCreatable from 'react-select/lib/AsyncCreatable'

import { currentUserQuery } from '~/queries/currentUserQuery'
import { dappUsersQuery } from '~/queries/dappUsersQuery'

export const DappSelect = graphql(currentUserQuery, { name: 'currentUserData' })(
  graphql(dappUsersQuery, {
    name: 'dappUsersQuery',
    skip: (props) => {
      return !get(props, 'currentUserData.currentUser.id')
    },
    options: (props) => {
      return {
        variables: {
          userId: get(props, 'currentUserData.currentUser.id'),
          owner: true
        }
      }
    }
  })(
    class _DappSelect extends PureComponent {
      static propTypes = {
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
      }

      onChangeApp = (option) => {
        let dapp
        if (typeof option.value === 'string') {
          dapp = {
            name: option.value
          }
        } else {
          dapp = {
            id: option.value
          }
        }
        this.props.onChange(dapp)
      }

      render () {
        const appOptions = get(this.props, 'dappUsersQuery.dappUsers', []).map(dappUser => {
          return {
            value: dappUser.dapp.id,
            label: dappUser.dapp.name
          }
        })

        let option
        if (this.props.value.id) {
          option = appOptions.find(option => option.value === this.props.value.id)
        } else {
          option = {
            value: this.props.value.name,
            label: this.props.value.name
          }
        }

        return (
          <AsyncCreatable
            value={option}
            onChange={this.onChangeApp}
            options={appOptions}
            getNewOptionData={(inputValue, optionLabel) => {
              return {
                value: inputValue,
                label: optionLabel
              }
            }}
            allowCreateWhileLoading={true}
            isValidNewOption={() => true}
            formatCreateLabel={(inputValue) => { return `Create new app "${inputValue}"...` }}
            createOptionPosition="first"
            />
        )
      }
    }
  )
)

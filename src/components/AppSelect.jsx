import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { PropTypes } from 'prop-types'
import { get } from 'lodash'
import AsyncCreatable from 'react-select/lib/AsyncCreatable'

import { currentUserQuery } from '~/queries/currentUserQuery'
import { appUsersQuery } from '~/queries/appUsersQuery'

export const AppSelect = graphql(currentUserQuery, { name: 'currentUserData' })(
  graphql(appUsersQuery, {
    name: 'appUsersQuery',
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
    class _AppSelect extends PureComponent {
      static propTypes = {
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
      }

      onChangeApp = (option) => {
        let app
        if (typeof option.value === 'string') {
          app = {
            name: option.value
          }
        } else {
          app = {
            id: option.value
          }
        }
        this.props.onChange(app)
      }

      render () {
        const appOptions = get(this.props, 'appUsersQuery.appUsers', []).map(appUser => {
          return {
            value: appUser.app.id,
            label: appUser.app.name
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
            allowCreateWhileLoading
            isValidNewOption={() => true}
            formatCreateLabel={(inputValue) => { return `Create new app "${inputValue}"...` }}
            createOptionPosition='first'
          />
        )
      }
    }
  )
)

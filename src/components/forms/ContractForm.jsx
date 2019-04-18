import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle } from 'react-feather'
import { graphql } from 'react-apollo'
import { createAbiMutation } from '~/mutations/createAbiMutation'

import { ABIUpload } from '~/components/ABIUpload'

export const ContractForm = graphql(createAbiMutation, { name: 'createAbiMutation' })(
  class _ContractForm extends PureComponent {

    static propTypes = {
      onCreate: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired
    }

    constructor (props) {
      super(props)
      this.state = {
        name: '',
        abi: '',
        nameError: null,
        abiError: null
      }
    }

    onChangeName = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    onChangeAddress = (e) => {
      this.setState({
        address: e.target.value
      })
    }

    handleAbi = ({ name, abi }) => {
      const newState = {
        abi: JSON.stringify(abi, null, 2)
      }
      if (name) {
        newState.name = name
      }

      this.setState({
        ...newState
      })
    }

    handleAbiError = (message, files) => {
      console.log('err ', message, files)
    }

    onSubmit = (e) => {
      e.preventDefault()

      this.props.createAbiMutation({
        variables: {
          abi: {
            name: this.state.name,
            abi: this.state.abi
          }
        },
        refetchQueries: ['abiEventsQuery']
      }).then(({ data }) => {
        this.props.onCreate(data.createAbi)
      })
    }

    render () {


      return (
        <form className='form' onSubmit={this.onSubmit}>

          <div className='field'>
            <ABIUpload onAbi={this.handleAbi} onError={this.handleAbiError} />
          </div>

          
          <div className='field'>
            <input
              className='input'
              type='text'
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder={`Name`}
            />
          </div>

          <textarea className='textarea' value={this.state.abi} onChange={(e) => this.setState({abi: e.target.value}) } />

          <button
            className='button has-icon has-stroke-green'
            onClick={this.onSubmit}
          >
            <CheckCircle
              className='icon__button has-stroke-green'
            />
          </button>

          <button onClick={this.props.onCancel} className='button'>Cancel</button>

        </form>
      )
    }
  }
)
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { CheckCircle } from 'react-feather'
import { graphql } from 'react-apollo'

import { ABIUpload } from '~/components/ABIUpload'
import { createAbiMutation } from '~/mutations/createAbiMutation'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'

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

      if (name && this.state.name === '') {
        newState.name = name
      }

      this.setState({
        ...newState
      })
    }

    handleAbiError = (message, files) => {
      console.log('err ', message, files)
    }

    handleSubmit = (e) => {
      e.preventDefault()

      if (this.state.name === '' || this.state.abi === '') {
        return
      }

      this.props.createAbiMutation({
        variables: {
          abi: {
            name: this.state.name,
            abi: this.state.abi
          }
        },
        refetchQueries: ['abiEventsQuery']
      }).then(({ data }) => {
        notusToast.success('Contract added successfully')
        this.props.onCreate(data.createAbi)
      }).catch(error => {
        console.warn(error)

        error = {
          message: `Please format your ABI code correctly (${error.message})`
        }
        showErrorMessage(error)
      })
    }

    invalid = () => {
      return (this.state.name === '' || this.state.abi === '')
    }

    showErrorTooltip = () => {
      if (this.invalid()) {
        ReactTooltip.show(ReactDOM.findDOMNode(this.refs.errorTooltip))
      }
    }

    hideErrorTooltip = () => {
      ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.errorTooltip))
    }

    render () {
      return (
        <div className='form'>
          <div className='field'>
            <ABIUpload onAbi={this.handleAbi} onError={this.handleAbiError} />
          </div>

          <hr />

          <div className='field'>
            <input
              className='input'
              type='text'
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder={`Contract Name`}
            />
          </div>

          <textarea
            className='textarea'
            value={this.state.abi}
            onChange={(e) => this.setState({ abi: e.target.value })}
            placeholder={`Paste Contract ABI here or upload file above ...`}
          />

          <div className='buttons mt30 has-text-right has-margin-left-auto'>
            <button
              onClick={this.props.onCancel}
              className='button is-outlined is-light'
            >
              Cancel
            </button>
            <button
              className='button is-success has-stroke-white'
              onClick={this.handleSubmit}
              data-tip={this.invalid() ? `Please enter both a name for the new Contract as well as the ABI.` : ''}
            >
              <CheckCircle
                className='has-stroke-white'
              />&nbsp;Save
            </button>
          </div>
        </div>
      )
    }
  }
)

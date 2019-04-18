import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle } from 'react-feather'

import { ABIUpload } from '~/components/ABIUpload'

export const ContractForm = class _ContractForm extends PureComponent {

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      abi: ''
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

  onUploadAbi = (files) => {

  }

  onSubmit = (e) => {
    e.preventDefault()
  }

  render () {
    return (
      <form className='form drawer-form' onSubmit={this.onSubmit}>
        <input
          className='input'
          type='text'
          value={this.state.name}
          onChange={this.onChangeName}
          placeholder={`Name`}
        />

        <input
          className='input'
          type='text'
          value={this.state.address}
          onChange={this.onChangeAddress}
          placeholder={`Address`}
        />

        <ABIUpload onUpload={this.onUploadAbi} />

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
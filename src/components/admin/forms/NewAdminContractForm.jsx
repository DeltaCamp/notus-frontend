import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { ethers } from 'ethers'
import { CheckCircle } from 'react-feather'
import { graphql } from 'react-apollo'

import { AddressInput } from '~/components/AddressInput'
import { ABIUpload } from '~/components/ABIUpload'
import { createContractMutation } from '~/mutations/createContractMutation'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'

export const NewAdminContractForm = 
  graphql(createContractMutation, { name: 'createContractMutation' })(
    class _NewAdminContractForm extends PureComponent {
      state = {
        contract: {
          address: '',
          name: '',
          abi: {
            abi: ''
          }
        },
        hasCustomizedName: false
      }

      static propTypes = {
        onClose: PropTypes.func.isRequired,
        redirectToAdminContractPage: PropTypes.func.isRequired,
      }

      handleNameChange = (e) => {
        this.setState({
          contract: {
            ...this.state.contract,
            name: e.target.value
          },
          hasCustomizedName: true
        })
      }

      handleAddressChange = (e) => {
        this.setState({
          contract: {
            ...this.state.contract,
            address: e.target.value
          }
        })
      }

      handleAbiChange = (e) => {
        this.setState({
          contract: {
            ...this.state.contract,
            abi: {
              abi: e.target.value
            }
          }
        })
      }

      handleAbi = ({ name, abi }) => {
        const newName = this.state.hasCustomizedName
          ? this.state.contract.name
          : name

        this.setState({
          contract: {
            ...this.state.contract,
            name: newName,
            abi: {
              name: newName,
              abi: JSON.stringify(abi, null, 2)
            }
          }
        })
      }

      handleAbiError = (message, files) => {
        console.log('err ', message, files)
      }

      handleSubmit = (e) => {
        e.preventDefault()

        if (this.invalid()) { 
          showErrorMessage(this.invalidMessage())
          return
        }

        const variables = {
          contract: this.state.contract
        }

        this.props.createContractMutation({
          variables,
          refetchQueries: ['contractsQuery']
        }).then(({ data }) => {
          notusToast.success('Contract added successfully')
          this.props.redirectToAdminContractPage(
            parseInt(data.createContract.id, 10)
          )
        }).catch(error => {
          console.warn(error)

          error = {
            message: `Please format your ABI code correctly (${error.message})`
          }

          showErrorMessage(error)
        })
      }

      addressIsValid = () => {
        try {
          ethers.utils.getAddress(this.state.contract.address)
          return true
        } catch {
          return false
        }
      }

      invalid = () => {
        return (
          !this.addressIsValid()
          || this.state.contract.name === ''
          || this.state.contract.abi === ''
        )
      }

      invalidMessage = () => {
        return 'Please enter a contract address, name and ABI (as JSON) for the new Contract.'
      }

      showErrorTooltip = () => {
        if (this.invalid()) {
          ReactTooltip.show(ReactDOM.findDOMNode(this.refs.errorTooltip))
        }
      }

      hideErrorTooltip = () => {
        ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.errorTooltip))
      }

      handleCancel = () => {
        this.props.onClose()
      }

      render () {
        return (
          <div className='form'>
            <div className='field'>
              <ABIUpload
                onAbi={this.handleAbi}
                onError={this.handleAbiError}
              />
            </div>

            <hr />

            <div className='field'>
              <AddressInput
                onChange={this.handleAddressChange}
                placeholder={`Contract Address (Mainnet)`}
                value={this.state.contract.address}
              />
            </div>

            <div className='field'>
              <input
                className='input'
                type='text'
                value={this.state.contract.name}
                onChange={this.handleNameChange}
                placeholder={`Contract Name`}
              />
            </div>

            <div className='field'>
              <textarea
                className='textarea'
                value={this.state.contract.abi.abi}
                onChange={this.handleAbiChange}
                placeholder={`Paste Contract ABI here or upload file above ...`}
              />
            </div>

            <div className='buttons mt30 has-text-right has-margin-left-auto'>
              <button
                onClick={this.handleCancel}
                className='button is-outlined is-light'
              >
                Cancel
              </button>
              
              <ReactTooltip
                id='new-admin-contract-form-hint'
                place='top'
                effect='solid'
              />

              <div
                data-for='new-admin-contract-form-hint'
                data-tip={this.invalid() ? this.invalidMessage() : ''}
              >
                <button
                  className='button is-success has-stroke-white has-fat-icons'
                  onClick={this.handleSubmit}
                  disabled={this.invalid()}
                >
                  <CheckCircle
                    className='has-stroke-white'
                  />&nbsp;Save
                </button>
              </div>
            </div>
          </div>
        )
      }
    }
  )

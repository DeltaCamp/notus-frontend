import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { CheckCircle } from 'react-feather'
import { graphql } from 'react-apollo'

import { ABIUpload } from '~/components/ABIUpload'
import { createAbiMutation } from '~/mutations/createAbiMutation'
import { createContractMutation } from '~/mutations/createContractMutation'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'

export const NewAdminContractForm = 
  graphql(createContractMutation, { name: 'createContractMutation' })(
    graphql(createAbiMutation, { name: 'createAbiMutation' })(
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
          onCreate: PropTypes.func.isRequired,
          onCancel: PropTypes.func.isRequired
        }

        onChangeName = (e) => {
          this.setState({
            contract: {
              name: e.target.value
            },
            hasCustomizedName: true
          })
        }

        onChangeAddress = (e) => {
          this.setState({
            address: e.target.value
          })
        }

        handleAbi = ({ name, abi }) => {
          const newName = this.state.hasCustomizedName
            ? this.state.contract.name
            : name

          this.setState({
            contract: {
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

          this.props.createContractMutation({
            variables: {
              contract: this.state.contract
            },
            refetchQueries: ['contractsQuery']
          }).then(({ data }) => {
            notusToast.success('Contract added successfully')
            // this.props.onCreate(data.createAbi)
          }).catch(error => {
            console.warn(error)

            error = {
              message: `Please format your ABI code correctly (${error.message})`
            }
            showErrorMessage(error)
          })
        }

        invalid = () => {
          return (
            this.state.contract.address === ''
            || this.state.contract.name === ''
            || this.state.contract.abi === ''
          )
        }

        invalidMessage = () => {
          return 'Please enter both a name for the new Contract as well as the ABI.'
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
                  value={this.state.contract.address}
                  onChange={this.onChangeAddress}
                  placeholder={`Contract Address (Mainnet)`}
                />
              </div>

              <div className='field'>
                <input
                  className='input'
                  type='text'
                  value={this.state.contract.name}
                  onChange={this.onChangeName}
                  placeholder={`Contract Name`}
                />
              </div>

              <div className='field'>
                <textarea
                  className='textarea'
                  value={this.state.contract.abi.abi}
                  onChange={(e) => this.setState({ abi: e.target.value })}
                  placeholder={`Paste Contract ABI here or upload file above ...`}
                />
              </div>

              <div className='buttons mt30 has-text-right has-margin-left-auto'>
                <button
                  onClick={this.props.onCancel}
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
  )

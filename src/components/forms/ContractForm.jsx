import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { ethers } from 'ethers'
import { Save } from 'react-feather'
import { withApollo, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import { AddressInput } from '~/components/AddressInput'
import { AbiCodeBox } from '~/components/AbiCodeBox'
import { AbiSelect } from '~/components/forms/AbiSelect'
import { ABIUpload } from '~/components/ABIUpload'
import { NetworkSelect } from '~/components/forms/NetworkSelect'
import { TextInput } from '~/components/TextInput'
import { createContractMutation } from '~/mutations/createContractMutation'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'
import { etherscanAbiQuery } from '~/queries/etherscanAbiQuery'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { updateUserMutation } from '~/mutations/updateUserMutation'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:components:ContractForm')

export const ContractForm = 
  withApollo(
    graphql(updateUserMutation, { name: 'updateUserMutation' })(
      graphql(currentUserQuery, { name: 'currentUserQuery' })(
        graphql(createContractMutation, { name: 'createContractMutation' })(
          ReactTimeout(class _ContractForm extends PureComponent {
            state = {
              contract: {
                address: '',
                name: '',
                networkId: 1,
                abi: {
                  id: null,
                  name: '',
                  abi: ''
                }
              },
              hasCustomizedName: false,
              hasCustomizedAbiName: false,
              abiCreateMethod: '',
              isHiding: false,
              networkName: 'mainnet'
            }

            static propTypes = {
              redirectToContractPage: PropTypes.func.isRequired,
            }

            handleToggleEditingNetwork = (newValue) => {
              // debug('handleToggleEditingNetwork', newValue)
              this.setState({ editingNetwork: newValue })
            }

            handleNameChange = (e) => {
              const newAbiName = this.state.hasCustomizedAbiName ?
                this.state.contract.abi.name :
                e.target.value
                
              this.setState({
                contract: {
                  ...this.state.contract,
                  name: e.target.value,
                  abi: {
                    ...this.state.contract.abi,
                    name: newAbiName
                  }
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

            handleNetworkIdChange = (networkId, networkName) => {
              this.setState({
                contract: {
                  ...this.state.contract,
                  networkId: parseInt(networkId, 10)
                },
                networkName: networkName
              })
            }

            handleAbiUpload = ({ name, abi }) => {
              const newName = this.state.hasCustomizedName
                ? this.state.contract.name
                : name

              const newAbiName = this.state.hasCustomizedAbiName ?
                this.state.contract.abi.name :
                newName

              this.setState({
                contract: {
                  ...this.state.contract,
                  name: newName,
                  abi: {
                    name: newAbiName,
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
                this.props.redirectToContractPage(
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

            onPullAbiFromEtherscan = async () => {
              if (!this.props.currentUserQuery.currentUser.etherscan_api_key) {
                notusToast.error(
                  <span>
                    You need to add your Etherscan API key: <Link to={routes.ACCOUNT_SETTINGS}>Update your Settings</Link>
                  </span>
                )
                return
              }

              if (!this.state.contract.address) {
                notusToast.error('You must enter an address')
                return
              }

              const variables = {
                address: this.state.contract.address,
                networkId: this.state.contract.networkId
              }

              const response = await this.props.client.query({
                query: etherscanAbiQuery,
                variables
              })
              
              const { abiString } = response.data.etherscanAbi

              if (abiString) {
                this.setState({
                  contract: {
                    ...this.state.contract,
                    abi: {
                      ...this.state.contract.abi,
                      abi: abiString
                    }
                  }
                })
              }
            }

            handleChangeAbi = ({ abiId, value }) => {
              // debug(`handleChangeAbi value: ${value}, abiId: ${abiId}`)

              if (abiId) {
                this.setState({
                  abiCreateMethod: null,
                  contract: {
                    ...this.state.contract,
                    abi: {
                      ...this.state.contract.abi,
                      id: value
                    }
                  }
                })
              } else {
                this.setState({
                  abiCreateMethod: value,
                  isHiding: true,
                  contract: {
                    ...this.state.contract,
                    abi: {
                      ...this.state.contract.abi,
                      id: null
                    }
                  }
                }, () => {
                  this.props.setTimeout(
                    () => { this.setState({ isHiding: false }) },
                    150
                  )
                })
              }
            }

            handleChangeAbiBody = (e) => {
              this.setState({
                contract: {
                  ...this.state.contract,
                  abi: {
                    ...this.state.contract.abi,
                    abi: e.target.value
                  }
                }
              })
            }

            handleSubmitEtherscanApiKey = async (apiKey) => {
              this.props.updateUserMutation({
                variables: {
                  user: {
                    etherscan_api_key: apiKey
                  }
                }
              }).then(() => {
                notusToast.success('Updated Your Etherscan API Key')
              })
            }

            handleChangeAbiName = (e) => {
              this.setState({
                contract: {
                  ...this.state.contract,
                  abi: {
                    ...this.state.contract.abi,
                    name: e.target.value
                  }
                },
                hasCustomizedAbiName: true
              })
            }

            render () {
              let etherscan_api_key = ''
              const { currentUser } = this.props.currentUserQuery

              if (currentUser) {
                debug(currentUser)
                etherscan_api_key = currentUser.etherscan_api_key || ''
              }

              const { abiCreateMethod } = this.state
              debug(`handleChangeAbi abiCreateMethod: ${abiCreateMethod}`)

              return (
                <>
                  <div
                    className={`event-box color-block is-dark-colored`}
                  >
                    <div className='is-brightness-60 is-full-width-background' />

                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 col-sm-9 col-lg-8'>

                          <div className='form'>
                            <div className='field'>
                              Network: 
                              <NetworkSelect
                                networkId={parseInt(this.state.contract.networkId, 10)}
                                onChangeNetworkId={this.handleNetworkIdChange}
                                handleToggleEditingNetwork={this.handleToggleEditingNetwork}
                              />
                            </div>
                            
                            <div className='field'>
                              <AddressInput
                                onChange={this.handleAddressChange}
                                placeholder={`Contract Address`}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`event-box color-block is-dark-colored has-min-height`}
                  >
                    <div className='is-brightness-40 is-full-width-background' />

                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 col-sm-9 col-lg-8'>

                          <div className='form'>

                            <div className='field'>
                              ABI: <AbiSelect
                                abiId={this.state.contract.abi.id}
                                abiCreateMethod={abiCreateMethod}
                                handleChangeAbi={this.handleChangeAbi}
                              />
                            </div>


                            <div className={classnames(
                              'accordion-max-height',
                              {
                                'accordion-max-height-enter-done': (
                                  !this.state.isHiding &&
                                  this.state.abiCreateMethod === 'upload'
                                )
                              }
                            )}>
                              <div className='field pb20'>
                                <ABIUpload
                                  onAbi={this.handleAbiUpload}
                                  onError={this.handleAbiError}
                                />
                              </div>
                            </div>

                            {!this.state.contract.abi.id &&
                              <div className='field'>
                                <label
                                  htmlFor='abi-name-input'
                                  className='label'
                                >
                                  ABI Name:
                                </label>
                                <input
                                  className='input'
                                  type='text'
                                  id='abi-name-input'
                                  value={this.state.contract.abi.name}
                                  onChange={this.handleChangeAbiName}
                                  placeholder='ABI Name'
                                />
                              </div>
                            }
                            

                            <div className={classnames(
                              'accordion-max-height',
                              {
                                'accordion-max-height-enter-done': (
                                  !this.state.isHiding &&
                                  this.state.abiCreateMethod === 'paste'
                                )
                              }
                            )}>
                              <div className='field'>
                                <textarea
                                  className='textarea'
                                  value={this.state.contract.abi.abi}
                                  onChange={this.handleChangeAbiBody}
                                  placeholder={`Paste Contract ABI (JSON) here ...`}
                                />
                              </div>
                            </div>



                            <div className={classnames(
                              'accordion-max-height',
                              {
                                'accordion-max-height-enter-done': (
                                  !this.state.isHiding &&
                                  this.state.abiCreateMethod === 'pull'
                                )
                              }
                            )}>
                              <>
                                <div className='field'>
                                  <label
                                    htmlFor='etherscanApiKey-input'
                                    className='label'
                                  >
                                    Etherscan API Key
                                  </label>
                                  <TextInput
                                    id='etherscanApiKey-input'
                                    value={etherscan_api_key}
                                    handleSubmit={this.handleSubmitEtherscanApiKey}
                                    placeholder='Enter Your Etherscan API Key'
                                    className='event-box__variable__half-width'
                                  />
                                </div>
                                <div className='field'>
                                  <button
                                    className='button is-info'
                                    onClick={this.onPullAbiFromEtherscan}
                                    disabled={!etherscan_api_key || !this.state.contract.address}
                                  >
                                    Pull
                                  </button>
                                </div>
                              </>
                            </div>

                            <div className={classnames(
                              'accordion-max-height',
                              {
                                'accordion-max-height-enter-done': (
                                  !this.state.isHiding && 
                                    this.state.abiCreateMethod !== 'paste'
                                )
                              }
                            )}>
                              <AbiCodeBox
                                abiBody={this.state.contract.abi.abi}
                                abiId={this.state.contract.abi.id}
                              />
                            </div>

                            <div className={classnames(
                              'accordion-max-height',
                              {
                                'accordion-max-height-enter-done': (
                                  !this.state.isHiding &&
                                  this.state.abiCreateMethod === 'pull'
                                )
                              }
                            )}>
                              <p className='hint'>
                                {(
                                  this.state.contract.address &&
                                  this.state.networkName
                                ) ? 
                                  <>
                                    Click 'Pull' to download the ABI&nbsp;
                                    {this.state.contract.address &&
                                      <>
                                        for '{this.state.contract.address}'&nbsp;
                                      </>
                                    }
                                    {this.state.networkName &&
                                      <>
                                        on '{this.state.networkName}'&nbsp;
                                      </>
                                    }
                                    from Etherscan
                                  </> :
                                  <>
                                    Please enter the contract address first.
                                  </>
                                }
                              </p>
                            </div>

                          </div>
                        </div>

                        

                      </div>
                    </div>
                  </div>

                  <div className={`is-white-ter pt30 pb30`}>
                    <div className={`container-fluid`}>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-xs-12 has-text-centered is-size-4'>
                            <ReactTooltip
                              id='new-admin-contract-form-hint'
                              place='top'
                              effect='solid'
                            />

                            <span
                              data-for='new-admin-contract-form-hint'
                              data-tip={this.invalid() ? this.invalidMessage() : ''}
                            >
                              <button
                                className='button is-success has-stroke-white has-fat-icons'
                                onClick={this.handleSubmit}
                                disabled={this.invalid()}
                              >
                                <Save
                                  className='has-stroke-white'
                                />&nbsp;Save contract
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          })
        )
      )
    )
  )
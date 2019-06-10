import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'

import { ScrollToTop } from '~/components/ScrollToTop'
import { MetaDataTypeSelect } from '~/components/admin/forms/MetaDataTypeSelect'
import { PublishButton } from '~/components/contracts/PublishButton'
import { ColorBlock } from '~/components/forms/ColorBlock'
import { FormBanner } from '~/components/forms/FormBanner'
import { FooterContainer } from '~/components/layout/Footer'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { updateAbiEventInputMutation } from '~/mutations/updateAbiEventInputMutation'
import { updateContractMutation } from '~/mutations/updateContractMutation'
import { contractQuery } from '~/queries/contractQuery'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:components:ContractPage')

export const ContractPage =
  graphql(updateContractMutation, { name: 'updateContractMutation' })(
    graphql(updateAbiEventInputMutation, { name: 'updateAbiEventInputMutation' })(
      graphql(contractQuery, {
        name: 'contractData',
        skip: (props) => !props.match.params.contractId,
        options: (props) => ({
          fetchPolicy: 'network',
          variables: { id: parseInt(props.match.params.contractId, 10) }
        })
      })(
        class _ContractPage extends Component {

          handleTogglePublish = (contract) => {
            const { currentUser } = this.props

            if (currentUser && !currentUser.confirmedAt) {
              notusToast.info(`You will need to confirm your ${currentUser.email} email address before you can publish this contract.`)
              this.props.history.push(routes.ACCOUNT_SETTINGS)
              return
            }
            console.log(contract)

            const isPublic = !contract.isPublic
            const contractDto = {
              id: contract.id,
              isPublic
            }

            this.doGenericUpdateContract(contractDto, `Contract is now ${isPublic ? 'visible to everyone.' : 'only visible to you.'}`)
          }

          doGenericUpdateContract = (contractDto, successMessage = 'Contract updated.') => {
            debug('doGenericUpdateContract: ', contractDto)

            return this.props.updateContractMutation({
              variables: {
                contract: contractDto
              },
              refetchQueries: [
                // only refetch the contract we just updated (1 record)
                'contractsQuery'
              ]
            }).then(() => {
              notusToast.success(successMessage)
            }).catch(error => {
              console.error(error)
              showErrorMessage(error)
            })
          }

          handleMetaDataTypeChange = (abiEventInput) => {
            const variables = {
              abiEventInput
            }

            this.props.updateAbiEventInputMutation({
              variables,
              refetchQueries: ['contractsQuery']
            }).then(({ data }) => {
              notusToast.success('ABI Event Input updated successfully')
            }).catch(error => {
              console.warn(error)

              error = {
                message: `Incorrect metaDataType? (${error.message})`
              }

              showErrorMessage(error)
            })
          }

          render () {
            let contract,
              abiEvents

            const { contractData } = this.props
            const { loading, error } = contractData || {}

            if (error) {
              console.error(error)
              return (
                <h5 className='is-size-5 has-text-danger pt100 has-text-centered'>
                  There was an error fetching this contract. {error.message}
                </h5>
              )
            }

            if (loading) {
              return <EventsPageLoader />
            }


            contract = contractData.contract || {}
            abiEvents = contract.abi?.abiEvents || []

            let abiEventRows = []
            if (abiEvents.length === 0) {
              abiEventRows = 
                <tr className='is-size-6 has-text-weight-bold'>
                  <td>
                    No Events exist for this ABI.
                  </td>
                </tr>
            } else {
              abiEventRows = abiEvents.map(abiEvent => (
                <tr key={`abi-event-row-${abiEvent.id}`}>
                  <td>
                    {abiEvent.title}
                  </td>
                  <td>
                    {abiEvent.isPublic} public!
                  </td>
                  <td>
                    {
                      abiEvent.abiEventInputs.length === 0 
                        ? (
                          <span className='is-size-6 has-text-weight-bold'>
                            No Inputs exist for this ABI Event.
                          </span>
                        )
                        : (
                          abiEvent.abiEventInputs.map(abiEventInput => (
                            <span
                              key={`abi-event-input-row-${abiEventInput.id}`}
                              className='is-block'
                              style={{height: 50}}
                            >
                              #{abiEventInput.id}: <strong>{abiEventInput.title}</strong> is <strong>{abiEventInput.type}</strong>

                              {abiEventInput.type === 'uint256' && (
                                <>
                                  &nbsp;and metaDataType is:&nbsp;
                                  <MetaDataTypeSelect
                                    abiEventInputId={parseInt(abiEventInput.id, 10)}
                                    value={abiEventInput.metaType}
                                    handleMetaDataTypeChange={this.handleMetaDataTypeChange}
                                  />
                                </>
                              )}
                            </span>
                          ))
                        )
                    }
                  </td>
                </tr>
              ))
            }

            return (
              <div className='is-positioned-absolutely'>
                <Helmet
                  title='Contracts'
                />

                <ScrollToTop />

                <section className='section section--main-content pb100'>
                  <FormBanner 
                    backgroundColor='#4a8594'
                  >
                    <div className='row'>
                      <div className='col-xs-12 col-sm-6'>
                        <h6 className='is-size-6 has-text-weight-semibold has-text-lighter'>
                          Editing existing Contract {contract.name}
                        </h6>
                      </div>
                      <div className='col-xs-12 col-sm-6 is-left-aligned-mobile has-text-right'>
                        <h6 className='is-size-7 has-text-lighter'>
                          <a
                            href={`https://etherscan.io/address/${contract.address}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='has-text-lighter'
                          >View on Etherscan</a>
                        </h6>
                      </div>
                    </div>
                  </FormBanner>

                  <ColorBlock
                    backgroundColor='#4a8594'
                    brightnessPercent={60}
                    columnSizing='col-xs-12 col-sm-9 col-lg-8'
                  >
                    <PublishButton
                      contract={contract}
                      handleTogglePublish={this.handleTogglePublish}
                    />
                  </ColorBlock>

                  <ColorBlock
                    backgroundColor='#4a8594'
                    brightnessPercent={40}
                    columnSizing='col-xs-12'
                  >
                    <h6 className='is-size-6 has-text-weight-semibold has-text-lighter'>
                      ABI Event Inputs:
                    </h6>
                    <br />

                    <table className='table is-transparent is-fullwidth'>
                      <thead>
                        <tr>
                          <th>
                            Name
                          </th>
                          <th>
                            isPublic?
                          </th>
                          <th>
                            Inputs (ID/Name/Type)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {abiEventRows}
                      </tbody>
                    </table>
                  </ColorBlock>
                </section>

                <FooterContainer />
              </div>
            )
          }
        }
      )
    )
  )
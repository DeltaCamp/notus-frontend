import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { CheckCircle, Plus } from 'react-feather'
import { graphql } from 'react-apollo'
import { formatRoute } from 'react-router-named-routes'

import { IsAuthed } from '~/components/IsAuthed'
import { NetworkName } from '~/components/NetworkName'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { contractsQuery } from '~/queries/contractsQuery'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { CONTRACTS_PAGE_SIZE } from '~/constants'
import * as routes from '~/../config/routes'

export const ContractsPage =
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      graphql(contractsQuery, {
        name: 'contractsData',
        skip: (props) => !props.currentUserData.currentUser,
        options: (props) => ({
          fetchPolicy: 'cache-and-network',
          variables: {
            contractsQuery: {
              take: CONTRACTS_PAGE_SIZE,
              skip: 0
            }
          }
        })
      })(
        class _ContractsPage extends Component {
          fetchMore = () => {
            const { contractsData } = this.props
            const { fetchMore, contracts } = contractsData || {}
            const { skip, take } = contracts || {}

            if (fetchMore) {
              fetchMore({
                variables: {
                  contractsQuery: {
                    take,
                    skip: (skip + take)
                  }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev
                  return Object.assign({}, prev, {
                    contracts: {
                      ...fetchMoreResult.contracts,
                      contracts: [
                        ...prev.contracts.contracts,
                        ...fetchMoreResult.contracts.contracts
                      ]
                    }
                  })
                }
              })
            }
          }

          redirectToContractPage = (contractId) => {
            const newAdminContractRoute = formatRoute(
              routes.CONTRACT, {
                contractId
              }
            )
            this.props.history.push(newAdminContractRoute)
          }

          abiInputsCount = () => {
            return 
          }

          isOwner = (contract) => {
            const { currentUser } = this.props.currentUserData
            return (parseInt(currentUser?.id, 10) === parseInt(contract?.ownerId))
          }

          render () {
            let loadMore,
              content,
              contractRows

            const { contractsData } = this.props
            const { loading, error, contracts } = contractsData || {}
            const { skip, take, totalCount } = contracts || {}

            let contractContracts = contracts ? contracts.contracts : []

            if (loading) {
              content = <EventsPageLoader />
            }

            if (error) {
              console.error(error)
              content = <h5 className='is-size-5 has-text-danger'>
                There was an error fetching contracts
              </h5>
            }

            if (skip + take < totalCount) {
              loadMore =
                <button
                  className='button is-small is-link is-outlined mt30'
                  onClick={this.fetchMore}
                >
                  Load more
                </button>
            }

            if (!content) {
              content = (
                contractContracts.length === 0
                  ? (
                    contractRows = <tr className='is-size-6 has-text-weight-bold'>
                      <td className='has-text-centered' colSpan='3'>
                        <br />
                        No contracts exist.
                        <br />
                        <Link
                        to={routes.NEW_CONTRACT}
                        >
                          Upload ABI and Create your first contract.
                        </Link>
                        <br />
                        <br />
                      </td>
                    </tr>
                  ) : (
                    contractRows = contractContracts.map(contract => {
                      return (
                        <tr key={`contract-id-${contract.id}`}>
                          <td>
                            <Link to={formatRoute(routes.CONTRACT, { contractId: contract.id })}>
                              <strong>{contract.name}</strong>
                            </Link>
                          </td>
                          <td className='has-text-centered'>
                            <Link to={formatRoute(routes.CONTRACT, { contractId: contract.id })}>
                              <strong>{this.isOwner(contract) ? <CheckCircle className='is-xsmall' /> : contract?.owner?.name}</strong>
                            </Link>
                          </td>
                          <td className='has-text-centered'>
                            <Link to={formatRoute(routes.CONTRACT, { contractId: contract.id })}>
                              <strong>{contract.isPublic ? <CheckCircle className='is-xsmall' /> : null}</strong>
                            </Link>
                          </td>
                          <td className='has-text-centered'>
                            <Link to={formatRoute(routes.CONTRACT, { contractId: contract.id })}>
                              <strong><NetworkName
                                networkId={contract.networkId}
                              /></strong>
                            </Link>
                          </td>
                          <td className='has-text-centered'>
                            <Link to={formatRoute(routes.CONTRACT, { contractId: contract.id })}>
                              <div
                                data-tip={contract.address}
                                data-for={`contracts-table-contract-address-${contract.id}`}
                              >
                                <ReactTooltip
                                  place='top'
                                  type='dark'
                                  effect='solid'
                                  id={`contracts-table-contract-address-${contract.id}`}
                                />
                                <small
                                  className='is-size-7'
                                >{contract.address.substr(0, 10)} ...</small>
                              </div>
                            </Link>
                          </td>
                          <td className='has-text-right'>
                            <strong>{contract.abi?.abiEvents?.abiEventInputs?.length}</strong>
                          </td>
                        </tr>
                      )

                    }
                    )
                  )
              )
            } 

            return (
              <div className='is-positioned-absolutely'>
                <Helmet
                  title='Contracts'
                />

                <ScrollToTop />

                <section className='section section--main-content'>
                  <div className='container pb100'>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                          Contracts
                        </h4>
                      </div>
                    </div>

                    <div className='mt20 has-text-centered'>
                      <Link
                        className='button is-small is-info is-outlined has-fat-icons mt20'
                        to={routes.NEW_CONTRACT}
                      >
                        <Plus /> &nbsp;Create contract
                      </Link>
                    </div>

                    <br />
                    <br />

                    <div className='row'>
                      <div className='col-xs-12 has-text-centered'>

                        <table className='table is-striped is-hoverable is-fullwidth'>
                          <thead>
                            <tr>
                              <th>
                                Name
                              </th>
                              <th className='has-text-centered'>
                                Owner
                              </th>
                              <th className='has-text-centered'>
                                Public
                              </th>
                              <th className='has-text-centered'>
                                Network
                              </th>
                              <th className='has-text-centered'>
                                Address
                              </th>
                              <th className='has-text-right'>
                                ABI Inputs
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contractRows}
                          </tbody>
                        </table>

                        {loadMore}
                      </div>
                    </div>
                  </div>
                </section>

                

                <FooterContainer />
              </div>
            )
          }
        }
      )
    )
  )
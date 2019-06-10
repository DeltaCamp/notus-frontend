import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { CheckCircle, Plus } from 'react-feather'
import { graphql } from 'react-apollo'
import { formatRoute } from 'react-router-named-routes'

import { NetworkName } from '~/components/NetworkName'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { contractsQuery } from '~/queries/contractsQuery'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { KEYS } from '~/constants'
import { ADMIN_TABLE_PAGE_SIZE } from '~/constants'
import * as routes from '~/../config/routes'

export const ContractsPage =
graphql(currentUserQuery, { name: 'currentUserQuery' })(
  graphql(contractsQuery, {
    name: 'contractsData',
    skip: (props) => !props.currentUserQuery.currentUser,
    options: (props) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        contractsQuery: {
          take: ADMIN_TABLE_PAGE_SIZE,
          skip: 0
        }
      }
    })
  })(
    class _ContractsPage extends Component {
      state = {
        showingAddContractModal: false
      }

      handleShowAddContractModal = (e) => {
        this.setState({
          showingAddContractModal: true
        })

        document.addEventListener('keyup', this.handleKeyUp, false)
      }

      handleHideAddContractModal = () => {
        this.setState({
          showingAddContractModal: false
        })

        document.removeEventListener('keyup', this.handleKeyUp, false)
      }

      handleKeyUp = (e) => {
        if (e.keyCode === KEYS.escape) {
          this.handleHideAddContractModal()
        }
      }

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
                contractRows = contractContracts.map(contract => (
                  <tr key={`contract-id-${contract.id}`}>
                    <td>
                      <Link to={formatRoute(routes.CONTRACT, { contractId: contract.id })}>
                        <strong>{contract.name}</strong>
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
                        <small className='is-size-7'>{contract.address}</small>
                      </Link>
                    </td>
                    <td className='has-text-right'>
                      <strong>{contract.abi ?.abiEvents ?.abiEventInputs ?.length}</strong>
                      <strong>{contract.abi?.abiEvents?.abiEventInputs?.length}</strong>
                    </td>
                  </tr>
                ))
              )
          )
        } 

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='My Contracts'
            />

            <ScrollToTop />

            <section className='section section--main-content'>
              <div className='container pb100'>
                <div className='row'>
                  <div className='col-xs-12'>
                    <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                      My Contracts
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
                            Public?
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
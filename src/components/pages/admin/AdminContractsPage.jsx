import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Plus } from 'react-feather'
import { graphql } from 'react-apollo'
import { IsAdmin } from '~/components/IsAdmin'
import { Modal } from '~/components/Modal'
import { ScrollToTop } from '~/components/ScrollToTop'
import { NewAdminContractForm } from '~/components/admin/forms/NewAdminContractForm'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { contractsQuery } from '~/queries/contractsQuery'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { KEYS } from '~/constants'
import { ADMIN_TABLE_PAGE_SIZE } from '~/constants'

export const AdminContractsPage =
  IsAdmin(
    graphql(contractsQuery, {
      name: 'contractsData',
      skip: (props) => !props.currentUserData.currentUser,
      options: (props) => ({
        fetchPolicy: 'cache-and-network',
        variables: {
          eventsQuery: {
            take: ADMIN_TABLE_PAGE_SIZE,
            skip: 0,
            userId: props.currentUserData.currentUser.id
          }
        }
      })
    })(
      graphql(currentUserQuery, { name: 'currentUserData' })(
        class _AdminContractsPage extends Component {
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
                  Load More
                </button>
            }

            if (!content) {
              content = (
                contractContracts.length === 0
                  ? (
                    <h2 className='is-size-2 mt75 has-text-weight-bold'>
                      No contracts exist.
                    </h2>
                  ) : (
                    contractRows = contractContracts.map(contract => (
                      <tr key={`contract-id-${contract.id}`}>
                        <td>
                          <strong>{contract.id}</strong>
                        </td>
                        <td>
                          <strong>{contract.name}</strong>
                        </td>
                        <td>
                          <a
                            href={`https://etherscan.io/address/${contract.address}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <small className='is-size-7'>{contract.address}</small>
                          </a>
                        </td>
                      </tr>
                    ))
                  )
              )
            } 

            console.log(this.props.contractsData)
            return (
              <div className='is-positioned-absolutely'>
                <Helmet
                  title='Admin - Contracts'
                />

                <ScrollToTop />

                <Modal
                  isOpen={this.state.showingAddContractModal}
                  handleClose={this.handleHideAddContractModal}
                  onKeyUp={this.handleKeyUp}
                  isLarge
                >
                  {
                    this.state.showingAddContractModal &&
                    <NewAdminContractForm
                      onClose={this.handleHideAddContractModal}
                      onCreate={() => {}}
                    />
                  }
                </Modal>


                <section className='section section--main-content'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                          Editing Contracts
                        </h4>
                      </div>
                    </div>

                    <div className='mt20 has-text-right'>
                      <button
                        className='button is-small is-info is-outlined has-fat-icons mt20'
                        onClick={this.handleShowAddContractModal}
                      >
                        <Plus /> &nbsp;Create Contract
                      </button>
                    </div>

                    <br />
                    <br />

                    <div className='row'>
                      <div className='col-xs-12 has-text-centered'>

                        <table className='table is-striped is-hoverable is-fullwidth'>
                          <thead>
                            <tr>
                              <th>
                                ID
                              </th>
                              <th>
                                Name
                              </th>
                              <th>
                                Address (Mainnet)
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

              </div>
            )
          }
        }
      )
    )
  )
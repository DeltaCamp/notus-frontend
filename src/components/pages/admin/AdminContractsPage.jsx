import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Plus } from 'react-feather'
import { graphql } from 'react-apollo'
import { IsAdmin } from '~/components/IsAdmin'
import { Modal } from '~/components/Modal'
import { ScrollToTop } from '~/components/ScrollToTop'
import { NewAdminContractForm } from '~/components/admin/forms/NewAdminContractForm'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { KEYS } from '~/constants'

export const AdminContractsPage =
  IsAdmin(
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

        render () {
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
                    onCancel={this.handleHideAddContractModal}
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
                              Tio
                            </th>
                            <th>
                              Tia
                            </th>
                            <th>
                              Teh
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Sent email:</strong>
                            </td>
                            <td>
                              Jan 12<sup>th</sup>, 1994
                            </td>
                            <td>
                              2:03pm
                            </td>
                          </tr>
                        </tbody>
                      </table>


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
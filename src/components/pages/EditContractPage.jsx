import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { formatRoute } from 'react-router-named-routes'

import { IsAuthed } from '~/components/IsAuthed'
import { ScrollToTop } from '~/components/ScrollToTop'
import { ContractForm } from '~/components/forms/ContractForm'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { FormBanner } from '~/components/forms/FormBanner'
import { contractQuery } from '~/queries/contractQuery'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

export const EditContractPage =
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserQuery' })(
      graphql(contractQuery, {
        name: 'contractData',
        skip: (props) => !props.match.params.contractId,
        options: (props) => ({
          fetchPolicy: 'cache-and-network',
          variables: { id: parseInt(props.match.params.contractId, 10) }
        })
      })(
        class _EditContractPage extends Component {
          redirectToContractPage = (contractId) => {
            const newAdminContractRoute = formatRoute(
              routes.CONTRACT, {
                contractId
              }
            )
            this.props.history.push(newAdminContractRoute)
          }

          render () {
            let content

            const { contractData } = this.props
            const { loading, error, contract } = contractData || {}

            if (loading) {
              content = <EventsPageLoader />
            }

            if (error) {
              console.error(error)
              content = <h5 className='is-size-5 has-text-danger'>
                There was an error fetching this contract
              </h5>
            }

            const title = contract ? 
              `Editing Contract ${contract.name}` :
              `Creating a new Contract`

            if (!content) {
              content = <ContractForm
                redirectToContractPage={this.redirectToContractPage}
              />
            }

            return (
              <div className='is-positioned-absolutely'>
                <Helmet
                  title={title}
                />

                <ScrollToTop />
                
                <section className='section section--main-content'>
                  <FormBanner
                    backgroundColor={null}
                    backgroundClass='is-dark-colored'
                  >
                    <div className='row'>
                      <div className='col-xs-12'>
                        <h6 className='is-size-6 has-text-weight-semibold has-text-lighter'>
                          Creating a new Contract
                        </h6>
                      </div>
                    </div>
                  </FormBanner>

                  {content}
                </section>
              </div>
            )
          }
        }
      )
    )
  )

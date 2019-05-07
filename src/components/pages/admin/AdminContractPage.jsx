import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { IsAdmin } from '~/components/IsAdmin'
import { ScrollToTop } from '~/components/ScrollToTop'
import { MetaDataTypeSelect } from '~/components/admin/forms/MetaDataTypeSelect'
import { EventsPageLoader } from '~/components/loading/EventsPageLoader'
import { contractQuery } from '~/queries/contractQuery'

export const AdminContractPage =
  IsAdmin(
    graphql(contractQuery, {
      name: 'contractData',
      skip: (props) => !props.match.params.contractId,
      options: (props) => ({
        fetchPolicy: 'network',
        variables: { id: parseInt(props.match.params.contractId, 10) }
      })
    })(
      class _AdminContractPage extends Component {
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
                  {abiEvent.id}
                </td>
                <td>
                  {abiEvent.name}
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
                          >
                            <p className='heading'>
                              #{abiEventInput.id}: <strong>{abiEventInput.name}</strong> is <strong>{abiEventInput.type}</strong>
                            </p>

                            {abiEventInput.type === 'uint256' && (
                              <div
                                className='event-box__variable has-react-select'
                              >
                                <MetaDataTypeSelect
                                  abiEventInput={abiEventInput}
                                />
                              </div>
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
                title='Admin - Contracts'
              />

              <ScrollToTop />

              <section className='section section--main-content'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                        Editing Contract #{contract.id}: "{contract.name}"
                      </h4>
                    </div>
                  </div>

                  <br />
                  <br />

                  <div className='row'>
                    <div className='col-xs-12 has-text-centered'>

                      <table className='table is-striped is-hoverable is-fullwidth'>
                        <thead>
                          <tr>
                            <th>
                              ABI Event ID
                            </th>
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
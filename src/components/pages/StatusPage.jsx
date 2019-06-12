import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'

import { NetworkStatus } from '~/components/NetworkStatus'
import { networksQuery } from '~/queries/networksQuery'
import { jobSummaryQuery } from '~/queries/jobSummaryQuery'
import { ScrollToTop } from '~/components/ScrollToTop'

export const StatusPage = graphql(networksQuery, { name: 'networksQuery' })(
  graphql(jobSummaryQuery, { name: 'jobSummaryQuery' })(
    class _StatusPage extends PureComponent {
      render () {

        const { networks } = this.props.networksQuery
        const { jobSummary } = this.props.jobSummaryQuery

        let networkStatuses

        if (networks) {
          networkStatuses = networks.map(network => {
            return <NetworkStatus network={network} key={network.id} />
          })
        }

        let createdCount = 0
        let activeCount = 0
        let completedCount = 0
        let failedCount = 0

        if (jobSummary) {
          createdCount = jobSummary.createdCount
          activeCount = jobSummary.activeCount
          completedCount = jobSummary.completedCount
          failedCount = jobSummary.failedCount
        }

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='Admin'
            />

            <ScrollToTop />

            <section className='section section--main-content'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12'>
                    <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                      Status
                    </h4>
                  </div>
                </div>

                <br />
                <br />

                <div>
                  <h4 className='is-size-4 has-text-weight-bold mt30'>
                    General
                  </h4>

                  <div className='row'>
                    <div className='col-xs-3 has-text-grey'>
                      <h5>Created Jobs</h5>
                      <h1>{createdCount}</h1>
                    </div>
                    <div className='col-xs-3 has-text-info'>
                      <h5>Active Jobs</h5>
                      <h1>{activeCount}</h1>
                    </div>
                    <div className='col-xs-3 has-text-success'>
                      <h5>Completed Jobs</h5>
                      <h1>{completedCount}</h1>
                    </div>
                    <div className='col-xs-3 has-text-danger'>
                      <h5>Failed Jobs</h5>
                      <h1>{failedCount}</h1>
                    </div>
                  </div>

                </div>

                <div>
                  <h4 className='is-size-4 has-text-weight-bold mt30'>
                    Networks
                  </h4>

                  <div className='row'>
                    <div className='col-xs-4 col-sm-3'>
                      <h5>Chain Id (name)</h5>
                    </div>
                    <div className='col-xs-4 col-sm-5'>
                      <h5>Last Completed Block Number</h5>
                    </div>
                    <div className='col-xs-4 col-sm-4'>
                      <h5>Time To Complete</h5>
                    </div>
                  </div>

                  {networkStatuses}

                </div>

              </div>
            </section>
          </div>
        )
      }
    }
  )
)
import React from 'react'
import { graphql } from 'react-apollo'
import { formatDistanceStrict } from 'date-fns'

import { blockJobsQuery } from '~/queries/blockJobsQuery'

export const NetworkStatus = graphql(blockJobsQuery, {
  name: 'blockJobsQuery',
  options: (props) => {
    return {
      variables: {
        blockJobsQuery: {
          chainId: parseInt(props.network.id, 10),
          state: "completed"
        }
      }
    }
  }
})(
  function NetworkStatus({ network, blockJobsQuery }) {

    const { blockJobs } = blockJobsQuery
    const jobs = (blockJobs || {}).jobs || []
    let job
    if (jobs.length) {
      job = jobs[0]
    }

    let blockNumber
    let processingDelay = '?'

    if (job) {
      blockNumber = job.data.blockNumber

      if (job.completedon - job.createdon < 1000) {
        processingDelay = "< 1 second"
      } else {
        processingDelay = formatDistanceStrict(new Date(job.completedon), new Date(job.createdon))
      }
    }

    return (
      <div className='row'>
        <div className='col-xs-4 col-sm-3'>
          {network.id} ({network.name})
        </div>
        <div className='col-xs-4 col-sm-5'>
          {blockNumber}
        </div>
        <div className='col-xs-4 col-sm-4'>
          {processingDelay}
        </div>
      </div>
    )
  }
)
import gql from 'graphql-tag'

export const blockJobsQuery = gql`
  query blockJobsQuery($blockJobsQuery: BlockJobsQuery!) {
    blockJobs(blockJobsQuery: $blockJobsQuery) {
      jobs {
        id
        state
        createdon
        completedon
        expirein
        data
      }
    }
  }
`
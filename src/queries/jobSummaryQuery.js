import gql from 'graphql-tag'

export const jobSummaryQuery = gql`
  query jobSummaryQuery {
    jobSummary {
      createdCount
      activeCount
      completedCount
      failedCount
    }
  }
`
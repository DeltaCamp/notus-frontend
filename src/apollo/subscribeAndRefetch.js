import gql from 'graphql-tag'
import { notusQueries } from '~/queries/notusQueries'
import { web3Queries } from '~/queries/web3Queries'
// import { abiMapping } from '~/apollo/abiMapping'

export function subscribeAndRefetch (apolloClient) {
  // If the user signs in to MetaMask or logs out, we should ... (refresh the page?)
  let firstLoadAccount = true
  apolloClient.watchQuery({
    query: web3Queries.accountQuery,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe((data) => {
    if (firstLoadAccount) {
      firstLoadAccount = false
    } else {
      window.location.reload()
    }
  })

  // This subscription listens for changes to a web3 browser (ie metamask's) network
  let firstLoadNetwork = true
  apolloClient.watchQuery({
    query: web3Queries.networkIdQuery,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe((data) => {
    if (firstLoadNetwork) {
      firstLoadNetwork = false
    } else {
      window.location.reload()
    }
  })

  // // The following subscription listens for new vouches
  // apolloClient.subscribe({
  //   query: gql`
  //     subscription {
  //       Notus @contract {
  //         Registered @events
  //       }
  //     }
  //   `
  // }).subscribe(function ({ data: { Notus: { Registered: { result, error } } } }) {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     if (!result.args) {
  //       console.warn('no args')
  //       return
  //     }

  //     console.log('result.args', result.args)

  //     apolloClient.query({
  //       query: notusQueries.notusQuery,
  //       variables: { ipfsHash: result.args[0].toString() },
  //       fetchPolicy: 'network-only'
  //     })
  //   }
  // })

  // The following subscription listens for new webhooks
  apolloClient.subscribe({
    query: gql`
      subscription {
        Notus @contract {
          Registered @events
        }
      }`
  }).subscribe(function ({ data: { Notus: { Registered: { result, error } } } }) {
    if (error) {
      console.error(error)
    } else {
      apolloClient.query({
        query: notusQueries.eventsQuery,
        fetchPolicy: 'network-only'
      })
    }
  })
}

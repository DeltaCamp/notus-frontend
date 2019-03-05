import gql from 'graphql-tag'

export const notusFragments = {
  // metadataFragment: gql`
  //   fragment md on Metadata {
  //     id
  //     __typename
  //     name
  //     version
  //     description
  //   }
  // `,
  webhookFragment: gql`
    fragment webhookFragment on Webhook {
      id
      allEvents @pastEvents
    }
  `
}

export const notusQueries = {
  ownerQuery: gql`
    query ownerQuery($address: String!) {
      Notus @contract(type: "OwnerEvents", id: $address) {
        allEvents @pastEvents
      }
    }
  `,
  notusEventsQuery: gql`
    query notusEventsQuery {
      Notus @contract {
        allEvents @pastEvents
      }
    }
  `,
  notusQuery: gql`
    query notusQuery($ipfsHash: String!) {
      Notus @contract(type: "Webhook", id: $ipfsHash) {
        ...webhookFragment
      }
    }
    ${notusFragments.webhookFragment}
  `,
  eventsQuery: gql`
    query eventsQuery {
      Notus @contract(type: "GlobalInfo", id: "1") {
        id
        __typename
        Registered @pastEvents
        Unregistered @pastEvents
      }
    }
  `,
  // packageQuery: gql`
  //   query packageQuery($uri: String!, $id: String!) {
  //     metadata(uri: $uri) @client {
  //       ...md
  //     }
  //     Notus @contract(type: "Package", id: $id) {
  //       ...packageFragment
  //     }
  //   }
  //   ${notusFragments.metadataFragment}
  //   ${notusFragments.packageFragment}
  // `
}

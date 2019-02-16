import gql from 'graphql-tag'

export const velcroFragments = {
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
      __typename
      entry: getEntry(id: $ipfsHash)
      allEvents @pastEvents(extraTopics: { types: ["uint256"], values: [$ipfsHash] })
    }
  `
}

export const velcroQueries = {
  ownerQuery: gql`
    query ownerVelcroQuery($address: String!) {
      Velcro @contract(type: "OwnerEvents", id: $address) {
        allEvents @pastEvents(extraTopics: { types: ["uint256", "address"], values: [null, $address] })
      }
    }
  `,
  velcroEventsQuery: gql`
    query velcroEventsQuery {
      Velcro @contract {
        allEvents @pastEvents
      }
    }
  `,
  velcroQuery: gql`
    query velcroQuery($ipfsHash: String!) {
      Velcro @contract(type: "Webhook", id: $ipfsHash) {
        ...webhookFragment
      }
    }
    ${velcroFragments.webhookFragment}
  `,
  eventsQuery: gql`
    query eventsQuery {
      Velcro @contract(type: "GlobalInfo", id: "1") {
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
  //     Velcro @contract(type: "Package", id: $id) {
  //       ...packageFragment
  //     }
  //   }
  //   ${velcroFragments.metadataFragment}
  //   ${velcroFragments.packageFragment}
  // `
}

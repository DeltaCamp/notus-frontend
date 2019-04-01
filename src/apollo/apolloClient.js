import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { merge } from 'lodash'
import { persistCache } from 'apollo-cache-persist';

import { axiosInstance } from '~/../config/axiosInstance'
import { metadataResolvers } from './client-state/metadataResolvers'
import { notusResolvers } from './client-state/notusResolvers'
import { storage } from './storage'
import { jwtTokenQuery } from '~/queries/jwtTokenQuery'

const resolvers = merge(
  {},
  metadataResolvers,
  notusResolvers
)

const cache = new InMemoryCache()
//
// if (storage) {
//   persistCache({
//     cache,
//     storage
//   }).then(() => {
//     try {
//       const data = cache.readQuery({ query: jwtTokenQuery })
//       const jwtToken = data.jwtToken
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
//     } catch (error) {
//       console.warn(error)
//       // rollbar.error()
//     }
//   })
// }

cache.writeData({
  data: {
    currentUser: null,
    jwtToken: null
  }
})

export const apolloClient = new ApolloClient({
  resolvers: { ...resolvers },
  uri: null,
  cache
})

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { merge } from 'lodash'
import { persistCache } from 'apollo-cache-persist';

import { axiosInstance } from '~/../config/axiosInstance'
import { metadataResolvers } from './client-state/metadataResolvers'
import { notusResolvers } from './client-state/notusResolvers'
import { storage } from './storage'
import { accessKeyQuery } from '~/queries/accessKeyQuery'

const resolvers = merge(
  {},
  metadataResolvers,
  notusResolvers
)

const cache = new InMemoryCache()

if (storage) {
  persistCache({
    cache,
    storage
  }).then(() => {
    const data = cache.readQuery({ query: accessKeyQuery })
    const accessKey = data.accessKey
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessKey}`
  })
}

cache.writeData({
  data: {
    currentUser: null
  }
})

export const apolloClient = new ApolloClient({
  resolvers: { ...resolvers },
  uri: null,
  cache
})

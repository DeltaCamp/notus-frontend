import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { merge } from 'lodash'
import { metadataResolvers } from './client-state/metadataResolvers'
import { notusResolvers } from './client-state/notusResolvers'

const resolvers = merge(
  {},
  metadataResolvers,
  notusResolvers
)

const cache = new InMemoryCache()

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

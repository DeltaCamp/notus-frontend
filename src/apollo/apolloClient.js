import ApolloClient from 'apollo-boost'
import { merge } from 'lodash'
import { metadataResolvers } from './client-state/metadataResolvers'
import { notusResolvers } from './client-state/notusResolvers'

const resolvers = merge(
  {},
  metadataResolvers,
  notusResolvers
)

export const apolloClient = new ApolloClient({
  resolvers: { ...resolvers },
  uri: null
})

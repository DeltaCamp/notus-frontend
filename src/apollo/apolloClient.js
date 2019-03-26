import ApolloClient from 'apollo-boost'
import { merge } from 'lodash'
import { metadataResolvers } from './client-state/metadataResolvers'

const resolvers = merge(
  {},
  metadataResolvers
)

export const apolloClient = new ApolloClient({
  resolvers: { ...resolvers }
})

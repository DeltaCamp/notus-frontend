import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { merge } from 'lodash'
import { metadataResolvers } from './client-state/metadataResolvers'
import { notusResolvers } from './client-state/notusResolvers'
import { storage } from '~/apollo/storage'
import { axiosGetUserFromApi } from '~/utils/axiosGetUserFromApi'

export const apolloClient = async () => {
  const cache = new InMemoryCache()

  const resolvers = merge(
    {},
    metadataResolvers,
    notusResolvers
  )

  let currentUser = null
  let jwtToken = null

  if (storage()) {
    jwtToken = localStorage.getItem('jwtToken')
  }

  if (jwtToken) {
    try {
      currentUser = await axiosGetUserFromApi(cache, jwtToken)
    } catch (error) {
      console.warn(error)
      localStorage.removeItem('jwtToken')
      jwtToken = null
    }    
  }

  cache.writeData({
    data: {
      currentUser,
      jwtToken
    }
  })

  return new ApolloClient({
    resolvers: { ...resolvers },
    uri: `${process.env.REACT_APP_NOTUS_API_URI}/graphql`,
    cache
  })
}

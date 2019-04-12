import { onError } from "apollo-link-error";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
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

  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_NOTUS_API_URI}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwtToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });


  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    resolvers: { ...resolvers },
    link: errorLink.concat(authLink.concat(httpLink)),
    uri: `${process.env.REACT_APP_NOTUS_API_URI}/graphql`,
    cache
  })
}

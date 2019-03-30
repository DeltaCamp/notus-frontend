import { axiosInstance } from '~/../config/axiosInstance'
import { DappUserFragment } from '~/fragments/DappUserFragment'
import { currentUserQuery } from '~/queries/currentUserQuery'

export const notusResolvers = {
  Query: {
    dappUser: async function (object, args, options, info) {
      const { dappUserId } = args
      if (!dappUserId) { throw new Error('You must pass the dappUserId') }
      return axiosInstance
        .get(`${process.env.REACT_APP_NOTUS_API_URI}/dapp-users/${dappUserId}`)
        .then(json => {
          const id = `DappUser:${json.id}`
          return options.writeFragment({id, fragment: DappUserFragment, data: json })
        })
    }
  },

  Mutation: {
    confirmUser:  async function (object, args, { cache }, info) {
      console.log('starting confirmUser: ')
      const { requestKey } = args
      if (!requestKey) {
        throw new Error('requestKey is not defined')
      }
      return axiosInstance
        .post(`${process.env.REACT_APP_NOTUS_API_URI}/users/confirm`, { requestKey })
        .then(confirmResponse => {
          const { data } = confirmResponse
          const accessKey = data || ''
          cache.writeData({ data: { accessKey } })
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessKey}`
          return axiosInstance
            .get(`${process.env.REACT_APP_NOTUS_API_URI}/users`)
            .then(userResponse => {
              const { data } = userResponse
              console.log('have: ', data)
              data.__typename = 'User'
              cache.writeQuery({
                query: currentUserQuery,
                data: {
                  currentUser: data
                }
              })
            })
        })
    },

    confirmDappUser: async function (object, args, { cache }, info) {
      console.log('starting confirmDappUser: ')
      const { requestKey } = args
      if (!requestKey) {
        throw new Error('requestKey is not defined')
      }
      return axiosInstance
        .post(`${process.env.REACT_APP_NOTUS_API_URI}/dapp-users/confirm`, { requestKey })
        .then(json => {
          const { data } = json
          const { accessKey } = data || {}

          cache.writeData({ data: { accessKey } })

          return json
        })
    }
  }
}

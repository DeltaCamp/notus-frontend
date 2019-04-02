import { axiosInstance } from '~/../config/axiosInstance'
import { storage } from '~/apollo/storage'
import { DappUserFragment } from '~/fragments/DappUserFragment'
import { axiosGetUserFromApi } from '~/utils/axiosGetUserFromApi'

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
    signOut: async function (object, args, { cache }, info) {
      cache.writeData({
        data: {
          jwtToken: null,
          currentUser: null
        }
      })

      if (storage()) {
        localStorage.removeItem('jwtToken')
      }
    },

    signIn: async function (object, args, { cache }, info) {
      const { email, password } = args
      if (!email) {
        throw new Error('email must be provided')
      }
      if (!password) {
        throw new Error('password must be provided')
      }

      const response = await axiosInstance.get(`${process.env.REACT_APP_NOTUS_API_URI}/sign-in`, {
        params: {
          email, password
        }
      })

      const { data } = response
      const jwtToken = data || ''
      cache.writeData({ data: { jwtToken } })

      if (storage()) {
        localStorage.setItem('jwtToken', jwtToken)
      }

      try {
        return await axiosGetUserFromApi(cache, jwtToken)
      } catch (error) {
        console.error(error)
      }
    },

    confirmUser: async function (object, args, { cache }, info) {
      const { oneTimeKey, password } = args
      if (!oneTimeKey) {
        throw new Error('oneTimeKey is not defined')
      }
      if (!password) {
        throw new Error('You must pass a password')
      }


      const confirmResponse = await axiosInstance
        .post(`${process.env.REACT_APP_NOTUS_API_URI}/users/confirm`, {
          password
        }, {
          headers: {
            'Authorization': `Bearer ${oneTimeKey}`
          }
        })

        const { data } = confirmResponse
        const jwtToken = data || ''
        cache.writeData({ data: { jwtToken } })

        if (storage()) {
          localStorage.setItem('jwtToken', jwtToken);
        }

        try {
          return await axiosGetUserFromApi(cache, jwtToken)
        } catch(error) {
          console.error(error)
        }
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
          return json
        })
    }
  }
}

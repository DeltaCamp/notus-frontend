import { signIn } from '~/apollo/signIn'
import { AppUserFragment } from '~/fragments/AppUserFragment'
import { notusLocalStorage } from '~/utils/notusLocalStorage'
import { JWT_TOKEN_COOKIE_NAME } from '~/constants'
import { axiosInstance } from '~/../config/axiosInstance'

const debug = require('debug')('notus:notusResolvers')

export const notusResolvers = {
  Query: {
    appUser: async function (object, args, options, info) {
      const { appUserId } = args
      if (!appUserId) { throw new Error('You must enter the appUserId') }
      return axiosInstance
        .get(`${process.env.REACT_APP_NOTUS_API_URI}/app-users/${appUserId}`)
        .then(json => {
          const id = `AppUser:${json.id}`
          return options.writeFragment({ id, fragment: AppUserFragment, data: json })
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

      notusLocalStorage.write(JWT_TOKEN_COOKIE_NAME, null)
    },

    signUp: async function (object, args, { cache }, info) {
      const { email } = args

      if (!email) {
        throw new Error('Email must be provided')
      }

      const response = await axiosInstance.post(
        `${process.env.REACT_APP_NOTUS_API_URI}/users`, { email }
      )

      const { data } = response
      debug('response', response.data)

      if (data.previouslySignedUp) {
        return {
          previouslySignedUp: true
        }
      } else if (data.jwtToken) {
        const { jwtToken } = data
        debug('jwtToken', jwtToken)
        await signIn(cache, jwtToken)

        return {
          signedIn: true
        }
      } else {
        // shouldn't end up here
        debug('unhandled response', response.data)
      }
    },

    signIn: async function (object, args, { cache }, info) {
      const { email, password } = args

      if (!email) {
        throw new Error('Email must be provided')
      }
      if (!password) {
        throw new Error('Password must be provided')
      }

      const response = await axiosInstance.get(`${process.env.REACT_APP_NOTUS_API_URI}/sign-in`, {
        params: {
          email, password
        }
      })

      const { data } = response
      const jwtToken = data
      await signIn(cache, jwtToken)
    },

    confirmUser: async function (object, args, { cache }, info) {
      const { oneTimeKey, password } = args
      if (!oneTimeKey) {
        throw new Error('oneTimeKey is not defined')
      }
      if (!password) {
        throw new Error('You must enter a password')
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

      await signIn(cache, jwtToken)
    },

    confirmAppUser: async function (object, args, { cache }, info) {
      console.log('starting confirmAppUser: ')
      const { requestKey } = args
      if (!requestKey) {
        throw new Error('requestKey is not defined')
      }
      return axiosInstance
        .post(`${process.env.REACT_APP_NOTUS_API_URI}/app-users/confirm`, { requestKey })
        .then(json => {
          return json
        })
    }
  }
}

import { storage } from '~/apollo/storage'
import { axiosGetUserFromApi } from '~/utils/axiosGetUserFromApi'

const debug = require('debug')('notus:apollo:signIn')

export async function signIn (apolloCache, jwtToken) {
  if (storage()) {
    window.localStorage.setItem('jwtToken', jwtToken)
  }

  if (jwtToken) {
    try {
      let currentUser = await axiosGetUserFromApi(jwtToken)
      debug('found current user: ', currentUser, ' for jwtToken: ', jwtToken)
      apolloCache.writeData({
        data: {
          currentUser,
          jwtToken
        }
      })
    } catch (error) {
      if (storage()) {
        window.localStorage.removeItem('jwtToken')
      }
      jwtToken = undefined
    }
  }
}

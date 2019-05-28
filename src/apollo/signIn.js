import { axiosGetUserFromApi } from '~/utils/axiosGetUserFromApi'
import { notusLocalStorage } from '~/utils/notusLocalStorage'
import { JWT_TOKEN_COOKIE_NAME } from '~/constants'

const debug = require('debug')('notus:apollo:signIn')

export async function signIn (apolloCache, jwtToken) {
  notusLocalStorage.write(JWT_TOKEN_COOKIE_NAME, jwtToken)

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
      notusLocalStorage.write(JWT_TOKEN_COOKIE_NAME, null)
    }
  }
}

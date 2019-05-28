import { storage } from '~/apollo/storage'

const debug = require('debug')('notus:apollo:signIn')

export async function signIn (apolloCache, jwtToken) {
  if (storage()) {
    window.localStorage.setItem('jwtToken', jwtToken)
  }
}

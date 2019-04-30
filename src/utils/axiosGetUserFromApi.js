import { axiosInstance } from '~/../config/axiosInstance'

const debug = require('debug')('notus:axios')

export const axiosGetUserFromApi = (jwtToken) => {
  debug('jwtToken: ', jwtToken)
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`

  return axiosInstance
    .get(`${process.env.REACT_APP_NOTUS_API_URI}/users`)
    .then(userResponse => {
      debug('userResponse: ', userResponse)
      const { data } = userResponse
      data.__typename = 'User'
      return data
    })
    .catch(error => {
      debug('error: ', error)
      delete axiosInstance.defaults.headers.common['Authorization']
      throw error
    })
}

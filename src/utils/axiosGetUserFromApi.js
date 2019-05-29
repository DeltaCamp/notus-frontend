import { axiosInstance } from '~/../config/axiosInstance'

const debug = require('debug')('notus:axiosGetUserFromApi')

export const axiosGetUserFromApi = (jwtToken) => {
  debug('jwtToken: ', jwtToken)
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
  debug('axiosInstance.defaults.headers.common', axiosInstance.defaults.headers.common)

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

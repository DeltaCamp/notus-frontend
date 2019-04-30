import { axiosInstance } from '~/../config/axiosInstance'

export const axiosGetUserFromApi = (jwtToken) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
  
  return axiosInstance
    .get(`${process.env.REACT_APP_NOTUS_API_URI}/users`)
    .then(userResponse => {
      const { data } = userResponse
      data.__typename = 'User'
      return data
    })
    .catch(error => {
      delete axiosInstance.defaults.headers.common['Authorization']
      console.warn('error!', error)
    })
}

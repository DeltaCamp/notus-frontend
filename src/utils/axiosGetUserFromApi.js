import { axiosInstance } from '~/../config/axiosInstance'
import { currentUserQuery } from '~/queries/currentUserQuery'

export const axiosGetUserFromApi = (cache, jwtToken) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
  
  return axiosInstance
    .get(`${process.env.REACT_APP_NOTUS_API_URI}/users`)
    .then(userResponse => {
      const { data } = userResponse
      data.__typename = 'User'
      cache.writeQuery({
        query: currentUserQuery,
        data: {
          currentUser: data
        }
      })

      return data
    })
    .catch(error => {
      console.warn('error!', error)
    })
}

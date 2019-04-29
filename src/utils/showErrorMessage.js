import { toast } from 'react-toastify'

export function showErrorMessage (error) {
  return toast.error(error.message.replace('GraphQL error: ', ''))
}

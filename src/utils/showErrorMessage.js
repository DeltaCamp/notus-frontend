import { toast } from 'react-toastify'

export function showErrorMessage (error) {
  console.error(error)
  return toast.error(error.message.replace('GraphQL error: ', ''))
}

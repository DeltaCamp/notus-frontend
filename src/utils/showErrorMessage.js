import { notusToast } from '~/utils/notusToast'

export function showErrorMessage (error) {
  console.error(error)
  return notusToast.error(error.message.replace('GraphQL error: ', ''))
}

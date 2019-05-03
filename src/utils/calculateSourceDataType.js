import { SOURCES } from '~/constants'

export function calculateSourceDataType(source, abiEventInput) {
  let type

  if (source === SOURCES.CONTRACT_EVENT_INPUT) {
    type = abiEventInput.dataType
  } else {
    type = source.dataType
  }

  return type
}

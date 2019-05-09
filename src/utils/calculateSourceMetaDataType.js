import { SOURCES } from '~/constants'

export function calculateSourceMetaDataType(source, abiEventInput) {
  let type

  if (abiEventInput && source.source === SOURCES.CONTRACT_EVENT_INPUT) {
    type = abiEventInput.metaType
  } else {
    type = source.metaDataType
  }

  return type
}

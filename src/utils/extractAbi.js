export function extractAbi(json) {
  let name = null
  let abi = json

  if (json.schemaVersion && json.contractName) {
    // Then it's probably a Truffle artifact
    name = json.contractName
    abi = json.abi
  }

  return {
    name, abi
  }
}
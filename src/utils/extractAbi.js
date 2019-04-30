export function extractAbi(json) {
  let name = null
  let abi = json

  // Prob a Truffle artifact
  if (json.contractName) {
    name = json.contractName
  }

  // Prob a Truffle artifact
  if (json.abi) {
    abi = json.abi
  }
  
  return {
    name,
    abi
  }
}
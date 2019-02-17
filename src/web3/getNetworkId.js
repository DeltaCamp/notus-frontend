import { getNetworkName } from '~/web3/getNetworkName'
import { ethers } from 'ethers'

export async function getNetworkId () {
  const networkName = await getNetworkName()

  const network = ethers.utils.getNetwork(networkName)

  if (network) {
    return network.chainId
  }
  
  return null
}

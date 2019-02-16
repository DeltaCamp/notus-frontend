import { ethers } from 'ethers'

export function Registered (id, owner) {
  return {
    parsedLog: {
      name: 'Registered',
      values: {
        id: ethers.utils.bigNumberify(id),
        owner
      }
    }
  }
}

export function Unregistered(id, owner) {
  return {
    parsedLog: {
      name: 'Unregistered',
      values: {
        id: ethers.utils.bigNumberify(id),
        owner
      }
    }
  }
}

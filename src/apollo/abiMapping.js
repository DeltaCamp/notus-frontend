import { AbiMapping } from 'apollo-link-ethereum'
// TODO: Replace this with the abi from the artifacts in the notus-contract npm package
import NotusAbi from './abi/NotusAbi'
import Notus from '#/Notus.json'

export const abiMapping = new AbiMapping()

window.abiMapping = abiMapping

function addTruffleArtifact (name, abi, truffleJsonArtifact) {
  abiMapping.addAbi(name, abi)
  Object.keys(truffleJsonArtifact.networks).forEach(networkId => {
    abiMapping.addAddress(name, parseInt(networkId), truffleJsonArtifact.networks[networkId].address)
  })
}

addTruffleArtifact('Notus', NotusAbi, Notus)
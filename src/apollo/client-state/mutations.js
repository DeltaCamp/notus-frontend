import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { ethers } from 'ethers'
import { getNetworkId } from '~/web3/getNetworkId'
import { poll } from 'ethers/utils/web'
import { transactionQueries } from '~/queries/transactionQueries'
import { getWriteProvider } from '~/web3/getWriteProvider'

let nextTxId = 1

export const mutations = {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache, getCacheKey }) => {
        try {
          const { contractName, method, args } = variables.txData
          await getMetamaskPermissions()
          const provider = await getWriteProvider()
          const networkId = await getNetworkId()
          const signer = provider.getSigner()
          const address = abiMapping.getAddress(contractName, networkId)
          // console.log('networkId', networkId)
          // console.log('contractName', contractName)
          // console.log('address', address)
          const abi = abiMapping.getAbi(contractName)
          const contract = new ethers.Contract(address, abi, signer)

          const methodFxn = contract[method]

          if (!methodFxn) {
            throw new Error(`Unknown function ${method} for contract ${contractName}`)
          }

          let data = { transactions: [] }
          const query = transactionQueries.allTransactionsQuery

          const txId = nextTxId++

          try {
            data = cache.readQuery({ query })
          } catch (error) {
            console.error(error)
          }

          const newArgs = {
            values: Array.from(args).map(arg => arg.toString()),
            __typename: 'JSON'
          }

          const newTx = {
            __typename: 'Transaction',
            id: txId,
            method,
            contractName,
            completed: false,
            sent: false,
            hash: '',
            error: '',
            blockNumber: null,
            args: newArgs
          }

          if (data.transactions) {
            data.transactions.push(newTx)
          } else {
            data.transactions = [newTx]
          }

          // console.log(data)

          cache.writeQuery({ query, data })

          const id = `Transaction:${txId}`
          const readTx = () => {
            return cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
          }

          // It seems as though ethers.js + metamask are having a hard time estimating gas limit
          // no matter which method below that we try (leave it up to the lib or run the 
          // estimate() method)
          // hard-coding it to a reasonable limit + price works
          //
          // console.log(contract, method, args)
          let gasLimit = ethers.utils.bigNumberify('0')
          // try {
          //   gasLimit = await contract.estimate[method](...args)
          // } catch (error) {
          //   console.error(error)
          //   const transaction = readTx()
          //   const data = { ...transaction, error: error.message }
          //   cache.writeData({ id, data })
          //   return data
          // }

          // Hack to ensure it works!
          // const newGasLimit = gasLimit.add(3000)
          const newGasLimit = gasLimit.add(1000000)

          const transactionData = contract.interface.functions[method].encode(args)
          const unsignedTransaction = {
            data: transactionData,
            to: contract.address,
            gasPrice: ethers.utils.bigNumberify('100000000000'),
            gasLimit: newGasLimit
          }

          signer.sendUncheckedTransaction(unsignedTransaction)
            .then(async function (hash) {
              let transaction = readTx()
              let data = { ...transaction, hash, sent: true }
              cache.writeData({ id, data })
              transaction = readTx()

              const receipt = await poll(() => {
                return provider.getTransactionReceipt(hash).then(receipt => {
                  if (receipt === null) { return undefined }

                  return receipt
                })
              }, { onceBlock: provider }).catch(error => {
                console.error(`Unable to get transaction receipt for tx with hash: ${hash} - `, error)
                throw error
              })

              if (receipt.status === 0) {
                throw new Error(`Ethereum tx had a 0 status. Tx hash: ${hash}`)
              }

              data = { ...transaction, blockNumber: receipt.blockNumber, completed: true }
              cache.writeData({ id, data })
            })
            .catch(error => {
              console.error(`Error occured while sending transaction`, error)

              const transaction = readTx()
              const data = { ...transaction, sent: true, completed: true, error: error.message }
              cache.writeData({ id, data })
            })

          return newTx
        } catch (error) {
          console.error('sendTransaction: ', variables, error)
          throw error
        }
      }
    }
  }
}

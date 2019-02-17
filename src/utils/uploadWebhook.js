const ipfsClient = require('ipfs-http-client')

export const uploadWebhook = async function (contractAddress, webhookUrl) {
  console.log(`Uploading webhook to IPFS...`)

  const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

  const webhook = {
    url: webhookUrl,
    query: {
      queryType: 'EventQuery',
      address: contractAddress,
      topics: []
    }
  }

  const blob = JSON.stringify(webhook)
  const buffer = Buffer.from(blob)
  const [{ path, hash, size }] = await ipfs.add(buffer)

  console.log(`Uploaded file to IPFS with hash ${hash}`)
  console.log(`path ${path}, size ${size}`)

  return hash
}

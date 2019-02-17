const ipfsClient = require('ipfs-http-client')
const chalk = require('chalk')

export const uploadWebhook = async function () {
  console.log(chalk.yellow(`Uploading webhook to IPFS...`))

  const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

  const webhook = {
    url: 'https://enessdesb4vmt.x.pipedream.net',
    query: {
      queryType: 'EventQuery',
      address: '0xc1846137e6ca6d1380e153b68fe5d8966133807b',
      topics: []
    }
  }

  const blob = JSON.stringify(webhook)
  const buffer = Buffer.from(blob)
  const [{ path, hash, size }] = await ipfs.add(buffer)

  console.log(chalk.green(`Uploaded file to IPFS with hash ${hash}`))
  console.log(chalk.green(`path ${path}, size ${size}`))

  return hash
}

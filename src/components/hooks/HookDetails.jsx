import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'
import { EnsName } from '~/components/EnsName'
// import { projectPackageEvents } from '~/projections/projectPackageEvents'
import { velcroQueries } from '~/queries/velcroQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
// import { challengeProjection } from '~/projections/challengeProjection'
const ipfsClient = require('ipfs-http-client')

export class HookDetails extends Component {
  state = {
    json: {},
    downloaded: false
  }

  static propTypes = {
    webhookEvent: PropTypes.object.isRequired
  }

  async componentDidMount() {
    const { ipfsHash } = this.props
    const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

    const [{ path, content }] = await ipfs.get(ipfsHash)
    const json = JSON.parse(content)
    // console.log(json)
    // const validate = validator()
    // if (!validate(json)) {
    //   throw new Error(
    //     validate.errors.map(err => err.message).join(', ')
    //   );
    // }
    json.ipfsHash = ipfsHash

    this.setState({
      downloaded: true,
      json
    })
  }

  render () {
    const { webhookEvent } = this.props
    // const { parsedLog } = registeredWebhook || {}
    // const { values } = parsedLog || {}
    // const githubDetails = ''
    // const githubDetails = gh(values.metadataURI || '')
    // const { owner, repo } = githubDetails
    // const { id } = values || {}
    // const challenges = challengeProjection(vouching.allEvents)
    // const noChallenges = challenges.length === 0
    // const { name } = metadata || {}

    // ipfsHash: "QmdxVnLrTfjHvrAAyAfbqYhHqQkHZpSV5topZdPcJMYc1e"


    // query:
    //   address: "0xe1dcffcf3888bc8e010c73c2f964b26183daa940"

    //   queryType: "EventQuery"
    //   topics: Array[]
    // url: "https://maker.ifttt.com/trigger/ContractEventCame

    return (
      <>
        <div className='row reverse-column-order'>
          <div className='col-xs-12 col-md-12'>
            <p className='is-size-4 '>
              <span className='is-uppercase'>
                Query Type:
              </span>
              <br />
              <strong className='is-size-2 has-font-weight-bold'>{get(this.state.json, 'query.queryType')}</strong>
            </p>

            <br />
            <br />

            {get(this.state.json, 'address') && 
              (
                <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
                  Owned by <EnsName address={this.state.json.address} shorten />
                </h6>    
              )
            }

            <p className='is-size-4'>
              <span className='is-uppercase'>
                Contract Address:
              </span>
              <br />
              <span className='is-monospaced'>
                {get(this.state.json, 'query.address')}
              </span>
            </p>

            <br />
            <br />

            <p className='is-size-4'>
              <span className='is-uppercase'>
                Webhook POST URL:
              </span>
              <br />
              <span className='is-monospaced is-size-6'>
                <a
                  href={get(this.state.json, 'url')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {get(this.state.json, 'url')}
                </a>
              </span>
            </p>
          </div>
        </div>

        <hr />
        <hr />

        <div className='row'>
          <div className='col-xs-12'>
            <h5 className='is-size-5'>
              IPFS Hash:
            </h5>
            <div className='code-wrapper'>
              {this.props.ipfsHash}
            </div>
            <br />
          </div>
        </div>

      </>
    )
  }
}

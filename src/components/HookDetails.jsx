import React, { Component } from 'react'
import { get } from 'lodash'

export class HookDetails extends Component {
  state = {
    json: {},
    downloaded: false
  }

  async componentDidMount () {
  }

  render () {
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
            <h6 className='is-size-6'>
              IPFS Hash:
            </h6>
            <div className='is-size-6'>
              {this.props.ipfsHash}
            </div>
            <br />
          </div>
        </div>

      </>
    )
  }
}

import React, { Component } from 'react'
import { SlantSVG } from '~/components/home/SlantSVG'
import { DiscordLink } from '~/components/DiscordLink'

export class HomeBetaNotice extends Component {
  render () {
    return (
      <div className='container-fluid is-pink pb100 color-block is-positioned-relatively'>
        <div className='container pb50'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered'>
              <h1 className='is-size-1 has-text-weight-bold'>
                Get Involved
              </h1>
              <h5 className='is-size-6 mt30'>
                We want your feedback so that we can make Notus as great as possible.
              </h5>
              <h5 className='is-size-6 mt30'>
                Join the conversation on our <DiscordLink className='has-text-white is-underlined'>Discord</DiscordLink> channel
                <br />
                – or –
                <br />
                send an email to <a href="mailto:support@notus.network" className='has-text-white is-underlined'>support@notus.network</a>
              </h5>
            </div>
          </div>
        </div>

        <SlantSVG
          position='bottom'
          polygonClass='has-fill-purple'
        />
      </div>
    )
  }
}

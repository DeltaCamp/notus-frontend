import React, { Component } from 'react'
import { SlantSVG } from '~/components/home/SlantSVG'
import { DiscordLink } from '~/components/DiscordLink'

export class HomeBetaNotice extends Component {
  render () {
    return (
      <div
        className='container-fluid pb100 color-block is-positioned-relatively'
        style={{ backgroundColor: '#a560e8' }}
      >
        <div className='container pb50'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered'>
              <h4 className='is-size-4 has-text-weight-bold'>
                Get Involved
              </h4>
              <h6 className='is-size-6 mt30'>
                We want your feedback so that we can make Notus as great as possible:
              </h6>
              <p className='mt30'>
                <strong>Join the conversation on our <DiscordLink className='has-text-white is-underlined'>Discord</DiscordLink> channel</strong>
                <br />
                – or –
                <br />
                <strong>Send an email to <a href='mailto:support@notus.events' className='has-text-white is-underlined'>support@notus.events</a></strong>
              </p>
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

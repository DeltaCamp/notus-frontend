import React, { Component } from 'react'
import { SlantSVG } from '~/components/home/SlantSVG'
import { MailChimpSignupForm } from '~/components/MailChimpSignupForm'

export class HomeSignupFooterCTA extends Component {
  state = {}

  render () {
    return (
      <div className='container-fluid color-block is-purple pt50 pb50 is-positioned-relatively'>
        <SlantSVG
          position='top'
          fill='purple'
        />

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered'>
              <h1 className='is-size-1 has-text-weight-bold'>
                Stay up to date
              </h1>
              <h5 className='is-size-5 has-text-weight-bold'>
                Receive emails from us every now and then
              </h5>

              <div className='mt30'>
                <MailChimpSignupForm />
              </div>

            </div>
          </div>
        </div>

        <SlantSVG
          // position='bottom'
          position='footer-bottom'
          fill='footer'
        />
      </div>
    )
  }
}

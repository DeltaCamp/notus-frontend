import React, { Component } from 'react'
import { SlantSVG } from '~/components/home/SlantSVG'

export class HomeBetaNotice extends Component {
  render () {
    return (
      <div className='container-fluid is-pink pb100 color-block is-positioned-relatively'>
        <div className='container pb100'>
          <div className='row pb100'>
            <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered mt50'>
              <h1 className='is-size-1 has-text-weight-bold mt75'>
                We're in beta!
              </h1>
              <h6 className='is-size-6 mt30'>
                Currently our goal is to collect feedback on how you would like to use Notus. We're a friendly bunch, so please don't hesitate to reach out with any comments or suggestions you may have.
              </h6>
              <p className='mt30 has-text-light'>
                <strong className='has-text-light'>Disclaimer:</strong> We're unable to build every feature you would like to see but we'll try our best!
              </p>
              <div className='buttons mt30'>
                <a
                  className='button is-light is-small'
                  href='https://twitter.com/NotusEvents'
                >Tweet at Us</a>
                <a
                  className='button is-light is-small'
                  href='mailto:support@notus.network'
                >Email Us</a>
              </div>
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

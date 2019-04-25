import React, { Component} from 'react'
import { SlantSVG } from '~/components/home/SlantSVG'
import { SignupForm } from '~/components/SignupForm'

export class HomeSignupFooterCTA extends Component {
  state = {}

  render() {
    return (
      <div className='container-fluid color-block is-primary pt50 pb100 is-positioned-relatively'>
        <SlantSVG
          position='top'
          polygonClass='has-fill-cyan'
        />

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered pt50'>
              <h4 className='is-size-4 has-text-weight-bold'>
                Give it a try
              </h4>

              <div className='mt30'>
                <SignupForm
                  setSuccess={this.props.setSuccess}
                  success={this.props.success}
                />
              </div>

            </div>
          </div>
        </div>

        <SlantSVG
          position='bottom'
          polygonClass='has-fill-footer'
        />
      </div>
    )
  }
  
}

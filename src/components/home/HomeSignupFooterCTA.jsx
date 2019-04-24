import React, { Component} from 'react'
import { SignupForm } from '~/components/SignupForm'

export class HomeSignupFooterCTA extends Component {
  state = {}

  render() {
    return (
      <div className='container-fluid color-block is-primary pt100'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered pt50'>
              <h2 className='is-size-2'>
                Ready to get started?
              </h2>

              <h6 className='is-size-6'>
                Notus is always free to try:
              </h6>

              <div className='mt30'>
                <SignupForm
                  setSuccess={this.props.setSuccess}
                  success={this.props.success}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

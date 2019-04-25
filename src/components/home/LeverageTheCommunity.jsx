import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

export const LeverageTheCommunity = () => {
  
  return (
    <div className='container-fluid is-purple pb50 pt50 color-block is-positioned-relatively'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-8 col-start-md-3'>
            {/* <Facebook id='facebook' className='is-large ml20' /> */}
            {/* <Twitter id='twitter' className='is-large' />
                  <Instagram id='instagram' className='is-large ml20' />
                  <Slack id='slack' className='is-large ml20' /> */}
            <br />
            <br />

            <h4 className='is-size-4 animated pulse delay-2s has-text-weight-bold'>
              Leverage the Notus Community
            </h4>
            <p>
              Use common events &amp; actions created by the Notus community, or build your own trigger &amp; response system.
            </p>

            <br />
            <br />

            <Link
              className='button is-small is-light'
              to={routes.SIGNUP}
            >
              Let's Get Started
            </Link>
          </div>
        </div>
      </div>

      <svg
        className='overflow-bottom-svg'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <polygon
          points='0,100 0,0 100,0'
          className='has-fill-purple'
        />
      </svg>
    </div>
  )
}

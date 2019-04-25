import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

export const NotifyDappUsers = () => {
  
  return (
    <div className='container'>
      <div className='row pb100'>
        <div className='col-xs-12 col-md-6 col-start-md-6'>
          {/* <TrendingUp
                id='trending'
                className='is-large has-stroke-orange'
              />
              <FastForward
                id='ffwd'
                className='is-large has-stroke-black ml30'
              />
              <Mail
                id='mail'
                className='is-large has-stroke-blue ml20'
              /> */}

          <h4 className='is-size-4 animated pulse delay-2s has-text-weight-bold'>
            Respond to Smart Contract Events
          </h4>
          {/* <h5 className='is-size-5 animated pulse delay-2s has-text-weight-bold'>
            Notify your app's users when you need their attention.
          </h5> */}
          <br />
          <p>
            Notus allows you to react to Ethereum smart contract events by triggering actions and allowing you to run anything you like.
            <br /><br />For example, you could have a webhook that says when <strong>a new Auction is ready</strong> to be bid on, you or your app's users could receive an <strong>SMS</strong>, an <strong>email</strong>, and a <strong>msg in Slack</strong> with the auction details.
          </p>
          <br />

          {/* <CodeBox /> */}
          {/* <p>
                <a href='https://docs.notus.network'>Read the Developer Documentation</a>
              </p> */}
          <Link
            to={routes.ABOUT_PAGE}
            className='button is-dark is-small'
          >
            Learn More about Notus
          </Link>
        </div>
      </div>
    </div>
  )
}

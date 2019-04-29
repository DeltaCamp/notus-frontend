import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'
import { GitIcons } from '~/components/GitIcons'

export const EthereumNotifications = () => {
  
  return (
    <div className='container'>
      <div className='row pb100'>
        <div className='col-sm-6 has-text-right'>
          <GitIcons />
        </div>
        <div className='col-xs-12 col-sm-6 col-start-md-6'>
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

          <h4 className='is-size-3 animated pulse delay-2s has-text-weight-bold'>
            Custom Actions
          </h4>
          {/* <h5 className='is-size-5 animated pulse delay-2s has-text-weight-bold'>
            Notify your app's users when you need their attention.
          </h5> */}
          <br />

          <h5 className='is-size-6'>
            Trigger actions when an event occurs.
            <ul className='list'>
              <li>Send a Slack message</li>
              <li>Update an Oracle</li>
              <li>Do whatever you can dream up</li>
            </ul>
          </h5>

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

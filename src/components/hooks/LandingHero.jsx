import React from 'react'
import { Link } from 'react-router-dom'
import VelcroSymbol from '~/assets/images/velcro--symbol2.svg'
import * as routes from '~/../config/routes'

export const LandingHero = ({ heroColor }) => {
  return (
    <section className={`hero is-large ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-lg-8'>
              <div className='row'>
                <div className='col-xs-6 col-sm-3'>
                  <VelcroSymbol className='img-responsive' />
                </div>
              </div>
              <br />

              <h1 className='is-size-1 is-uppercase is-family-sans-serif'>
                Velcro <span className="is-hidden-touch is-size-5"> For Ethereum</span>
              </h1>
              <h4 className='is-size-4 is-family-serif'>
                Send and receive <strong>(notifications/texts/emails/slacks, etc.)</strong> when Ethereum Smart Contract events happen.
              </h4>
            </div>

            <div className='col-xs-12 col-lg-4'>
              <div className='message-white'>
                <div className='message-white--body'>
                  <p className='is-size-4 message-body--text'>
                    Want to start receiving notifications?
                  </p>
                  <Link
                    className='button is-light'
                    to={routes.HOOKS}
                  >
                    Create A Hook
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

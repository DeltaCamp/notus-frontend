import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

export const LandingHero = ({ heroColor }) => {
  return (
    <section className={`hero ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-lg-7'>
              {/* <div className='row'>
                <div className='col-xs-6 col-sm-3'>
                  <NotusSymbol className='img-responsive' />
                </div>
              </div> */}
              {/* <br /> */}

              <h1 className='is-size-1 has-text-weight-bold hero--title'>
                Get notified about smart contract events and transactions.
              </h1>
              <h5 className='is-size-5 hero--description-text'>
                {/* /texts/emails/slacks */}
                Notus allows you to set up user friendly Ethereum notifications.  Whether it's ERC20 transfers or account activity, Notus has your back.
              </h5>

              <Link
                className='button is-small is-outlined is-light'
                to={routes.SIGNUP}
              >
                Get Started For Free
              </Link>
            </div>

            <div className='col-xs-12 col-lg-4'>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

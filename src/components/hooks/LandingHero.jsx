import React from 'react'
import { Link } from 'react-router-dom'
import NotusSymbol from '~/assets/images/notus--symbol.svg'
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
                Get notified when smart contract events occur.
              </h1>
              <h5 className='is-size-5 hero--description-text'>
                {/* /texts/emails/slacks */}
                Notus is the distributed network for receiving webhooks when something interesting you've subscribed to happens on the blockchain.
              </h5>

              <Link
                className='button is-small is-outlined is-light'
                to={routes.HOOKS}
              >
                Create A Hook
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

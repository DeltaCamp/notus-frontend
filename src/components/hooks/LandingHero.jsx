import React from 'react'
import { Link } from 'react-router-dom'
import NotusSymbol from '~/assets/images/notus--symbol.svg'
import * as routes from '~/../config/routes'

export const LandingHero = ({ heroColor }) => {
  return (
    <section className={`hero is-large ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-lg-9'>
              {/* <div className='row'>
                <div className='col-xs-6 col-sm-3'>
                  <NotusSymbol className='img-responsive' />
                </div>
              </div> */}
              {/* <br /> */}

              <h2 className='is-size-2'>
                Get notified when smart contract events occur.
              </h2>
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

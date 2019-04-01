import React from 'react'
import { SignupForm } from '~/components/SignupForm'

export const LandingHero = ({ heroColor }) => {
  return (
    <section className={`hero ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-lg-8'>
              {/* <div className='row'>
                <div className='col-xs-6 col-sm-3'>
                  <NotusSymbol className='img-responsive' />
                </div>
              </div> */}
              {/* <br /> */}

              <h1 className='hero--title'>
                Ethereum notifications done simple.
              </h1>

              <h5 className='is-size-5 hero--description-text'>
                {/* /texts/emails/slacks */}
                Notus enables you to listen in on Ethereum. Whether it's token transfers or contract activity, Notus has your back.
              </h5>

              <div className='mt30'>
                <SignupForm />
              </div>

              {/* <Link
                className='button is-small is-outlined is-light'
                to={routes.SIGNUP}
              >
                Get Started For Free
              </Link> */}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

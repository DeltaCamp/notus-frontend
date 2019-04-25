import React from 'react'
import { SignupForm } from '~/components/SignupForm'

export const LandingHero = ({ setSuccess, success }) => {
  return (
    <section className={`hero ${success ? 'is-signed-up' : ''}`}>
      <div className='hero-bg has-bg' />
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
          
            <div className='col-xs-12 col-lg-8'>
              <h1 className='hero--title'>
                Ethereum Notifications
              </h1>

              <h6 className='is-size-6 hero--description-text'>
                Get notified when things happen.  Listen for account activity, new Augur markets, token transfers, or anything else.  Notus has presets for all the most popular Ethereum dapps, or you can customize your own.
              </h6>

              <div className='mt30'>
                <SignupForm
                  setSuccess={setSuccess}
                  autoFocus
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

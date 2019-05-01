import React from 'react'
import { SignupForm } from '~/components/SignupForm'

export const LandingHero = ({ setSuccess, success }) => {
  return (
    <section className={`hero ${success ? 'is-signed-up' : ''}`}>
      <div className='hero-bg has-bg' />
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>

            <div className='col-xs-12 col-xl-7'>
              <h1 className='hero--title'>
                Listen to Ethereum
              </h1>

              <h6 className='is-size-6 hero--description-text'>
                Get notified when events occur. Notus has presets for popular Ethereum dapps or you can customize your own.
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

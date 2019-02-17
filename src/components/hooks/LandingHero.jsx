import React from 'react'
import VelcroSymbol from '~/assets/images/velcro--symbol2.svg'

export const LandingHero = ({ heroColor }) => {
  return (
    <section className={`hero is-large ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-8'>
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

            
          </div>
        </div>
      </div>
    </section>
  )
}

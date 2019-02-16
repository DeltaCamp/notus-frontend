import React from 'react'

export const LandingHero = ({ heroColor }) => {
  return (
    <section className={`hero is-large ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-7'>
              <h1 className='is-size-1 is-uppercase is-family-sans-serif'>
                Velcro
              </h1>
              <h4 className='is-size-4 is-family-serif'>
                Send and receive <strong>(notifications/texts/emails/slacks, etc.)</strong> when your Ethereum Smart Contract events happen.
              </h4>
            </div>

            <div className='col-xs-12 col-md-5'>
              graphix here
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

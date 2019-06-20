import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
// import { Link } from 'react-router-dom'
import Vivus from 'vivus'

import Api from '~/assets/images/api9.svg'
import Community from '~/assets/images/community11.svg'
import EarBroadcast from '~/assets/images/ear-broadcast5.svg'
// import A from '~/assets/images/a.svg'
// import B from '~/assets/images/b.svg'
// import C from '~/assets/images/c.svg'
// import * as routes from '~/../config/routes'

export const Features = ReactTimeout(class extends PureComponent {
  componentDidMount() {
    this.kickOffAnimation()
  }

  kickOffAnimation = () => {
    new Vivus(
      'ear',
      {
        delay: 169, duration: 170, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
      }
    )

    new Vivus(
      'api',
      {
        delay: 229, duration: 300, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
      }
    )

    new Vivus(
      'community',
      {
        delay: 299, duration: 400, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
      }
    )
  }

  render () {
    return (
      <>
        <div id="features"></div>
        <div className='container pt100 pb200'>
          <h1
            className='is-size-1 has-text-weight-bold'
            style={{ color: '#60BDF2' }}
          >
            Features!
          </h1>

          <div className='row pt50'>

            <div className='col-xs-12 col-sm-4 has-text-centered'>
              <EarBroadcast id='ear' style={{ height: 160 }} />
              <br />
              <br />
              <h5 className='is-size-5 animated pulse delay-2s has-text-weight-bold'>
                Alert your customers
              </h5>
              <br />
              <p>
                Keep those who use your Smart Contracts updated when Ethereum events occur.
              </p>
            </div>
    
            <div className='col-xs-12 col-sm-4 has-text-centered'>
              <Api id='api' style={{ height: 160 }} />
              <br />
              <br />
              <h5 className='is-size-5 animated pulse delay-3s has-text-weight-bold'>
                API &amp; embed widgets
              </h5>
              <br />
              <p>
                Allow your dapp users to Subscribe to events dynamically.
              </p>
    
              {/* <CodeBox /> */}
              {/* <p>
                    <a href='https://docs.notus.events'>Read the Developer Documentation</a>
                  </p> */}
            </div>
    
            <div className='col-xs-12 col-sm-4 has-text-centered'>
              <Community id='community' style={{ height: 160 }} />
              <br />
              <br />
              <h5 className='is-size-5 animated pulse delay-4s has-text-weight-bold'>
                Community driven
              </h5>
              <br />
              <p>
                Upload your Contracts and share your Event Triggers with the Notus community.
              </p>
            </div>
          </div>
    
          {/* <div className='row'>
            <div className='col-xs-12 has-text-centered pt30'>
              <Link
                to={routes.ABOUT_PAGE}
                className='button is-dark is-small'
              >
                Learn how
              </Link>
            </div>
          </div> */}
        </div>
      </>
    )

  }

})

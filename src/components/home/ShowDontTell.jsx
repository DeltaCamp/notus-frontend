import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Vivus from 'vivus'

import EarBroadcast from '~/assets/images/ear-broadcast--final.svg'
import A from '~/assets/images/a.svg'
import B from '~/assets/images/b.svg'
import C from '~/assets/images/c.svg'
import * as routes from '~/../config/routes'



export const ShowDontTell = class extends PureComponent {
  componentDidMount() {
    new Vivus(
      'ear',
      {
        duration: 160, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
      }
    )
  }

  render () {
    return (
      <div className='container pb150'>
        <div className='row pt100'>
          <div className='col-xs-12 col-sm-4 has-text-centered'>
            <EarBroadcast id='ear' style={{ height: 160 }} />
            <br />
            <br />
            <h5 className='is-size-5 animated pulse delay-2s has-text-weight-bold'>
              Alert your customers
            </h5>
            <br />
            <p>
              Keep those who use your Smart Contracts in the know with event triggers.
            </p>
          </div>
  
          <div className='col-xs-12 col-sm-4 has-text-centered'>
            <B style={{ height: 160 }} />
            <br />
            <br />
            <h5 className='is-size-5 animated pulse delay-3s has-text-weight-bold'>
              API &amp; embed widgets
            </h5>
            <br />
            <p>
              Subscribe your dapp users and alert them when you need their attention.
            </p>
  
            {/* <CodeBox /> */}
            {/* <p>
                  <a href='https://docs.notus.events'>Read the Developer Documentation</a>
                </p> */}
          </div>
  
          <div className='col-xs-12 col-sm-4 has-text-centered'>
            <C className='pt20' style={{ height: 160 }} />
            <br />
            <br />
            <h5 className='is-size-5 animated pulse delay-4s has-text-weight-bold'>
              API &amp; embed widgets
            </h5>
            <br />
            <p>
              Subscribe your dapp users and alert them when you need their attention.
            </p>
          </div>
        </div>
  
        <div className='row'>
          <div className='col-xs-12 has-text-centered pt30'>
            <Link
              to={routes.ABOUT_PAGE}
              className='button is-dark is-small'
            >
              Learn how
            </Link>
          </div>
        </div>
      </div>
    )

  }

}

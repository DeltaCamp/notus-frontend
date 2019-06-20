import React from 'react'
// import { Link } from 'react-router-dom'
import { SlantSVG } from '~/components/home/SlantSVG'
import { GitIcons } from '~/components/GitIcons'

import Diamond3 from '~/assets/images/diamond5.svg'
import Diamond4 from '~/assets/images/diamond5.svg'
import Diamond5 from '~/assets/images/diamond5.svg'

// import * as routes from '~/../config/routes'

export const CustomActions = () => {
  return (
    <div
      className='container-fluid mt100 pt100 pb200 color-block is-positioned-relatively' 
      style={{ backgroundColor: '#35BFF7' }}
    >
      <SlantSVG
        position='top'
        polygonClass='has-fill-dark'
        fill='#35BFF7'
      />

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-start-sm-3'>
            <GitIcons />
            <h1 className='is-size-1 animated pulse delay-2s has-text-weight-bold'>
              Custom Actions
            </h1>

            <br />

            <div style={{ padding: 40, margin: '20px -40px -20px', borderRadius: 40 }}>

            <h5 className='is-size-4'>
              Trigger actions when an event occurs, such as "When a contract is ready to be withdrawn from:
              <ul className='pt20 pl20 pb20'>
                <li><Diamond3 /> send me a Slack message ...</li>
                <li><Diamond5 /> send my coworker an email ...</li>
                <li><Diamond4 /> ... and update an Oracle!</li>
              </ul>
              Or anything else you dream up.
            </h5>

            </div>

            <br />

            {/* <CodeBox /> */}
            {/* <p>
                  <a href='https://docs.notus.events'>Read the Developer Documentation</a>
                </p> */}
            {/* <Link
              to={routes.ABOUT_PAGE}
              className='button is-light is-small'
            >
              Learn more about Notus
            </Link> */}
          </div>
        </div>
      </div>

      {/* <SlantSVG
        position='bottom'
        polygonClass='has-fill-dark'
      /> */}
    </div>
  )
}

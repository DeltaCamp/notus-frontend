import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import RoadmapLines from '~/assets/images/roadmap2.svg'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import * as routes from '~/../config/routes'

export const PricingPage =
  class _PricingPage extends Component {
    render () {
      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='Pricing'
          />

          <ScrollToTop />

          <section className='section section--main-content mt100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-xl-10'>
                  <h1 className='is-size-xlarge has-text-weight-bold'>
                    Pricing
                  </h1>
                </div>
              </div>
            </div>


            <div id='map' className='container-fluid color-block is-dark mt100'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 pt100 pb100'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                      How much will Notus cost?
                    </h2>
                    <p>
                      ...
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>

          </section>

          <FooterContainer />
        </div>
      )
    }
  }

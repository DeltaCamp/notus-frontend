import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import RoadmapLines from '~/assets/images/roadmap2.svg'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import * as routes from '~/../config/routes'

export const AboutPage =
  class _AboutPage extends Component {
    render () {
      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='About'
          />

          <ScrollToTop />

          <section className='section section--main-content mt100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-xl-10'>
                  <h1 className='is-size-xlarge has-text-weight-bold'>
                    Our mission is to enable anyone to stay connected with the future of finance.
                  </h1>

                  <div className='buttons mt30'>
                    <a
                      className='button is-purple'
                      href='#roadmap'
                    >View roadmap</a>

                    <Link
                      to={routes.SIGNUP}
                      className='button is-link'
                      onClick={this.closeMobileNav}
                    >
                      Join open beta
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            <div id='roadmap' className='container-fluid color-block is-white-ter mt100'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-xl-8 pt100 pb100'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                      Where we plan to take Notus:
                    </h2>

                    <div className='row'>
                      <div className='col-xs-2'>
                        <RoadmapLines
                          height='900'
                        />
                      </div>
                      <div className='col-xs-10'>
                        <h1 className='is-size-1 has-text-weight-bold roadmap--goal-one'>
                          Today
                        </h1>
                        <h4 className='is-size-4 has-text-weight-bold roadmap--goal-one'>
                          Notus Today
                        </h4>
                        <h4 className='is-size-4 has-text-weight-bold roadmap--goal-one'>
                          Notus Today
                        </h4>
                        <h4 className='is-size-4 has-text-weight-bold roadmap--goal-one'>
                          Notus Today
                        </h4>
                        <h1 className='is-size-1 has-text-weight-bold roadmap--goal-one'>
                          Public Launch
                        </h1>
                        <h4 className='is-size-4 has-text-weight-bold roadmap--goal-one'>
                          Open Source
                        </h4>
                      </div>
                    </div>


                    
                  </div>
                </div>
              </div>
            </div>


            <div className='container-fluid color-block is-dark'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-xl-8 pt100 pb100'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                      Why did we create this?
                    </h2>
                    <p>
                      While consulting on distributed apps we were searching for the best way to build notifications which would react to Smart Contract. We didn't find anything ideal for our situation, and so: <em><strong>Voila!</strong></em> Notus was born.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='container-fluid color-block is-white-ter'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-xl-8 pt100 pb100'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                      The easiest Ethereum automation experience.
                    </h2>
                    <p>
                      Our goal is to provide the most succint yet comprehensive Ethereum automation experience for traders, developers &amp; power users.
                    </p>

                    <p>
                      Our current focus is Ethereum, however we don't plan to stop there. Eventually we want to see Notus used for a vast array of blockchains, both public and private.
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

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
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
                    Our mission is to enable you to stay connected with the future of finance.
                  </h1>

                  <div className='buttons mt30'>
                    <a
                      className='button is-link'
                      href='#roadmap'
                    >View Roadmap</a>

                    <Link
                      exact
                      to={routes.SIGNUP}
                      className='button is-info'
                      onClick={this.closeMobileNav}
                      activeClassName='is-active'
                    >
                      Join Open Beta
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='container-fluid color-block is-dark mt100'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-xl-8 pt100 pb100'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                      The easiest Ethereum automation experience.
                    </h2>
                    <p>
                      Notus provides the easiest Ethereum automation experience for both developers and power users.
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

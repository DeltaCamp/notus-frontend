import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'

export const AboutPage = 
  class _AboutPage extends Component {
    render () {
      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='About'
          />

          <ScrollToTop />

          <section className='section section--main-content mt100 pb100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-xl-10'>
                  {/* <h1 className="is-size-xlarge has-text-weight-bold">
                    About Notus
                  </h1> */}
                  <h1 className="is-size-xlarge has-text-weight-bold">
                    Our mission is to connect people to distributed ledgers.
                  </h1>
                  {/* <h2 className="is-size-2 has-text-weight-bold">
                    Our mission is to connect people to distributed ledgers.
                  </h2> */}

                  <div className='buttons mt30'>
                    <a
                      className='button is-link'
                      href='#roadmap'
                    >View Roadmap</a>
                    
                    <a
                      className='button is-info'
                      href='#signup'
                    >Join Beta</a>
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

            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-xl-8 pt100 pb100'>
                  <h4 className='is-size-4'>
                    We value transparency &amp; honesty.
                  </h4>
                  <p>
                    We believe this new technology will power a better future. With our friends and partners helping to inform decisions, it's all about the global collective of decentralized finance.
                  </p>

                  <hr />
                </div>
              </div>
            </div>
          </section>

          <FooterContainer />
        </div>
      )
    }
  }

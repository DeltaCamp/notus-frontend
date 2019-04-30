import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'

export const SupportPage =
  class _SupportPage extends Component {
    render () {
      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='Support'
          />

          <ScrollToTop />

          <section className='section section--main-content mt100 pb100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-xl-10'>
                  <h1 className='is-size-xlarge has-text-weight-bold'>
                    Support
                  </h1>
                  <h4 className='is-size-4 has-text-weight-bold'>
                    Need help with a technical issue?
                  </h4>

                  <div className='buttons mt30'>
                    <a
                      className='button is-link'
                      href='https://twitter.com/NotusEvents'
                    >Tweet Us</a>

                    <a
                      className='button is-info'
                      href='mailto:support@notus.network'
                      target='_blank'
                      rel='noopener noreferrer'
                    >Send Us An Email</a>

                    <a
                      className='button is-purple'
                      href='https://discord.gg/WXMDXqb'
                      target='_blank'
                      rel='noopener noreferrer'
                    >Join Discord Community</a>
                  </div>
                </div>
              </div>
            </div>

            <div className='container-fluid color-block is-primary mt100'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-xl-8 pt50 pb50'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                    &nbsp;
                    </h2>
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

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
                    Need a helping hand?
                  </h1>
                  
                  <h4 className='is-size-4 has-text-weight-bold pr200 pt20 pb10 mobile--padding-reset'>
                    Whether it's a technical issue or assistance using the Notus service, we've got your back:
                  </h4>

                  <div className='buttons mt30'>
                    <a
                      className='button is-link'
                      href='https://twitter.com/NotusEvents'
                    >Tweet us</a>

                    <a
                      className='button is-info'
                      href='mailto:support@notus.events'
                      target='_blank'
                      rel='noopener noreferrer'
                    >Send us an email</a>

                    <a
                      className='button is-purple'
                      href='https://discord.gg/WXMDXqb'
                      target='_blank'
                      rel='noopener noreferrer'
                    >Join Discord community</a>
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

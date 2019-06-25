import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Vivus from 'vivus'
import { Link } from 'react-router-dom'

import RoadmapLines from '~/assets/images/roadmap5.svg'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import * as routes from '~/../config/routes'

const Y_POS_ANIMATION_START = 770

export const AboutPage =
  class _AboutPage extends Component {
    state = {
      scrollTop: 0
    }

    roadmapVivus = null

    componentDidMount() {
      this.initAnimation()

      window.addEventListener('scroll', this.listenToScroll)
      this.listenToScroll()
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.listenToScroll)
    }

    initAnimation = () => {
      this.roadmapVivus = new Vivus(
        'roadmap-lines',
        {
          duration: 200, type: 'oneByOne', animTimingFunction: Vivus.EASE_IN_OUT, start: 'manual'
        }
      )
    }

    listenToScroll = () => {
      const scrollTop = window.pageYOffset !== undefined ?
        window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollTop

      if (scrollTop > Y_POS_ANIMATION_START) {
        console.log(this.roadmapVivus)
        this.roadmapVivus.play(1)
      }
    }

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
                      className='button is-purple'
                      href='#map'
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


            <div id='map' className='container-fluid color-block is-white-ter mt100'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 pt100 pb100'>
                    <h2 className='is-size-2 has-text-weight-semibold pb20'>
                      What's the end goal?
                    </h2>
                    <p>
                      We would love to see Notus utilized by a majority of DLT-based apps due to it's ease of use getting notifications and subscriptions going in your app. Here's what we envision in the future:
                    </p>

                    <h5 className='is-size-5 has-text-weight-semibold pt50 pb20'>
                      Roadmap
                    </h5>

                    <div className='row'>
                      <div className='col-xs-5 col-sm-3 col-xl-2'>
                        <RoadmapLines
                          id='roadmap-lines'
                          className='about--roadmap'
                        />
                      </div>
                      <div className='col-xs-7 col-sm-9 col-xl-10'>
                        <h3 className='is-size-3 has-text-weight-bold about--roadmap--goal-primary'>
                          Current Progress
                        </h3>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Embedded &amp; JS API (Dapp Integration)
                          <br /><span className='has-text-weight-normal'>Quick methods for dapps to integrate Notus.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          SMS Notifications
                          <br /><span className='has-text-weight-normal'>Receive or have your users receive text messages when Ethereum events occur.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Paid Subscriptions
                          <br /><span className='has-text-weight-normal'>Launch a paid pricing model based on each dapp's usage. 
                          {/* <Link to={routes.PRICING_PAGE}>More details on pricing plans</Link>. */}
                          </span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Increased App Integrations
                          <br /><span className='has-text-weight-normal'>Easily connect Notus to Zapier, IFTTT, Segment, Google Analytics, etc.</span>
                        </h5>

                        <h3 className='is-size-3 has-text-weight-bold about--roadmap--goal-primary'>
                          Public Launch
                        </h3>

                        
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Push Notifications
                          <br /><span className='has-text-weight-normal'>Afford owners of iOS &amp; Android apps to receive push notifications based on Notus events.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Email Template Customization
                          <br /><span className='has-text-weight-normal'>Provide Notus customers with a custom templating engine to brand emails the way they'd like.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Expanded DLT &amp; Blockchain Listeners
                          <br /><span className='has-text-weight-normal'>Encompass other chain &amp; DLT technologies both public and private.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Open Source Initiative
                          <br /><span className='has-text-weight-normal'>Provide anyone with code &amp; documentation to run their own Notus servers.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Decentralized Infrastructure
                          <br /><span className='has-text-weight-normal'>Allow anyone to act as a notification relayer and get paid to send notifications.</span>
                        </h5>
                        <h5 className='is-size-5 has-text-weight-bold about--roadmap--goal-secondary'>
                          Continue development &amp; support ...
                        </h5>
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
                      What's your aim?
                    </h2>
                    <p>
                      We aim to provide the most succint, stable and comprehensive Ethereum automation experience for traders, developers &amp; power users.
                    </p>

                    <p>
                      Our current focus is Ethereum, however we don't plan to stop there. Eventually we want to see Notus used for a vast array of chain and DLT technology, both public and private.
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

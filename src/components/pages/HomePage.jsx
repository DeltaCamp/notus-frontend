import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import { FooterContainer } from '~/components/layout/Footer'
import { LandingHero } from '~/components/home/LandingHero'
import { CustomActions } from '~/components/home/CustomActions'
import { Features } from '~/components/home/Features'
import { HomeDiscoverEvents } from '~/components/home/HomeDiscoverEvents'
import { HomeBetaNotice } from '~/components/home/HomeBetaNotice'
import { HomeSignupFooterCTA } from '~/components/home/HomeSignupFooterCTA'

export const HomePage = ReactTimeout(class extends Component {
  state = {
    animateIn: false
  }

  setSuccess = () => {
    this.setState({ success: true })
  }

  render () {
    return (
      <>
        <div
          className='is-positioned-absolutely'
        >
          <header className='header'>
            <LandingHero
              setSuccess={this.setSuccess}
              success={this.state.success}
            />
          </header>
          <section className='section'>
            <Features />
            <CustomActions />
            <HomeDiscoverEvents />
            <HomeBetaNotice />
          </section>

          <HomeSignupFooterCTA />

          <FooterContainer />
        </div>

        <a
          href="#asdf"
          className={classnames(
            'click-to-scroll',
            {
              'click-to-scroll__appear': this.state.animateIn
            }
          )}
        >
          A
        </a>
      </>
    )
  }
})

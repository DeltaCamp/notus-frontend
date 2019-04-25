import React, { Component } from 'react'
import { FooterContainer } from '~/components/layout/Footer'
import { LandingHero } from '~/components/home/LandingHero'
import { NotifyDappUsers } from '~/components/home/NotifyDappUsers'
import { LeverageTheCommunity } from '~/components/home/LeverageTheCommunity'
import { HomeDiscoverEvents } from '~/components/home/HomeDiscoverEvents'
import { HomeBetaNotice } from '~/components/home/HomeBetaNotice'
import { AboutWebhookAPI } from '~/components/home/AboutWebhookAPI'
import { HomeSignupFooterCTA } from '~/components/home/HomeSignupFooterCTA'

export class HomePage extends Component {
  state = {}

  setSuccess = () => {
    this.setState({ success: true })
  }

  render() {
    return (
      <div className='is-positioned-absolutely'>
        <header className='header'>
          <LandingHero
            setSuccess={this.setSuccess}
            success={this.state.success}
          />
        </header>
        <section className='section'>
          <NotifyDappUsers />
          <HomeDiscoverEvents />
          <HomeBetaNotice />
          <LeverageTheCommunity />
          <AboutWebhookAPI />
        </section>

        <HomeSignupFooterCTA
          setSuccess={this.setSuccess}
          success={this.state.success}
        />

        <FooterContainer />
      </div>
    )
  }
}

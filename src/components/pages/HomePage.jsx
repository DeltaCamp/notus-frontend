import React, { Component } from 'react'
import { FooterContainer } from '~/components/layout/Footer'
import { LandingHero } from '~/components/home/LandingHero'
import { EthereumNotifications } from '~/components/home/EthereumNotifications'
// import { LeverageTheCommunity } from '~/components/home/LeverageTheCommunity'
import { HomeDiscoverEvents } from '~/components/home/HomeDiscoverEvents'
import { HomeBetaNotice } from '~/components/home/HomeBetaNotice'
// import { CustomActions } from '~/components/home/CustomActions'
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
          <EthereumNotifications />
          <HomeDiscoverEvents />
          <HomeBetaNotice />
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

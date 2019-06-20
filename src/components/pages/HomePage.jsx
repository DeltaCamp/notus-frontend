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

import NotusHomeArrow from '~/assets/images/notus-home-arrow.svg'

const Y_POS_SCROLLCLICK_VIS_THRESHOLD = 300

export const HomePage = ReactTimeout(class extends Component {
  state = {
    animateIn: false,
    scrollTop: 0
  }
  
  componentDidMount () {
    const animateIn = true
    
    this.props.setTimeout(() => { this.setState({ animateIn }) }, 3000)
      
    window.addEventListener('scroll', this.listenToScroll)
    this.listenToScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const scrollTop = window.pageYOffset !== undefined ?
      window.pageYOffset :
      (document.documentElement || document.body.parentNode || document.body).scrollTop

    this.setState({
      scrollTop
    })
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
          href="#features"
          className={classnames(
            'click-to-scroll',
            {
              'click-to-scroll__appear': this.state.animateIn &&
                (this.state.scrollTop < Y_POS_SCROLLCLICK_VIS_THRESHOLD)
            }
          )}
        >
          <NotusHomeArrow style={{ transform: 'rotate(180deg)' }} />
        </a>
      </>
    )
  }
})

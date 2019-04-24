import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FooterContainer } from '~/components/layout/Footer'
import {
  Facebook,
  FastForward,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Slack,
  Smartphone,
  TrendingUp,
  Twitter,
  Watch,
  Zap
} from 'react-feather'
import { LandingHero } from '~/components/hooks/LandingHero'
import { ScrollToTop } from '~/components/ScrollToTop'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
// import { CodeBox } from '~/components/CodeBox'
import * as routes from '~/../config/routes'

export class HomePage extends Component {
  state = {
    searchValue: ''
  }

  handleSearchInputChange = (e) => {
    e.preventDefault()

    this.setState({
      searchValue: e.target.value
    })
  }

  setSuccess = () => {
    this.setState({ success: true })
  }

  render () {
    return (
      <div className='is-positioned-absolutely'>
        <ScrollToTop />
        
        <header className='header'>
          <LandingHero
            setSuccess={this.setSuccess}
            success={this.state.success}
          />
        </header>
        <section className='section'>
          <div className='container'>
            <div className='row pb100'>
              <div className='col-xs-12 col-md-8 col-start-md-5'>
                <div id="about"></div>

                <Zap /> &nbsp; <TrendingUp /> &nbsp; <FastForward /> &nbsp; <Twitter /> &nbsp; <Facebook /> &nbsp; <Instagram /> &nbsp; <MessageCircle /> &nbsp; <Slack /> &nbsp; <Send /> &nbsp; <Mail /> &nbsp; <Smartphone /> &nbsp; <Watch />
                <h5 className='is-size-5'>
                  Notify your app's users when you need their attention.
                </h5>
                <br />
                <p>
                  Notus allows you to react to Ethereum smart contract events by triggering webhooks, allowing you to run anything you like. For example, I could have a webhook that says when a new Auction Contract is ready to be bid on, I receive a Twilio SMS, MailGun email, and a msg in my Slack about it.
                </p>
                <br />

                {/* <CodeBox /> */}
                <p>
                  <a href='https://docs.notus.network'>Read the Developer Documentation</a>
                </p>
              </div>
            </div>
          </div>

          <div className='container-fluid is-dark has-text-white pb100 pt100 color-block'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-md-8 col-start-md-3'>
                  <div id="about"></div>

                  <h1 className='is-size-1'>
                    Automate your experience. 
                  </h1>
                  <h4 className='is-size-4'>
                    Use common events &amp; actions created by the community, or build your own trigger and response system.
                  </h4>

                  <br />

                  <Link
                    className='button is-small is-light is-outlined'
                    to={routes.SIGNUP}
                  >
                    Let's Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-12 has-text-centered mt50'>
                <h4 className='is-size-4 has-text-weight-bold mt75'>
                  Find common Ethereum events to base notifications off of:
                </h4>
                <div className='form'>
                  <input
                    type='text'
                    placeholder='Search ...'
                    value={this.state.searchValue}
                    onChange={this.handleSearchInputChange}
                    className='input mt20'
                    style={{ maxWidth: 600 }}
                  />
                </div>
                
                <div className='mt75 pb100'>
                  <DiscoverEventsListing
                    searchValue={this.state.searchValue}
                    limit
                  />
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

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FooterContainer } from '~/components/layout/Footer'
import Vivus from 'vivus'
import {
  Facebook,
  FastForward,
  GitBranch,
  GitCommit,
  GitMerge,
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
import { SignupForm } from '~/components/SignupForm'
import { ScrollToTop } from '~/components/ScrollToTop'
import { LandingHero } from '~/components/LandingHero'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
// import { CodeBox } from '~/components/CodeBox'
import * as routes from '~/../config/routes'

export class HomePage extends Component {
  state = {
    searchValue: ''
  }

  componentDidMount() {
    // new Vivus(
    //   'zap',
    //   {
    //     duration: 200, pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    new Vivus(
      'trending',
      {
        delay: 20, duration: 100, type: 'oneByOne', pathTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'ffwd',
      {
        delay: 50, duration: 140, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'mail',
      {
        delay: 55, duration: 200, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
      }
    )


    new Vivus(
      'twitter',
      {
        delay: 60, duration: 100, type: 'sync', pathTimingFunction: Vivus.EASE_OUT
      }
    )
    // new Vivus(
    //   'facebook',
    //   {
    //     duration: 200, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    new Vivus(
      'instagram',
      {
        delay: 75, duration: 250, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'slack',
      {
        delay: 150, duration: 300, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
      }
    )
    // new Vivus(
    //   'message-circle', {
    //     duration: 100, type: 'delayed'
    //   }
    // )
    // new Vivus(
    //   'send',
    //   {
    //     duration: 100, type: 'delayed'
    //   }
    // )

    // new Vivus(
    //   'smartphone',
    //       {
    //     duration: 100, type: 'delayed'
    //   }
    // )
    // new Vivus(
    //   'watch',
    //   {
    //     duration: 100, type: 'delayed'
    //   }
    // )


    new Vivus(
      'git-branch',
      {
        duration: 60, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'git-commit',
      {
        delay: 60, duration: 80, type: 'delayed', animTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'git-merge',
      {
        delay: 100, duration: 120, type: 'delayed', animTimingFunction: Vivus.EASE_OUT
      }
    )


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

  render() {
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
              <div className='col-xs-12 col-md-6 col-start-md-6'>
                <div id='about'></div>

                {/* <Zap id='zap' /> &nbsp; <TrendingUp id='trending' /> &nbsp; <FastForward id='ffwd' /> &nbsp; <Twitter id='twitter' /> &nbsp; <Facebook id='facebook' /> &nbsp; <Instagram id='instagram' /> &nbsp; <Slack id='slack' /> &nbsp; <MessageCircle id='message-circle' /> &nbsp; <Send id='send' /> &nbsp; <Mail id='mail' /> &nbsp; <Smartphone id='smartphone' /> &nbsp; <Watch id='watch' /> */}
                {/* <Zap
                  id='zap'
                  className='is-large has-stroke-warning'
                /> */}
                <TrendingUp
                  id='trending'
                  className='is-large has-stroke-orange'
                />
                <FastForward
                  id='ffwd'
                  className='is-large has-stroke-black ml30'
                />
                {/* <MessageCircle
                  id='message-circle' className='is-large has-stroke-green ml20'
                /> */}
                <Mail
                  id='mail'
                  className='is-large has-stroke-blue ml20'
                />
                {/* <Smartphone
                  id='smartphone'
                  className='is-large has-stroke-green ml20'
                />
                <Watch
                  id='watch'
                  className='is-large has-stroke-green ml20'
                /> */}
                <h5 className='is-size-5 animated pulse delay-2s'>
                  Notify your app's users when you need their attention.
                </h5>
                <br />
                <p>
                  Notus allows you to react to Ethereum smart contract events by triggering actions and allowing you to run anything you like.
                  <br /><br />For example, you could have a webhook that says when <strong>a new Auction is ready</strong> to be bid on, you or your app's users could receive an <strong>SMS</strong>, an <strong>email</strong>, and a <strong>msg in Slack</strong> with the auction details.
                </p>
                <br />

                {/* <CodeBox /> */}
                {/* <p>
                  <a href='https://docs.notus.network'>Read the Developer Documentation</a>
                </p> */}
                <p>
                  <a href='faq'>FAQ</a>
                </p>
              </div>
            </div>
          </div>

          <div className='container-fluid is-dark has-text-white pb100 pt100 color-block'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-md-8 col-start-md-3'>
                  <div id='about'></div>

                  <Twitter id='twitter' className='is-large' />
                  {/* <Facebook id='facebook' className='is-large ml20' /> */}
                  <Instagram id='instagram' className='is-large ml20' />
                  <Slack id='slack' className='is-large ml20' />
                  <br />
                  <br />

                  <h3 className='is-size-3'>
                    Automate your life.
                  </h3>
                  <h5 className='is-size-5'>
                    Use common events &amp; actions created by the Notus community, or build your own trigger &amp; response system.
                  </h5>

                  <br />
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


          <div className='container-fluid is-purple has-text-white pb100 pt100 color-block has-bg has-bg__dark'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-md-8 col-start-md-3'>
                  <div id='about'></div>

                  <GitBranch id='git-branch' className='is-large' />
                  <GitCommit id='git-commit' className='is-large ml30' />
                  <GitMerge id='git-merge' className='is-large ml30' />
                  <br />
                  <br />

                  <h1 className='is-size-1'>
                    If it has an API ...
                  </h1>
                  <h5 className='is-size-5'>
                    ... you can connect Notus to it.
                  </h5>
                  <br />

                  <p>
                    Use Notus' webhook feature to have any event trigger your own custom code.
                  </p>

                  <br />
                  <br />

                  <Link
                    className='button is-small is-light is-outlined'
                    to={routes.SIGNUP}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className='container-fluid color-block is-primary pt100'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-8 col-start-md-3 has-text-centered pt50'>
                <h2 className='is-size-2'>
                  Ready to get started?
                </h2>

                <h6 className='is-size-6'>
                  Notus is always free to try:
                </h6>

                <div className='mt30'>
                  <SignupForm
                    setSuccess={this.setSuccess}
                    success={this.state.success}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        <FooterContainer />
      </div>
    )
  }
}

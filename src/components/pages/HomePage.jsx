import React, { Component } from 'react'
import { FooterContainer } from '~/components/layout/Footer'
import { LandingHero } from '~/components/hooks/LandingHero'
import { ScrollToTop } from '~/components/ScrollToTop'
// import { CodeBox } from '~/components/CodeBox'

export class HomePage extends Component {
  state = {}

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
              <div className='col-xs-10 col-md-9'>
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
                {/* <Query query={web3Queries.networkIdQuery}>
                  {({ data }) => {
                    const wrongNetwork = data && data.networkId && allowedNetworkIds().indexOf(data.networkId) === -1

                    if (wrongNetwork) {
                      return <ErrorMessage errorMessage={
                        `No hooks available on the currently selected Ethereum network. (Wrong network?)`
                      } />
                    } else {
                      return (
                        <>
                          <h5 className='is-size-5 has-text-grey-dark is-uppercase has-text-weight-bold'>
                            Your WebHooks
                          </h5>
                          <br />

                          <HooksList location={this.props.location} />
                        </>
                      )
                    }
                  }}
                </Query> */}
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}

import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { FooterContainer } from '~/components/layout/Footer'
import { ErrorMessage } from '~/components/ErrorMessage'
import { HooksList } from '~/components/hooks/HooksList'
import { LandingHero } from '~/components/hooks/LandingHero'
import { web3Queries } from '~/queries/web3Queries'
import { CodeBox } from '~/components/CodeBox'

export class HomePage extends PureComponent {
  render () {
    const heroColor = 'is-link'

    return (
      <div className='is-positioned-absolutely'>
        <header className='header'>
          <div className='hero-bg' />
          <LandingHero heroColor={heroColor} />
        </header>
        
        <section id="your-webhooks" className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-8 col-start-md-4'>
                <h1 className='is-size-1'>
                  Update your DApp's users when you need their attention.
                </h1>
                <br />
                <p>
                  Notus is a service that allows users to trigger webhooks from Ethereum smart contract events or Graph Protocol GraphQL subscriptions.  The service will be run by a cloud of server nodes that are coordinated and incentivized by smart contracts.  Users will store their webhook definitions in IPFS, register the hash in a smart contract, then a Notus node will be assigned the webhook and start listening.  Anyone will be able to manage a Notus node and earn money by triggering webhooks.
                </p>
                <br />

                <CodeBox />
                <p>
                  <a href='https://github.com/notifyus' target='_blank' rel='noopener noreferrer'>Read the Developer Documentation</a>
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

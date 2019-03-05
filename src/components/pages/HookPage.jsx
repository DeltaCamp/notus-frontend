import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ethers } from 'ethers'
import { Query } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { PageDetailsLoader } from '~/components/PageDetailsLoader'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ScrollToTop } from '~/components/ScrollToTop'
import { HookDetails } from '~/components/hooks/HookDetails'
import { notusQueries } from '~/queries/notusQueries'
import { LogBox } from '~/components/LogBox'

export class HookPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='Hook'
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <p className='content'>
                  <button
                    onClick={this.context.router.history.goBack}
                    className='button is-monospaced is-text has-text-weight-bold back-button has-underline-border'
                  >
                    {'<'} Back
                  </button>
                </p>

                <Query query={notusQueries.eventsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <PageDetailsLoader />
                    if (error) return <ErrorMessage errorMessage={error} />

                    const events = data.Notus ? data.Notus.Registered : []
                    const ipfsHash = this.props.match.params.ipfsHash
                    const webhookEvent = events.find((e) => {
                      let ipfsHashUtf8
                      const ipfsHashAsHex = e.parsedLog.values.ipfsHash

                      try {
                        ipfsHashUtf8 = ethers.utils.toUtf8String(ipfsHashAsHex)
                      } catch (error) {
                        console.warn(error)
                      }

                      return ipfsHashUtf8 === ipfsHash
                    })

                    if (!webhookEvent) {
                      console.warn('webhookEvent not found')
                      return null
                    }

                    return (
                      <>
                        <Helmet
                          title={ipfsHash}
                        />
                        <HookDetails
                          webhookEvent={webhookEvent}
                          ipfsHash={ipfsHash}
                        />
                        <LogBox ipfsHash={ipfsHash} />
                        <br />
                        <br />
                      </>
                    )
                  }}
                </Query>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}

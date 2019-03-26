import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FooterContainer } from '~/components/layout/Footer'
import { CodeBox } from '~/components/CodeBox'
import * as routes from '~/../config/routes'

export const DappConfirmPage = 
  class _DappConfirmPage extends Component {

    static propTypes = {
      match: PropTypes.object.isRequired
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    render () {
      const apiKey = this.props.match.params.api_key
      const dappName = this.props.match.params.dapp_name

      return (
        <div className='is-positioned-absolutely'>
          <section className='section section--main-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-md-9'>
                  <h3 className='is-size-3'>
                    Your email address has been confirmed.
                  </h3>
                  <p>
                    You're ready to start bringing notifications to your users through Notus.
                  </p>
                  <br />
                  <br />
                  <p className='has-text-grey-light'>
                    Quickly Integrate Notus with your DApp:
                  </p>
                  <CodeBox apiKey={apiKey} />

                  <br />
                  <br />
                  <br />
                  <br />
                  <h6 className='is-size-6'>
                    Learn how to use the API in depth:
                  </h6>
                  <Link to={routes.API_DOCS}>
                    Read the Developer Documentation
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <FooterContainer />
        </div>
      )
    }
  }
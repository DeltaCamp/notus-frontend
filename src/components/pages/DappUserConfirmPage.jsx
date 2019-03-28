import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'

const queryString = require('query-string')

const dappUserConfirmPageMutation = gql`
  mutation confirmDappUser($requestKey: String!) {
    confirmDappUser(requestKey: $requestKey) @client
  }
`

export const DappUserConfirmPage = graphql(dappUserConfirmPageMutation, { name: 'confirmDappUser' })(
  class _DappUserConfirmPage extends PureComponent {

    static propTypes = {
      match: PropTypes.object.isRequired
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    constructor (props) {
      super(props)
      this.state = {
        confirming: false
      }
    }

    componentDidMount () {
      const requestKey = this.getRequestKey(this.props)
      if (requestKey) {
        this.confirmDappUser(requestKey)
      }
    }

    componentDidUpdate (prevProps) {
      const oldRequestKey = this.getRequestKey(prevProps)
      const newRequestKey = this.getRequestKey(this.props)

      if (newRequestKey !== oldRequestKey) {
        this.confirmDappUser(newRequestKey)
      }
    }

    confirmDappUser (requestKey) {
      this.setState({
        confirming: true
      })
      this.props.confirmDappUser({
        variables: {
          requestKey
        }
      }).then((param) => {
        const { accessKey } = param.data.confirmDappUser.data
        this.setState({
          confirming: false,
          confirmed: true,
          accessKey
        })
      }).catch(error => {
        this.setState({
          confirming: false,
          error: true
        })
      })
    }

    getRequestKey(props) {
      let params = queryString.parse(props.location.search)
      return params.requestKey
    }

    render () {
      let message

      if (this.state.confirming) {
        message = "Confirming your subscription..."
      } else if (this.state.error) {
        message = "The request key is no longer valid"
      } else if (this.state.confirmed) {
        message = `Your subscription is confirmed!  Your access key is: ${this.state.accessKey}`
      }

      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='Confirm Your Account'
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

                  <p>
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <FooterContainer />
        </div>
      )
    }
  }
)

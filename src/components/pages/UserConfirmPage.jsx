import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'

const queryString = require('query-string')

const userConfirmPageMutation = gql`
  mutation confirmUser($requestKey: String!) {
    confirmUser(requestKey: $requestKey) @client
  }
`

export const UserConfirmPage = graphql(currentUserQuery, { name: 'currentUser' })(
  graphql(userConfirmPageMutation, { name: 'confirmUser' })(
    class _UserConfirmPage extends PureComponent {

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
          this.confirmUser(requestKey)
        }
      }

      componentDidUpdate (prevProps) {
        const oldRequestKey = this.getRequestKey(prevProps)
        const newRequestKey = this.getRequestKey(this.props)

        if (newRequestKey !== oldRequestKey) {
          this.confirmUser(newRequestKey)
        }
      }

      confirmUser (requestKey) {
        const { loading, error, currentUser } = this.props.currentUser
        const currentUserExists = !loading && !error && currentUser
        if (currentUserExists) {
          this.setState({
            confirming: false,
            confirmed: true
          })
        } else {
          this.setState({
            confirming: true
          })
          this.props.confirmUser({
            variables: {
              requestKey
            }
          }).then((param) => {
            this.setState({
              confirming: false,
              confirmed: true
            })
          }).catch(error => {
            this.setState({
              confirming: false,
              error
            })
          })
        }

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
          message = `There was an error: ${this.state.error}`
        } else if (this.state.confirmed) {
          message = `Your subscription is confirmed!`
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
)

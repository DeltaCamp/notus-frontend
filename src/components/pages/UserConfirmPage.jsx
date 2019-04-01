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
  mutation confirmUser($oneTimeKey: String!) {
    confirmUser(oneTimeKey: $oneTimeKey) @client
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
          confirming: false,
          password: '',
          passwordConfirmation: ''
        }
      }

      componentDidMount () {
        const oneTimeKey = this.getOneTimeKey(this.props)
        if (oneTimeKey) {
          this.confirmUser(oneTimeKey)
        }
      }

      componentDidUpdate (prevProps) {
        const oldRequestKey = this.getOneTimeKey(prevProps)
        const newRequestKey = this.getOneTimeKey(this.props)

        if (newRequestKey !== oldRequestKey) {
          this.confirmUser(newRequestKey)
        }
      }

      confirmUser (oneTimeKey) {
        const { loading, error, currentUser } = this.props.currentUser
        const currentUserExists = !loading && !error && currentUser
        if (currentUserExists) {
          this.setState({
            confirming: false,
            confirmed: true
          })
        } else {

        }
      }

      getOneTimeKey(props) {
        const { oneTimeKey } = queryString.parse(props.location.search)
        return oneTimeKey
      }

      handleConfirmSubmit = (e) => {
        e.preventDefault()

        let error

        let oneTimeKey = this.getOneTimeKey(this.props)
        if (!oneTimeKey) {
          error = "Missing one time key"
        }

        if (!this.state.password) {
          error = "You must enter a password"
        }

        if (this.state.password !== this.state.passwordConfirmation) {
          error = "The passwords do not match"
        }

        if (error) {
          this.setState({
            error
          })
          return
        } else {
          this.setState({
            confirming: true,
            error: null
          })
        }

        this.props.confirmUser({
          variables: {
            oneTimeKey,
            password: this.state.password
          }
        }).then((param) => {
          this.setState({
            confirming: false,
            confirmed: true
          })
        }).catch(error => {
          this.setState({
            confirming: false,
            error: error.message
          })
        })
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
                    <h1>Create Your Password</h1>
                    <form onSubmit={this.handleConfirmSubmit}>
                      <div className='form-error'>
                        <span />
                        {this.state.error}
                      </div>
                      <div className='field'>
                        <label htmlFor='password' className='label'>
                          Password
                        </label>
                        <input
                          autoFocus
                          type='password'
                          className='input'
                          onChange={(e) => { this.setState({ password: e.target.value }) }}
                          value={this.state.password}
                        />
                      </div>
                      <div className='field'>
                        <label htmlFor='password' className='label'>
                          Confirm Password
                        </label>
                        <input
                          autoFocus
                          type='password'
                          className='input'
                          onChange={(e) => { this.setState({ passwordConfirmation: e.target.value }) }}
                          value={this.state.passwordConfirmation}
                        />
                      </div>
                      <div className='control form-submit has-text-centered'>
                        <button
                          type='submit'
                          className='button is-dark is-outlined is-small'
                        >
                          Save
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
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

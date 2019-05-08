import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { Activity } from 'react-feather'
import { formatRoute } from 'react-router-named-routes'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import * as routes from '~/../config/routes'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'

const queryString = require('query-string')

const disableEventEmailMutation = gql`
  mutation disableEventEmail($disableEmailKey: String!) {
    disableEventEmail(disableEmailKey: $disableEmailKey)
  }
`

export const DisableEmailPage = graphql(disableEventEmailMutation, { name: 'disableEventEmail' })(
  graphql(currentUserQuery, { name: 'currentUserData' })(
    class _DisableEmailPage extends PureComponent {
      static propTypes = {
        match: PropTypes.object.isRequired
      }

      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      constructor (props) {
        super(props)
        this.state = {
          disabling: false
        }
      }

      componentDidMount () {
        const disableEmailKey = this.getDisableEmailKey(this.props)
        if (disableEmailKey) {
          this.disableEventEmail(disableEmailKey)
        }
      }

      componentDidUpdate (prevProps) {
        const oldDisableEmailKey = this.getDisableEmailKey(prevProps)
        const newDisableEmailKey = this.getDisableEmailKey(this.props)

        if (newDisableEmailKey !== oldDisableEmailKey) {
          this.disableEventEmail(newDisableEmailKey)
        }
      }

      disableEventEmail (disableEmailKey) {
        this.setState({
          disabling: true
        })
        this.props.disableEventEmail({
          variables: {
            disableEmailKey
          }
        }).then(({ data }) => {
          this.setState({
            disabling: false,
            disabled: true,
            eventId: data.disableEventEmail
          })
        }).catch(error => {
          console.error(error)
          this.setState({
            disabling: false,
            error: true
          })
        })
      }

      getDisableEmailKey (props) {
        let params = queryString.parse(props.location.search)
        return params.disableEmailKey
      }

      render () {
        const { currentUserData } = this.props
        const isLoggedIn = currentUserData && currentUserData.currentUser

        let message

        if (this.state.disabling) {
          message = 'Unsubscribing from the Event...'
        } else if (this.state.error) {
          message = 'Could not disable the event subscription'
        } else if (this.state.disabled) {
          message = `You have been unsubscribed from this Event`
        }

        let action
        if (isLoggedIn && this.state.eventId) {
          action = <Link to={formatRoute(routes.EDIT_EVENT, { eventId: this.state.eventId })} className='button mt20 is-purple'>View Event</Link>
        } else if (isLoggedIn) {
          action = <Link to={routes.MY_EVENTS} className='button mt20 is-purple'><Activity />&nbsp;My Events</Link>
        } else {
          action = <Link to={routes.SIGNIN} className='button mt20 is-purple'>Sign In</Link>
        }

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='Unsubscribe from Event'
            />

            <ScrollToTop />

            <section className='section section--main-content'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12'>
                    <p className='mt50'>
                      <button
                        onClick={this.context.router.history.goBack}
                        className='button is-small is-outlined is-dark'
                      >
                        {'<'} Back
                      </button>
                    </p>

                    <div className='has-text-centered'>
                      <h2 className='is-size-4 mt75 has-text-weight-bold '>
                        {message}
                      </h2>
                      {action}
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
  )
)

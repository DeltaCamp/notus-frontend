import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { Link, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

export const MyEventsPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _MyEventsPage extends PureComponent {
    state = {}

    static propTypes = {
      match: PropTypes.object.isRequired
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    componentWillMount() {
      const { currentUser } = this.props.currentUserData

      if (!currentUser) {
        toast.error('Please sign in to access this page.')
        this.setState({ redirect: true })
      }
    }

    render () {
      if (this.state.redirect) {
        return <Redirect to={routes.SIGNIN} />
      }

      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='My Events'
          />

          <ScrollToTop />

          <section className='section section--main-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 has-text-centered'>
                  <h2 className='is-size-2 has-text-weight-bold mt75'>
                    You have no active events.
                  </h2>
                  <Link
                    className='button mt20 is-purple'
                    to={routes.NEW_EVENT}
                  >
                    Create a Custom Event
                  </Link>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />

            <div className='container-fluid has-bg is-blue pt50 pb100'>
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-xs-12 has-text-centered mt50'>
                        <h4 className='is-size-4 has-text-white has-text-weight-bold'>
                          Create a new event based off an existing one:
                        </h4>

                        <br />

                        <DiscoverEventsListing />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='section'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 has-text-centered'>
                  <Link
                    className='button mt20 is-purple'
                    to={routes.NEW_RECIPE}
                  >
                    Create a new Recipe
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
)

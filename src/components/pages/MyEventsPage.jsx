import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
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
                <div className='col-xs-12'>
                  <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt75'>
                    What would you like to do today?
                  </h1>
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

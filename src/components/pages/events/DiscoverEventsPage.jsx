import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

export const DiscoverEventsPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _DiscoverEventsPage extends PureComponent {
    state = {}

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
            title='Discover Events'
          />

          <ScrollToTop />

          <section className='section section--main-content pb100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered'>
                  <h4 className='is-size-4 has-text-weight-bold mt75'>
                    Search for a recipe to base a new event off of:
                  </h4>

                  <form className='form mt20'>
                    <input
                      placeholder='Search ...'
                      className='input'
                      type='text'
                      value={this.state.searchValue}
                      onChange={(e) => this.setState({ searchValue: e.target.value })}
                    />
                  </form>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12 has-text-centered mt50'>
                  <DiscoverEventsListing />
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

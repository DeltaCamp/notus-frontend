import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'

import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'

export const DashboardPage = graphql(currentUserQuery, { name: 'currentUser' })(
  class _DashboardPage extends PureComponent {

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
            title='Dashboard'
          />

          <ScrollToTop />

          <section className='section section--main-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12'>
                  <p>
                    What would you like to do today?
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

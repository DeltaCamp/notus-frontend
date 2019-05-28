import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { IsAdmin } from '~/components/IsAdmin'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

export const AdminPage =
  IsAdmin(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      class _AdminPage extends PureComponent {
        render () {
          return (
            <div className='is-positioned-absolutely'>
              <Helmet
                title='Admin'
              />

              <ScrollToTop />

              <section className='section section--main-content'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <h4 className='is-size-4 has-text-weight-bold mt75 has-text-centered'>
                        Admin
                      </h4>
                    </div>
                  </div>

                  <div className='mt20 has-text-centered'>
                    <Link
                      className='button is-small is-info is-outlined has-fat-icons mt20'
                      to={routes.CONTRACTS_PAGE}
                    >
                      Contracts
                    </Link>
                  </div>

                </div>
              </section>

            </div>
          )
        }
      }
    )
  )
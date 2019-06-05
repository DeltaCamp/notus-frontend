import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { IsAuthed } from '~/components/IsAuthed'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'

export const DiscoverEventsPage =
  IsAuthed(
    graphql(currentUserQuery, { name: 'currentUserData' })(
      class _DiscoverEventsPage extends Component {
        state = {
          searchValue: ''
        }

        handleSearchInputChange = (e) => {
          e.preventDefault()

          this.setState({
            searchValue: e.target.value
          })
        }

        render () {
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
                        Discover Events
                      </h4>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-12 col-sm-8 col-start-sm-3 col-md-6 col-start-md-4 col-lg-6 col-start-lg-4'>
                      <form className='form is-inverse'>
                        <div className='field mt20'>
                          <input
                            type='text'
                            placeholder='Search ...'
                            value={this.state.searchValue}
                            onChange={this.handleSearchInputChange}
                            className='input is-ma-centered has-text-centered'
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-12 has-text-centered mt50'>
                      <div className='mt30'>
                        <DiscoverEventsListing
                          searchValue={this.state.searchValue}
                        />
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

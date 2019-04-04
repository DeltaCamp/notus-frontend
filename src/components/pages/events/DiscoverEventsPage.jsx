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

export const DiscoverEventsPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _DiscoverEventsPage extends PureComponent {
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

    handleEventType = (e) => {
      e.preventDefault()

      return <Redirect to={routes.NEW_EVENT} param={e.target.value} />
    }

    buttonColor = (id) => {
      const classes =[
        'is-link',
        'is-primary',
        'is-purple',
        'is-success',
        'is-danger',
        'is-warning'
      ]

      return classes[id % classes.length - 1]
    }

    render () {
      if (this.state.redirect) {
        return <Redirect to={routes.SIGNIN} />
      }

      const eventTypes = [
        ['ERC20 Token Transfer', 1],
        ['ERC721 NFT Minting', 2],
        ['Ether Transfer', 3],
        ['Price of ether ... ?', 4],
        ['Something something MakerDAO CDP', 5],
        ['PoolTogether', 6]
      ].map((value) => (
        <button key={value[1]} className={`button ${this.buttonColor(value[1])}`}>
          {value[0]}
        </button>
      ))

      return (
        <div className='is-positioned-absolutely'>
          <Helmet
            title='Discover Events'
          />

          <ScrollToTop />

          <section className='section section--main-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-6 col-start-sm-4 has-text-centered'>
                  <h4 className='is-size-4 has-text-weight-bold mt75'>
                    What type of event?
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
                <div className='col-xs-12 has-text-centered'>

                  <div class="md:tw-flex md:tw-justify-between xl:tw-justify-around xl:tw-mx-8 md:tw-mb-8">
                    <div class="skill-card is-laravel tw-relative tw-rounded-lg md:tw-rounded-none tw-mb-6 md:tw-mb-0 md:tw-mx-2 lg:tw-mx-0 tw-flex md:tw-flex-col">
                      <div class="skill-card-top tw-text-center tw-py-3 tw-pl-8 tw-pr-6 md:tw-px-8 tw-rounded-lg tw-relative">
                        <h4 class="tw-text-lg tw-leading-tight tw-text-center tw-tracking-tight">
                          <a href="/skills/test" class="tw-text-white hover:tw-text-white link" style={{'text-shadow': 'rgba(0, 0, 0, 0.2) 0px 1px 2px'}}>
                            Test
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                        

                  {eventTypes}
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

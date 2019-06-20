import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'

export const FourOhFour = class _FourOhFour extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='404 Page Not Found'
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <p className='mt50'>
                  <button
                    onClick={this.context.router.history.goBack}
                    className='button is-small is-dark'
                  >
                    {'<'} Back
                  </button>
                </p>

                <br />
                <br />

                <h6 className='is-size-7'>
                  Four "Uh-Oh" Four ...
                </h6>

                <h3 className='is-size-3'>
                  We couldn't find that ...
                </h3>
                <h5 className='is-size-5 has-text-grey-light'>
                  Nothing lives at '{this.props.location.pathname}'
                </h5>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}

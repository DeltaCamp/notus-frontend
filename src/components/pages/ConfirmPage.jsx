import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { get } from 'lodash'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const confirmPageQuery = gql`
  query confirmPageQuery($dappUserId: String!) {
    dappUser(dappUserId: $dappUserId) @client
  }
`

export const ConfirmPage = graphql(confirmPageQuery, {
  skip: (props) => !get(props, 'match.params.dappUserId'),
  options: (props) => {
    const dappUserId = get(props, 'match.params.dappUserId')
    return {
      variables: {
        dappUserId
      }
    }
  }
})(class _ConfirmPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      confirming: true
    }
  }

  render () {
    const { dappUserId, requestKey } = this.props.match.params

    const { data } = this.props
    const { loading, error } = data || {}

    console.log(data)

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
                <p className='content'>
                  <button
                    onClick={this.context.router.history.goBack}
                    className='button is-monospaced is-text has-text-weight-bold back-button has-underline-border'
                  >
                    {'<'} Back
                  </button>
                </p>

                <p>
                  Confirming your subscription....
                </p>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
})

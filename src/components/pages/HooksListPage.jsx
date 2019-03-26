import React, { PureComponent } from 'react'
import { RegisterWebhookForm } from '~/components/hooks/RegisterWebhookForm'
import { FooterContainer } from '~/components/layout/Footer'
import { findLast } from 'lodash'

export const HooksListPage = class _HooksListPage extends PureComponent {
  render () {
    // const heroColor = 'is-link'

    const hookTx = findLast(this.props.data.transactions, tx => {
      return (
        tx.contractName === 'Notus' &&
        tx.method === 'registerWebhook'
      )
    })

    return (
      <div className='is-positioned-absolutely'>
        <section className='section section--main-content has-bg'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <h1 className='is-size-1 has-text-grey-dark is-uppercase has-text-weight-bold has-text-centered'>
                  Create Hook:
                </h1>
                <br />

                <RegisterWebhookForm hookTx={hookTx} />

                {/* <CodeBox /> */}
                {/* <p>
                  <a href='https://docs.zeppelinos.org' target='_blank' rel='noopener noreferrer'>See Hook Docs &gt;</a>
                </p> */}
                <h5 className='is-size-5 has-text-grey-dark is-uppercase has-text-weight-bold'>
                  Your Hooks
                </h5>
                <br />

              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}

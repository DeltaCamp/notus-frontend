import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import { graphql, withApollo } from 'react-apollo'

import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { notusToast } from '~/utils/notusToast'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { TextInput } from '~/components/TextInput'
import { updateUserMutation } from '~/mutations/updateUserMutation'

const debug = require('debug')('notus:SettingsPage')

export const SettingsPage =
withApollo(
  graphql(updateUserMutation, { name: 'updateUserMutation' })(
    graphql(currentUserQuery, { name: 'currentUserQuery' })(
      class _SettingsPage extends Component {

        updateUser = async (userDto) => {
          return this.props.updateUserMutation({
            variables: {
              user: userDto
            }
          })
        }

        onSubmitName = async (name) => {
          this.updateUser({
            name
          }).then(() => {
            notusToast.success('Updated name')
          })
        }

        onSubmitEtherscanApiKey = async (apiKey) => {
          this.updateUser({
            etherscan_api_key: apiKey
          }).then(() => {
            notusToast.success('Updated Etherscan API Key')
          })
        }

        render () {

          let name = ''
          let etherscan_api_key = ''
          const { currentUser } = this.props.currentUserQuery

          let form = <span></span>

          if (currentUser) {
            name = currentUser.name || ''
            etherscan_api_key = currentUser.etherscan_api_key || ''

            form =
              <div className='card-content'>
                <form
                  onSubmit={this.handlePasswordReset}
                  className='form is-tall'
                >

                  <div className='field mt15'>
                    <label htmlFor='newsletter' className='label'>Name</label>
                    <TextInput
                      value={name}
                      handleSubmit={this.onSubmitName}
                      placeholder='Name' />
                  </div>

                  <div className='field mt15'>
                    <label htmlFor='newsletter' className='label'>Etherscan API Key</label>
                    <TextInput
                      value={etherscan_api_key}
                      handleSubmit={this.onSubmitEtherscanApiKey}
                      placeholder='Etherscan API Key' />
                  </div>

                </form>
              </div>
          }

          return (
            <div className='is-positioned-absolutely'>
              <Helmet
                title='Settings'
              />

              <ScrollToTop />

              <section className='section section--main-content has-no-top-padding pb50'>
                <div className='container'>
                  <div className='row'>
                    <div className='column col-xtra-wide-touch col-xs-12 col-lg-8 col-start-lg-3 col-xl-6 col-start-xl-4'>
                      <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-extrabold mt30'>
                        Settings
                      </h1>

                      <section className='card has-bg has-shadow has-shadow-big mt30'>
                        <CSSTransition
                          timeout={600}
                          classNames='accordion'
                          in={!!currentUser}
                        >
                          {state => form}
                        </CSSTransition>
                      </section>
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
)
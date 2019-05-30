import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ReactTimeout from 'react-timeout'
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
      ReactTimeout(class _SettingsPage extends Component {
        state = {
          canSend: true
        }

        updateUser = async (userDto) => {
          return this.props.updateUserMutation({
            variables: {
              user: userDto
            }
          })
        }

        handleSubmitName = async (name) => {
          this.updateUser({
            name
          }).then(() => {
            notusToast.success('Updated name')
          })
        }

        handleSubmitEtherscanApiKey = async (apiKey) => {
          this.updateUser({
            etherscan_api_key: apiKey
          }).then(() => {
            notusToast.success('Updated Etherscan API Key')
          })
        }

        handleReSendConfirmation = (e) => {
          e.preventDefault()

          if (!this.state.canSend) {
            return
          }

          this.setState({ canSend: false })

          // only show this if they need to be confirmed
          // run API call

          notusToast.info('Sent new confirmation link to your email')

          // prevent them from clicking over and over
          this.props.setTimeout(() => {
            this.setState({ canSend: true })
          }, 5000)
        }

        render () {
          let name,
            email,
            etherscan_api_key

          const { currentUser } = this.props.currentUserQuery

          let form = <span></span>

          if (currentUser) {
            debug(currentUser)
            
            email = currentUser.email || ''
            name = currentUser.name || ''
            etherscan_api_key = currentUser.etherscan_api_key || ''

            form =
              <div className='card-content'>
                <form
                  className='form is-tall is-inverse'
                >
                  <div className='field'>
                    <label
                      htmlFor='email-input'
                      className='label'
                    >
                      Email
                    </label>
                    <TextInput
                      id='email-input'
                      value={email}
                      // handleSubmit={this.handleSubmitEmail}
                      placeholder='Email'
                      disabled
                    />
                    <span className='hint'>
                      <button
                        className='button is-text is-xsmall'
                        onClick={this.handleReSendConfirmation}
                        disabled={!this.state.canSend}
                      >
                        Re-send Confirmation Email
                      </button>
                    </span>
                  </div>

                  <div className='field'>
                    <label
                      htmlFor='name-input'
                      className='label'
                    >
                      Name
                    </label>
                    <TextInput
                      id='name-input'
                      value={name}
                      handleSubmit={this.handleSubmitName}
                      placeholder='Name'
                    />
                  </div>

                  <div className='field mt15'>
                    <label
                      htmlFor='etherscanApiKey-input'
                      className='label'
                    >
                      Etherscan API Key
                    </label>
                    <TextInput
                      id='etherscanApiKey-input'
                      value={etherscan_api_key}
                      handleSubmit={this.handleSubmitEtherscanApiKey}
                      placeholder='Etherscan API Key (Optional)'
                    />
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

                      <section className='card mt30'>
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
      })
    )
  )
)
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
import { MatcherForm } from '~/components/recipes/MatcherForm'
import { DappSelect } from '~/components/DappSelect'
import { createEventTypeMutation } from '~/mutations/createEventTypeMutation'

export const NewRecipePage = graphql(currentUserQuery, { name: 'currentUserData' })(
  graphql(createEventTypeMutation, { name: 'createEventTypeMutation' })(
    class _NewRecipePage extends PureComponent {
      state = {}

      static propTypes = {
        match: PropTypes.object.isRequired
      }

      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      constructor (props) {
        super(props)
        this.state = {
          dapp: {},
          name: '',
          matchers: []
        }
      }

      componentWillMount() {
        const { currentUser } = this.props.currentUserData

        if (!currentUser) {
          toast.error('Please sign in to access this page.')
          this.setState({ redirect: true })
        }
      }

      addMatcher = () => {
        this.setState({
          matchers: this.state.matchers.concat([{}])
        })
      }

      onChangeMatcher = (index, matcher) => {
        const matchers = this.state.matchers.slice()
        matchers[index] = matcher;
        this.setState({
          matchers
        })
      }

      onChangeApp = (dapp) => {
        this.setState({ dapp })
      }

      create = () => {
        this.props.createEventTypeMutation({
          variables: {
            eventType: this.state
          }
        })
          .then(response => console.log(response))
          .catch(error => console.error(error))
      }

      render () {
        if (this.state.redirect) {
          return <Redirect to={routes.SIGNIN} />
        }

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='New Recipe'
            />

            <ScrollToTop />

            <section className='section section--main-content'>
              <div className='container'>
                <div className='form'>
                  <div className='field'>
                    <div className='control'>
                      <label className='label'>
                        App
                      </label>
                      <DappSelect
                        value={this.state.dapp}
                        onChange={this.onChangeApp}
                        />
                    </div>
                  </div>
                  <div className='field'>
                    <div className='control'>
                      <label className='label'>
                        Recipe Name
                      </label>
                      <input
                        className='input'
                        type='text'
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})} />
                    </div>
                  </div>

                  {this.state.matchers.map((matcher, index) => {
                    return (
                      <MatcherForm
                        key={`matcher-${index}`}
                        variables={this.state.variables}
                        matcher={matcher}
                        onChange={(matcher) => this.onChangeMatcher(index, matcher)}
                        />
                    )
                  })}

                  <button onClick={this.addMatcher} className='button'>
                    Add Matcher
                  </button>
                </div>
              </div>
              <button onClick={this.create} className='button'>
                Create Recipe
              </button>
            </section>

            <FooterContainer />
          </div>
        )
      }
    }
  )
)

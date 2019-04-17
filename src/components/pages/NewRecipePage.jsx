import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { MatcherForm } from '~/components/recipes/MatcherForm'
import { AppSelect } from '~/components/AppSelect'
// import { createRecipeMutation } from '~/mutations/createRecipeMutation'

export const NewRecipePage = graphql(currentUserQuery, { name: 'currentUserData' })(
  // graphql(createRecipeMutation, { name: 'createRecipeMutation' })(
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
          app: {},
          name: '',
          matchers: []
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

      onChangeApp = (app) => {
        this.setState({ app })
      }

      create = () => {
        // this.props.createRecipeMutation({
        //   variables: {
        //     recipe: this.state
        //   }
        // })
        //   .then(response => console.log(response))
        //   .catch(error => console.error(error))
      }

      render () {
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
                      <AppSelect
                        value={this.state.app}
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
  // )
)

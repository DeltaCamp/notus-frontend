import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from '~/components/App'
import * as serviceWorker from './serviceWorker'
import './index.scss'
import { apolloClient } from '~/apollo/apolloClient'

window.addEventListener('load', async () => {
  try {
    let coreApp =
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </ApolloProvider>

    ReactDOM.render(coreApp, document.getElementById('root'))
  } catch (error) {
    console.error(error)
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

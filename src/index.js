import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

import { apolloClient } from '~/apollo/apolloClient'
import { App } from '~/components/App'
import { AppErrorBoundary } from '~/components/AppErrorBoundary'
import * as serviceWorker from './serviceWorker'

import 'react-toastify/dist/ReactToastify.css'
import './index.scss'

import 'animate.css/animate.min.css'

window.debug = require('debug')

window.addEventListener('load', async () => {
  try {
    const client = await apolloClient()

    let coreApp =
      <AppErrorBoundary>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </AppErrorBoundary>

    ReactDOM.render(coreApp, document.getElementById('root'))
  } catch (error) {
    console.error(error)
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

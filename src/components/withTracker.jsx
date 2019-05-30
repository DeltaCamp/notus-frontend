import React, { Component } from 'react'
import ReactGA from 'react-ga'

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(
    process.env.REACT_APP_GA_TRACKING_ID, {
      debug: true 
    }
  )
}

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    if (process.env.REACT_APP_GA_TRACKING_ID) {
      ReactGA.set({
        page,
        ...options
      })
      ReactGA.pageview(page)
    }
  }

  return class _withTracker extends Component {
    componentDidMount() {
      const page = this.props.location.pathname + this.props.location.search
      trackPage(page)
    }

    componentDidUpdate(prevProps) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search
      const nextPage =
        this.props.location.pathname + this.props.location.search

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

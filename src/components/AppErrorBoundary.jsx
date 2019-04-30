import { Component } from 'react'
import { rollbar } from '~/../config/rollbar'

export const AppErrorBoundary = class extends Component {
  // this.state = {
  //   error: null,
  //   errorInfo: null
  // }

  componentDidCatch (error, errorInfo) {
    rollbar.error(error)

    // Rollbar.configure(
    //   {
    //     enabled: true,
    //     captureIp: 'anonymize',
    //     payload: {
    //       person: {
    //         id: 12345
    //       }
    //     }
    // )

    // // Catch errors in any components below and re-render with error message
    // this.setState({
    //   error: error,
    //   errorInfo: errorInfo
    // })
  }

  render () {
    // if (this.state.errorInfo) {
    //   return (
    //     <div>Something went wrong: ${this.state.errorInfo}</div>
    //   )
    // }
    return this.props.children
  }
}

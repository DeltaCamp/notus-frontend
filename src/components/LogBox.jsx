import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PageDetailsLoader } from '~/components/PageDetailsLoader'
import { ErrorMessage } from '~/components/ErrorMessage'

export class LogBox extends Component {
  static propTypes = {
    ipfsHash: PropTypes.string.isRequired
  }

  state = {
      loading: true,
      error: '',
      logs: []
  }

  ws = null;

  componentDidMount() {
    const { ipfsHash } = this.props
    const wsUrl = `${process.env.REACT_APP_WS_API_URL}/ipfsHash/${ipfsHash}`
 
    this.ws = new WebSocket(wsUrl)
    this.ws.addEventListener('open', () => {
        this.setState({
            loading: false
        })
    })
    this.ws.addEventListener('message', ({ data }) => {
        const { logs } = this.state;

        const now = new Date();

        this.setState({
            logs: [
                ...logs,
                `${now.toLocaleTimeString()}: ${data}`
            ]
        })
    })

    this.ws.addEventListener('error', (err) => {
        this.setState({
            loading: false,
            error: 'WebSocket connection failed'
        })
    })
  }

  componentWillUnmount() {
    if (this.ws) {
        this.ws.close();
        this.ws = null;
    }
  }

  render () {
    const { loading, error, logs } = this.state

    if (loading) {
      return <PageDetailsLoader />
    }

    if (error) {
      return <ErrorMessage errorMessage='Websocket connection failed' />
    }

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <code className='code code--example'>
            {logs.length < 1 && 
              <>
                <span >Waiting for logs...</span>
                <br />
              </>
            }
            {logs.map((log, i) => {
              return (
                <div key={i}>
                  <span >{log}</span>
                  <br />
                </div>
              )
            })}
          </code>
        </div>
      </div>  
    )
  }
}

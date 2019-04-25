import React, { Component} from 'react'
import {
  GitBranch,
  GitCommit,
  GitMerge,
} from 'react-feather'
import Vivus from 'vivus'

export class CustomActions extends Component {

  componentDidMount() {
    new Vivus(
      'git-branch',
      {
        duration: 60, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'git-commit',
      {
        delay: 60, duration: 80, type: 'delayed', animTimingFunction: Vivus.EASE_OUT
      }
    )
    new Vivus(
      'git-merge',
      {
        delay: 100, duration: 120, type: 'delayed', animTimingFunction: Vivus.EASE_OUT
      }
    )
  }

  render() {
    return (
      <div className='container-fluid is-purple has-text-white pb100 pt100 color-block has-bg has-bg__dark is-positioned-relatively'>
        <div className='container pb100 pt100'>
          <div className='row pt50'>
            <div className='col-xs-12 col-md-8 col-start-md-3'>
              <GitBranch id='git-branch' className='is-large' />
              <GitCommit id='git-commit' className='is-large ml30' />
              <GitMerge id='git-merge' className='is-large ml30' />
              <br />
              <br />
  
              <h4 className='is-size-3 has-text-weight-bold'>
                Custom Actions
              </h4>
              
              <br />
  
              <h5 className='is-size-5'>
                Trigger actions when an event occurs.  Use webhooks to send a Slack message, update an Oracle, or whatever you desire.
              </h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

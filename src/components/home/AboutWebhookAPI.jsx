import React, { Component} from 'react'
import {
  GitBranch,
  GitCommit,
  GitMerge,
} from 'react-feather'
import Vivus from 'vivus'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

export class AboutWebhookAPI extends Component {

  componentDidMount() {
    // new Vivus(
    //   'zap',
    //   {
    //     duration: 200, pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'trending',
    //   {
    //     delay: 20, duration: 100, type: 'oneByOne', pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'ffwd',
    //   {
    //     delay: 50, duration: 140, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'mail',
    //   {
    //     delay: 55, duration: 200, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )


    // new Vivus(
    //   'twitter',
    //   {
    //     delay: 60, duration: 100, type: 'sync', pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'facebook',
    //   {
    //     duration: 200, type: 'oneByOne', animTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'instagram',
    //   {
    //     delay: 75, duration: 250, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'slack',
    //   {
    //     delay: 150, duration: 300, type: 'delayed', pathTimingFunction: Vivus.EASE_OUT
    //   }
    // )
    // new Vivus(
    //   'message-circle', {
    //     duration: 100, type: 'delayed'
    //   }
    // )
    // new Vivus(
    //   'send',
    //   {
    //     duration: 100, type: 'delayed'
    //   }
    // )

    // new Vivus(
    //   'smartphone',
    //       {
    //     duration: 100, type: 'delayed'
    //   }
    // )
    // new Vivus(
    //   'watch',
    //   {
    //     duration: 100, type: 'delayed'
    //   }
    // )


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
  
              <h4 className='is-size-4 has-text-weight-bold'>
                If it has an API ...
              </h4>
              <h6 className='is-size-6'>
                ... you can connect Notus to it.
              </h6>
              <br />
  
              <p>
                Use Notus' webhook feature to have any event trigger your own custom code.
              </p>
  
              <br />
              <br />
  
              <Link
                className='button is-small is-light'
                to={routes.SIGNUP}
              >
                Read About Integrations
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

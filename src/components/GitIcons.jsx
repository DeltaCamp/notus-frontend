import React, { PureComponent } from 'react'
import {
  GitBranch,
  GitCommit,
  GitMerge,
} from 'react-feather'
import Vivus from 'vivus'

export class GitIcons extends PureComponent {
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

  render () {
    return (
      <>
        <GitBranch id='git-branch' className='is-large' />
        <GitCommit id='git-commit' className='is-large ml30' />
        <GitMerge id='git-merge' className='is-large ml30' />
      </>
    )
  }
}
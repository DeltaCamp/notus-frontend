import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'
import { ZosCodeSnippet } from '~/components/ZosCodeSnippet'
import { ResearcherLink } from '~/components/ResearcherLink'
import { GitHubLink } from '~/components/GitHubLink'
import { GithubProfileImage } from '~/components/GithubProfileImage'
import { ChallengeRow } from '~/components/packages/ChallengeRow'
import { VouchButton } from '~/components/packages/VouchButton'
import { VouchRow } from '~/components/packages/VouchRow'
import { projectPackageEvents } from '~/projections/projectPackageEvents'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { challengeProjection } from '~/projections/challengeProjection'

export class PackageDetails extends Component {
  state = { voted: false }

  static propTypes = {
    metadata: PropTypes.object.isRequired,
    vouching: PropTypes.object.isRequired,
    registeredEvent: PropTypes.object.isRequired
  }

  render () {
    const { metadata, vouching, registeredEvent } = this.props
    const { parsedLog } = registeredEvent || {}
    const { values } = parsedLog || {}
    const githubDetails = ''
    // const githubDetails = gh(values.metadataURI || '')
    const { owner, repo } = githubDetails
    const { id } = values || {}
    const challenges = challengeProjection(vouching.allEvents)
    const noChallenges = challenges.length === 0

    const { name } = metadata || {}

    return (
      <>
        <div className='row reverse-column-order'>
          <div className='col-xs-12 col-md-7'>
            <h1 className='title is-size-1 has-text-weight-normal'>
              {name}

              <span className='package-item--version has-text-grey has-text-weight-light'>
                v{metadata.version}
              </span>
            </h1>

            <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
              Maintained by <ResearcherLink address={values.owner} shorten />
            </h6>

            <p className='is-size-6 package-item--description'>
              {metadata.description}
            </p>
          </div>

          <div className='col-xs-12 col-start-md-8 col-md-5 has-text-right--desktop'>
            <div className='package-item--image'>
              <GithubProfileImage user={owner} />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <h5 className='is-size-5'>
              Link this package:
            </h5>
            <div className='code-wrapper'>
              <ZosCodeSnippet packageName={name} />
              <GitHubLink
                url={`https://github.com/${repo}`}
                viewLink
                cssClassNames='is-text has-extra-margin'
              />
            </div>
          </div>
        </div>

      </>
    )
  }
}

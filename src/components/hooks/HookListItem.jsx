import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { ethers } from 'ethers'
import { get } from 'lodash'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ShortText } from '~/components/ShortText'
import { HookListItemLoader } from '~/components/hooks/HookListItemLoader'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import * as routes from '~/../config/routes'

export const HookListItem = ReactTimeout(
  class _HookListItem extends PureComponent {
    state = {}

    static propTypes = {
      webhookEvent: PropTypes.object.isRequired
    }

    componentDidMount() {
      this.props.setTimeout(() => {
        this.setState({ startAnimating: true })
      }, 200)

      // const { ipfsHash } = this.props.hookValues
      // // console.log('this.props.hookValues', this.props.hookValues)
      // // console.log(ipfsHash)

      // let ipfsHashUtf8
      // const ipfsHashAsHex = this.props.hookValues.ipfsHash

      // try {
      //   ipfsHashUtf8 = ethers.utils.toUtf8String(ipfsHashAsHex)
      //   this.setState({ ipfsHashUtf8 })
      //   // console.log('ipfsHashUtf8', ipfsHashUtf8)
      //   // 0x61383536343431343334342e3334323736
      // } catch (error) {
      //   console.warn(error)
      // }
    }

    render() {
      if (!this.props.hookValues.ipfsHash) {
        return null
      }
      console.log('ipfsHash', this.props.hookValues.ipfsHash)

      // if (!this.props.webhookEvent.parsedLog.values.ipfsHash) { return }

      const link = 'asdf'

      const animatingCssClassNames = classnames(
        'fade-in',
        'slide-up',
        'medium',
        {
          'slide-up-enter': this.state.startAnimating,
          'fade-in-enter': this.state.startAnimating
        }
      )

      return (
        <div className="list-item-container">
          <div className="list-item">
            <span
              className={`
                ${animatingCssClassNames}
                list-item__cell
                list-item__cell--id
                has-text-grey
                has-text-weight-light
              `}
            >
              <Link
                to={link}
                className="no-select title is-size-4 has-text-weight-normal"
              >
                #{this.props.index + 1} &nbsp;
              </Link>
            </span>

            <span
              className={`
            ${animatingCssClassNames}
            list-item__cell
            list-item__cell--image
          `}
            >
              <Link to={link} className="no-select">
                IMG
                {/* <GithubProfileImage user={owner} /> */}
              </Link>
            </span>

            <span
              className={`
            ${animatingCssClassNames}
            list-item__cell
            list-item__cell--title
          `}
            >
              <Link to={link} className="no-select">
                <h4 className="is-size-4 has-text-weight-normal is-inline-grid-top">
                  <span className="package-item--version has-text-grey has-text-weight-light is-size-5" />
                </h4>

                <p className="is-size-6 description is-inline-grid-bottom has-text-grey" />
              </Link>
            </span>

            {/*
        <ZosCodeSnippet packageName={get(metadata, 'name')} />

        <button
          className={classnames(
            'package-item--github-icon',
            'is-text',
            'button',
            'fade-in',
            'slide-up',
            'medium',
            {
              'slide-up-enter': this.state.startAnimating,
              'fade-in-enter': this.state.startAnimating
            }
          )}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()

            // this should be coming from the json data
            const url = `https://github.com/${repo}`

            this.handleGitHubLinkClick(url)
          }}
        >
          <AntdIcon type={GithubFill} className='antd-icon' />
        </button>
        */}

            <span className="list-item__cell list-item__cell--blank">
              <Link to={link} className="no-select">
                &nbsp;
              </Link>
            </span>

            <span
              className={`
          ${animatingCssClassNames}
          list-item__cell
          list-item__cell--view-more
          has-text-right
        `}
            >
              <Link to={link} className="no-select list-item--view-grid">
                <span className="has-text-info is-size-6 is-monospaced">
                  View More &gt;
                </span>

                <span className="list-item--view-grid">
                  <h6 className="subtitle is-size-7 list-item--subtitle is-monospaced">
                    VOUCHED
                  </h6>
                  icon
                  <h3 className="is-inline-block is-size-3 has-text-weight-light list-item--num-tokens" />
                  {/*
                <span
                  to={link}
                  className='is-block list-item--challenges-link'
                >
                  {challenges}
                </span>
              */}
                  <span className="has-text-info is-size-6 is-monospaced list-item--view-more-link">
                    View More&gt;
                  </span>
                </span>
              </Link>
            </span>
          </div>
        </div>
      )
    }
  }
)

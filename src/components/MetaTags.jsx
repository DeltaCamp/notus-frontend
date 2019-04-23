import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export const MetaTags = class _MetaTags extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    location: {}
  }

  render () {
    const location = this.props.location || {}

    const logoPath = '/none.svg'
    const siteTitle = 'Notus for Ethereum'
    const siteURL = 'https://notus.netlify.com.com'
    const siteDescription = `Notus enables you to listen in on Ethereum and receive notifications in response. Whether it's token transfers or contract activity, Notus has your back.`
    const twitterHandle = 'teamdeltacamp'
    const ownerCoName = 'Delta Camp'
    const author = 'Delta Camp & Jake Caban-Tomski'
    const keywords = 'deltacamp delta camp notus ethereum smart contract notifications'
    const themeColor = '#ffffff'
    const googleFontsURL = 'https://fonts.googleapis.com/css?family=Vollkorn:300,400,500,700|Roboto+Mono:300,400,700,900'
    const year = (new Date()).getFullYear()

    return (
      <Helmet
        titleTemplate={`%s | ${siteTitle}`}
        defaultTitle={siteTitle}
        htmlAttributes={{
          'lang': 'en'
        }}
        link={
          [
            {
              href: googleFontsURL,
              rel: 'stylesheet'
            }
          ]
        }
        meta={[
          {
            name: 'theme-color',
            content: themeColor
          },
          {
            name: 'description',
            content: siteDescription
          },
          {
            name: 'keywords',
            content: keywords
          },
          {
            name: 'author',
            content: author
          },
          {
            name: 'copyright',
            content: `© ${year} ${ownerCoName}`
          },
          {
            property: 'og:title',
            content: siteTitle
          },
          {
            property: 'og:description',
            content: siteDescription
          },
          {
            property: 'og:site_name',
            content: siteTitle
          },
          {
            property: 'og:url',
            content: `${siteURL}${location.pathname}`
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:image',
            content: `${siteURL}${logoPath}`
          },
          {
            property: 'twitter:title',
            content: siteTitle
          },
          {
            property: 'twitter:card',
            content: 'summary'
          },
          {
            property: 'twitter:site',
            content: `@${twitterHandle}`
          },
          {
            property: 'twitter:image',
            content: `${siteURL}${logoPath}`
          },
          {
            property: 'twitter:url',
            content: `https://twitter.com/${twitterHandle}`
          }
        ]}
      />
    )
  }
}

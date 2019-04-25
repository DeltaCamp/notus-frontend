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

    const facebookShareImage = 'facebook_share_image_1200x630.png'
    const twitterShareImage = 'twitter_share_image_800_418.png'
    const siteTitle = 'Notus for Ethereum'
    const siteURL = 'https://www.notus.network'
    const siteDescription = `Notus enables you to listen in on Ethereum and receive notifications in response. Whether it's token transfers or contract activity, Notus has your back.`
    const twitterHandle = 'NotusEvents'
    const ownerCoName = 'Notus'
    const author = 'Notus'
    const keywords = 'deltacamp delta camp notus ethereum smart contract notifications'
    const themeColor = '#ffffff'
    const googleFontsURL = 'https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,700,900'
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
            content: `${siteURL}/${facebookShareImage}`
          },
          {
            property: 'og:rich_attachment',
            content: `true`
          },
          {
            property: 'twitter:title',
            content: siteTitle
          },
          {
            property: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            property: 'twitter:site',
            content: `@${twitterHandle}`
          },
          {
            property: 'twitter:image:src',
            content: `${siteURL}/${twitterShareImage}`
          },
          {
            property: 'twitter:url',
            content: `https://twitter.com/${twitterHandle}`
          },
          {
            property: 'twitter:creator',
            content: `@${twitterHandle}`
          }
        ]}
      />
    )
  }
}

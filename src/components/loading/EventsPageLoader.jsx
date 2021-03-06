import React from 'react'
import ContentLoader from 'react-content-loader'

export const EventsPageLoader = () => {
  return <ContentLoader height='200'>
    <rect x="0" y="58" rx="5" ry="5" width="120" height="100" />
    <rect x="138" y="58" rx="5" ry="5" width="120" height="100" />
    <rect x="278" y="58" rx="5" ry="5" width="120" height="100" />
  </ContentLoader>
}

import React from 'react'
import { EnsName } from '~/components/EnsName'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'

export const ResearcherLink = function ({ address, shorten = false, className = 'has-hover-border' }) {
  let content = <EnsName address={address} shorten={shorten} />

  return (
    <EtherscanAddressLink address={address} className={className}>
      {content}
    </EtherscanAddressLink>
  )
}

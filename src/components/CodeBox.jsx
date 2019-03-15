import React, { PureComponent } from 'react'

export const CodeBox = class _CodeBox extends PureComponent {
  render () {
    return (
      <code className='code code--example'>
        <span className='has-text-grey'>></span> {`notusClient.update({ `} <span className='has-text-success'>address: <span className='has-text-info'>'0xfa...'</span>, email: <span className='has-text-info'>'subscriber@email.com'</span></span> })
      </code>
    )
  }
}

import React, { PureComponent } from 'react'

export const AddressInput = class _AddressInput extends PureComponent {
  render () {
    const value = this.props.matcher.operand

    return <input
      placeholder='0x0000000000000000000000000000000000000000'
      className='input'
      type='text'
      value={value}
      autoFocus
      style={{ maxWidth: 200, width: ((value.length + 1) * 16) }}
      data-tip={value.length > 16 ? value : ''}
    />
  }
}

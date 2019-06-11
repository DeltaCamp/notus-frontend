import React, { PureComponent } from 'react'
import ReactTooltip from 'react-tooltip'
import { PropTypes } from 'prop-types'
import { HelpCircle } from 'react-feather'

export const Help = class _Help extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  render () {
    const { text, id } = this.props

    return <>
      <HelpCircle
        data-tip={text}
        data-html
        className='is-xsmall is-cursor-pointer'
      />
      <ReactTooltip
        id={`help-circle-${id}`}
        place='top'
        effect='solid'
      />
    </>
  }
}

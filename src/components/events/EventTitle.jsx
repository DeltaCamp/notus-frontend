import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'

import { KEYS } from '~/constants'

const DEFAULT_TITLE = 'Click to title this event'
const TITLE_MIN_LENGTH = 8

export const EventTitle = ReactTimeout(class extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    handleSubmitTitle: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    const newTitle = this.props.event.title && this.props.event.title.length
      ? this.props.event.title
      : ''

    this.state = {
      isEditing: false,
      newTitle
    }
  }

  componentDidUpdate = () => {
    this.props.setTimeout(ReactTooltip.rebuild)
  }

  handleEditTitle = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: true
    }, () => {
      this.refs.inputRef.setSelectionRange(
        0,
        this.refs.inputRef.value.length
      )
    })
  }

  showErrorTooltip = () => {
    ReactTooltip.show(ReactDOM.findDOMNode(this.refs.errorTooltip))
  }

  hideErrorTooltip = () => {
    ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.errorTooltip))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.newTitle.length <= TITLE_MIN_LENGTH) {
      this.showErrorTooltip()
      return false
    }

    this.props.handleSubmitTitle(this.state.newTitle)

    this.handleCancel()
  }

  handleChange = (e) => {
    e.preventDefault()

    if (e.target.value === '') {
      this.setState({
        newTitle: e.target.value
      })
    } else {
      let newTitle
      const titleRegEx = /^[a-z0-9- '()]+$/i
      newTitle = titleRegEx.test(e.target.value)
        ? e.target.value 
        : this.state.newTitle

      this.hideErrorTooltip()

      this.setState({
        newTitle
      })
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.handleCancel()
    }
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
      newTitle: this.state.newTitle
    })
  }

  render () {
    let content = (
      <button
        className='event-box__variable event-box__variable--full-width is-inline-block event-box__variable event-box__variable--full-width is-inline-block is-size-4 is-truncated'
        onClick={this.handleEditTitle}
      >
        {this.props.event.title || DEFAULT_TITLE}
      </button>
    )

    if (this.state.isEditing) {
      content = (
        <form
          onSubmit={this.handleSubmit}
          className='form is-inline-block'
          onKeyUp={this.handleKeyUp}
        >
          <div
            ref='errorTooltip'
            data-tip={`Please enter at least ${TITLE_MIN_LENGTH} characters for the event title.`}
          />

          <input
            type='text'
            ref='inputRef'
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.newTitle}
            className='input is-size-4'
            autoFocus
          />
        </form>
      )
    }

    return content
  }
}

)

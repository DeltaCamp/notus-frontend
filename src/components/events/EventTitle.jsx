import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'

import { KEYS } from '~/constants'

const DEFAULT_TITLE = 'New Event - Give this event a title'
const TITLE_MIN_LENGTH = 8

export const EventTitle = ReactTimeout(class extends Component {
  static propTypes = {
    handleSubmitTitle: PropTypes.func.isRequired
  }

  // esc key should revert
  // mouse clickable checkbox and x to revert ?
  // select all works but then can't backspace?

  constructor (props) {
    super(props)

    const newTitle = this.props.event.title && this.props.event.title.length
      ? this.props.event.title
      : ''

    this.state = {
      isEditing: false,
      newTitle
    }

    this.inputRef = React.createRef()
  }

  componentDidUpdate = () => {
    this.props.setTimeout(ReactTooltip.rebuild)
  }

  handleEditTitle = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: true
    }, () => {
      this.inputRef.current.setSelectionRange(
        0,
        this.inputRef.current.value.length
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

    const titleRegEx = /^[a-z0-9- '()]+$/i
    const isValid = titleRegEx.test(e.target.value)

    this.hideErrorTooltip()

    if (isValid) {
      this.setState({
        newTitle: e.target.value
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
      newTitle: ''
    })
  }

  render () {
    let content = (
      <button
        className='event-box__variable'
        onClick={this.handleEditTitle}
      >
        {this.props.event.title || DEFAULT_TITLE}
      </button>
    )

    if (this.state.isEditing) {
      content = (
        <form
          onSubmit={this.handleSubmit}
          className='form'
          onKeyUp={this.handleKeyUp}
        >
          <div
            ref='errorTooltip'
            data-tip={`Please enter at least ${TITLE_MIN_LENGTH} characters for the event title.`}
          />

          <input
            type='text'
            ref={this.inputRef}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.newTitle}
            className='input'
            autoFocus
          />
        </form>
      )
    }

    return (
      <div
        className='event-box__variable-wrapper'
      >
        {content}
      </div>
    )
  }
}

)

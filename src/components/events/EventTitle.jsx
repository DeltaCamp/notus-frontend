import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { KEYS } from '~/constants'

const DEFAULT_TITLE = 'New Event - Give this event a title'

export class EventTitle extends Component {
  static propTypes = {
    handleSubmitTitle: PropTypes.func.isRequired
  }

  // esc key should revert
  // mouse clickable checkbox and x to revert ?
  // select all works but then can't backspace?

  constructor(props) {
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

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.newTitle.length <= 5) {
      console.error('need more than 5 chars!')
      return false
    }

    this.props.handleSubmitTitle(this.state.newTitle)

    this.handleCancel()
  }

  handleChange = (e) => {
    e.preventDefault()

    const titleRegEx = /^[a-z0-9- '()]+$/i
    const isValid = titleRegEx.test(e.target.value)

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

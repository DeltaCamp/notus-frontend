import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    
    const newEventTitle = this.props.event.title && this.props.event.title.length
      ? this.props.event.title
      : ''
    
    this.state = {
      isEditing: false,
      newEventTitle
    }
    this.inputRef = React.createRef()
  }

  handleEditTitle = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: !this.state.isEditing
    }, () => {
      this.inputRef.current.setSelectionRange(
        0,
        this.inputRef.current.value.length
      )
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.newEventTitle.length <= 5) {
      console.error('need more than 5 chars!')
      return false
    }

    this.props.handleSubmitTitle(this.state.newEventTitle)

    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  handleChange = (e) => {
    e.preventDefault()

    const titleRegEx = /^[a-z0-9- '()]+$/i
    const isValid = titleRegEx.test(e.target.value)

    if (isValid) {
      this.setState({
        newEventTitle: e.target.value
      })
    }
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
        <form onSubmit={this.handleSubmit} className='form'>
          <input
            type='text'
            ref={this.inputRef}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.newEventTitle}
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

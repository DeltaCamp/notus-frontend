import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export class EventTitle extends Component {
  state = {
    newEventTitle: '',
    isEditing: false
  }

  static propTypes = {
    handleSubmitTitle: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  handleEditTitle = (e) => {
    e.preventDefault()

    this.setState({
      newEventTitle: this.props.event.title,
      isEditing: !this.state.isEditing
    }, () => {
      this.inputRef.current.setSelectionRange(
        0,
        this.inputRef.current.value.length
      )
    })
  }

  // esc key reverts
  // mouse check and x ?


  handleSubmit = (e) => {
    e.preventDefault()

    this.props.handleSubmitTitle(this.state.newEventTitle)

    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  handleChange = (e) => {
    e.preventDefault()

    const titleRegEx = /^[a-z0-9- '()]+$/i

    if (titleRegEx.test(e.target.value)) {
      this.setState({
        newEventTitle: e.target.value
      })
    }
  }

  render () {
    let content = (
      <button
        className={classnames(
          `event-box__variable`,
          {
            'is-active': this.props.isActive
          }
        )}
        onClick={this.handleEditTitle}
      >
        {this.props.event.title}
      </button>
    )

    if (this.state.isEditing) {
      content = (
        <form onSubmit={this.handleSubmit} className='form'>
          <input
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
        className={classnames(
          `event-box__variable-wrapper`,
          {
            'is-active': this.props.isActive
          }
        )}
      >
        {content}
      </div>
    )
  }
    
  // let matchers
  // if (brief) {
  //   const matcher = event.matchers[0]
  //   let ellipses
  //   if (event.matchers.length > 1) {
  //     ellipses = <span>&nbsp;...</span>
  //   }
  //   matchers =
  //     <span key='matcher'>
  //       <MatcherTitle matcher={matcher} isFirst={true} />
  //       {ellipses}
  //     </span>
  // } else {
  //   matchers = event.matchers.map((matcher, index) => {
  //     return <MatcherTitle key={`matcher-${index}`} matcher={matcher} isFirst={index === 0} />
  //   })
  // }

  // return (
  //   <>
  //     <FrequencyTitle frequency={event.frequency} key='frequency-title' />&nbsp;
  //     <SourceDescription event={event} key='source-description' />&nbsp;
  //     occurs&nbsp;
  //     {matchers} then send me an email
  //   </>
  // )
}










// export const EventTitle = function ({ event, brief = false }) {
//   if (event.title)
//     return event.title

//   let matchers
//   if (brief) {
//     const matcher = event.matchers[0]
//     let ellipses
//     if (event.matchers.length > 1) {
//       ellipses = <span>&nbsp;...</span>
//     }
//     matchers =
//       <span key='matcher'>
//         <MatcherTitle matcher={matcher} isFirst={true} />
//         {ellipses}
//       </span>
//   } else {
//     matchers = event.matchers.map((matcher, index) => {
//       return <MatcherTitle key={`matcher-${index}`} matcher={matcher} isFirst={index === 0} />
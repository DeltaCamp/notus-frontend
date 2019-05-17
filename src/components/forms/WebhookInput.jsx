import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { KEYS } from '~/constants'
import { SourceSelect } from '~/components/SourceSelect'
import InputTrigger from '~/components/forms/InputTrigger'

export const WebhookInput =
  class _WebhookInput extends PureComponent {
      static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        isTextarea: PropTypes.bool.isRequired,
        className: PropTypes.string,
        placeholder: PropTypes.string
      }

      static defaultProps = {
        isTextarea: true,
        className: 'textarea webhook-body',
        placeholder: `{
  "transactionValue": "{{transaction.value}}"												
}`
      }
    
      state = {
        draftValue: undefined,
        editing: false,
        showSelect: false
      }
    
      constructor (props) {
        super(props)
        this.inputRef = React.createRef();
        this.inputTriggerRef = React.createRef()
      }
    
      onChange = (e) => {
        this.setState({
          draftValue: e.target.value
        })
      }
    
      submit = () => {
        const value = this.state.draftValue
        if (value !== undefined && value !== this.props.value) {
          this.setState({
            draftValue: undefined,
            editing: false
          }, () => {
            this.props.onChange(value)
          })
        }
      }
    
      onTriggerSourceSelect = (event) => {
        this.setState({
          trigger: event,
          showSelect: true
        })
      }
    
      onChangeSource = (source) => {
        const str = source.value + "}}"
        const cursorEnd = this.cursorEnd()
        this.setState({
          showSelect: false,
          draftValue: this.insertString(str, str.length)
        }, () => {
          if (this.inputTriggerRef.current) {
            this.inputTriggerRef.current.resetState()
          }
          if (this.inputRef) {
            this.inputRef.selectionStart = cursorEnd + str.length
            this.inputRef.selectionEnd = cursorEnd + str.length
            this.inputRef.focus()
          }
        })
      }
    
      onEscape = () => {
        this.setState({
          draftValue: undefined,
          editing: false
        }, () => {
          if (this.inputRef) {
            this.inputRef.blur()
          }
        })
      }
    
      onKeyUpSource = (e) => {
        if (e.keyCode === KEYS.escape) {
          e.stopPropagation()
          e.preventDefault()
          this.inputRef.focus()
          this.setState({
            showSelect: false
          }, () => {
            if (this.inputTriggerRef.current) {
              this.inputTriggerRef.current.resetState()
            }
            if (this.inputRef) {
              this.inputRef.focus()
            }
          })
        }
      }
    
      cursorEnd = () => {
        if (this.inputRef) {
          return this.inputRef.selectionEnd
        }
        return 0
      }
    
      insertString = (str) => {
        if (this.state.draftValue === undefined) { return }
        if (!this.inputRef) {
          console.log('no ref')
          return
        }
        const inputRef = this.inputRef
        let start = inputRef.selectionStart;
        let end = inputRef.selectionEnd;
        const value = this.state.draftValue.substring(0, start) + str + this.state.draftValue.substring(end)
        return value
      }
    
      handleBlur = (e) => {
        if (this.state.showSelect) {
          return
        }
        this.submit()
      }
    
      handleKeyDown = (e) => {
        if (e.keyCode === KEYS.escape) {
          e.preventDefault();
          this.onEscape()
        } else if (e.keyCode === KEYS.tab) {
          e.preventDefault();
          const cursorEnd = this.cursorEnd()
          this.setState({
            draftValue: this.insertString("\t")
          }, () => {
            this.inputRef.selectionStart = cursorEnd + 1
            this.inputRef.selectionEnd = cursorEnd + 1
          })
        }
      }
    
      handleClick = () => {
        if (this.state.editing) { return }
        this.setState({
          editing: true,
          draftValue: this.props.value
        })
      }
    
      render () {
    
        const selectStyle = {
          position: 'absolute',
          top: this.state.trigger ? this.state.trigger.cursor.top : 0,
          left: this.state.trigger ? this.state.trigger.cursor.left : 0
        }
    
        let value = this.props.value
        if (this.state.draftValue !== undefined) {
          value = this.state.draftValue
        }

        let input
        if (this.props.isTextarea) {
          input = <textarea
            className={this.props.className}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            value={value}
            onChange={this.onChange}
            ref={(ref) => this.inputRef = ref }
            placeholder={this.props.placeholder}
          />
        } else {
          input = <input
            className={this.props.className}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            value={value}
            onChange={this.onChange}
            ref={(ref) => this.inputRef = ref }
            placeholder={this.props.placeholder}
          />
        }
    
        return (
          <div className='field'>
            <div className='control'>
              <div style={{ position: 'relative' }}>
                {this.state.showSelect &&
                  <div style={selectStyle}>
                    <SourceSelect
                      className='testing'
                      menuIsOpen={true}
                      onChange={this.onChangeSource}
                      onKeyDown={this.onKeyUpSource}
                      clearable={false}
                      escapeClearsValue={true} />
                  </div>
                }
                <InputTrigger
                  trigger={{ string: '{{' }}
                  onStart={this.onTriggerSourceSelect}
                  ref={this.inputTriggerRef}>
                  
                  {input}
                  
                </InputTrigger>
              </div>
            </div>
          </div>
        )
      }
    }

import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

export class Drawer extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render () {
    return (
      <CSSTransition
        timeout={300}
        classNames='drawer'
        in={this.props.show}
      >
        {state => (
          <>          
            <div className='drawer has-bg__dark'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-md-10 col-start-md-2 has-text-centered'>
                    <div className='mt10'>
                      
                      {this.props.children}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* this needs to be at the bottom or it takes the <CSSTransition/> classes */}
            <div
              className={`drawer__clickbox ${this.props.show ? 'is-active' : null}`}
              onClick={this.props.onClose}
            />
          </>
        )}
      </CSSTransition>
    )
  }
}
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle } from 'react-feather'

import { Modal } from '~/components/Modal'
import { ContractForm } from '~/components/forms/ContractForm'
import { AbiEventSelect } from '~/components/AbiEventSelect'
import { ScopeSelect } from '~/components/ScopeSelect'
import { Drawer } from '~/components/Drawer'
import {
  SCOPES
} from '~/constants'

export class EditEventDrawer extends PureComponent {
  static propTypes = {
    event: PropTypes.object.isRequired,
    onChangeScope: PropTypes.func.isRequired,
    onChangeAbiEvent: PropTypes.func.isRequired,
    onCreateAbi: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      showAddContract: false
    }
  }

  showAddContract = (e) => {
    e.preventDefault()
    this.setState({
      showAddContract: true
    })
  }

  hideAddContract = () => {
    this.setState({
      showAddContract: false
    })
  }

  handleOnCreateAbi = (abi) => {
    this.setState({
      showAddContract: false
    })
    this.props.onCreateAbi(abi)
  }

  render () {
    let abiEventSelect, addContract

    if (this.props.event.scope === SCOPES.CONTRACT_EVENT) {
      abiEventSelect =
        <AbiEventSelect
          placeholder='Choose an existing contract ...'
          value={this.props.event.abiEventId}
          onChange={this.props.onChangeAbiEvent}
          className='is-wide has-margin-right-auto'
        />
      addContract = <button
        onClick={this.showAddContract}
        className='button is-pink is-outlined'
      >
        Or Add a New Contract
      </button>
    }

    return (
      <>
        <Modal
          isOpen={this.state.showAddContract}
          handleClose={this.hideAddContract}
          isLarge={true}
        >
          {
            this.state.showAddContract && 
            <ContractForm
              onCancel={this.hideAddContract}
              onCreate={this.handleOnCreateAbi}
            />
          }
        </Modal>
        <Drawer
          show={this.props.isOpen}
          onClose={this.props.onClose}
        >
          <form className='form drawer-form'>
            <div className='buttons'>
              <ScopeSelect
                value={this.props.event.scope}
                onChange={this.props.onChangeScope}
              />
              {abiEventSelect}
            </div>
            {addContract}

            <div className='buttons'>
              <button
                className='button has-icon has-stroke-green'
                onClick={this.props.onClose}
              >
                <CheckCircle
                  className='icon__button has-stroke-green'
                />
              </button>
            </div>
          </form>
        </Drawer>
      </>
    )
  }
}
import React, { PureComponent, Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { filter, sortBy } from 'lodash'

import { Help } from '~/components/Help'
import { ScrollToTop } from '~/components/ScrollToTop'
import { TextInput } from '~/components/TextInput'
import { MetaDataTypeSelect } from '~/components/admin/forms/MetaDataTypeSelect'
import { AbiEventVisibleButton } from '~/components/contracts/AbiEventVisibleButton'
// import { AbiEventInputVisibleButton } from '~/components/contracts/AbiEventInputVisibleButton'
import { PublishButton } from '~/components/contracts/PublishButton'
import { ColorBlock } from '~/components/forms/ColorBlock'
import { FormBanner } from '~/components/forms/FormBanner'
import { FooterContainer } from '~/components/layout/Footer'
import { ContractPageLoader } from '~/components/loading/ContractPageLoader'
import { contractQuery } from '~/queries/contractQuery'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:components:ContractPage')

const AbiEventRows = class _AbiEventRows extends PureComponent {

  static propTypes = {
    abiEvents: PropTypes.array.isRequired,
    contract: PropTypes.object.isRequired,
    abiEventInputsVisibleState: PropTypes.array.isRequired,
    handleToggleAbiEventVisible: PropTypes.func.isRequired,
    handleSubmitAbiEventTitle: PropTypes.func.isRequired,
    handleSubmitAbiEventInputTitle: PropTypes.func.isRequired,
    handleMetaDataTypeChange: PropTypes.func.isRequired,
    toggleInputs: PropTypes.func.isRequired,
  }

  render () {
    const { 
      abiEvents,
      contract,
      abiEventInputsVisibleState,
      handleToggleAbiEventVisible,
      handleSubmitAbiEventTitle,
      handleSubmitAbiEventInputTitle,
      handleMetaDataTypeChange,
      toggleInputs,
    } = this.props

    if (abiEvents.length === 0) {
      return (
        <div className='grid-table__body__column is-light has-text-centered is-size-6 has-text-weight-bold'>
          {/* colSpan='4' */}
          No Events exist for this ABI.
        </div>
      )
    } else {
      return abiEvents.map(abiEvent => 
        <AbiEventRow
          key={`abi-event-row-${abiEvent.id}`}
          abiEvent={abiEvent}
          contract={contract}
          handleToggleAbiEventVisible={handleToggleAbiEventVisible}
          handleSubmitAbiEventTitle={handleSubmitAbiEventTitle}
          handleSubmitAbiEventInputTitle={handleSubmitAbiEventInputTitle}
          handleMetaDataTypeChange={handleMetaDataTypeChange}
          toggleInputs={toggleInputs}
          abiEventInputsVisibleState={abiEventInputsVisibleState}
        />
      )
    }
  }

}

const AbiEventRow = class _AbiEventRow extends PureComponent {

  static propTypes = {
    abiEvent: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
    handleToggleAbiEventVisible: PropTypes.func.isRequired,
    handleSubmitAbiEventTitle: PropTypes.func.isRequired,
    handleSubmitAbiEventInputTitle: PropTypes.func.isRequired,
    handleMetaDataTypeChange: PropTypes.func.isRequired,
    toggleInputs: PropTypes.func.isRequired,
    abiEventInputsVisibleState: PropTypes.array.isRequired
  }

  render() {
    const {
      abiEvent,
      contract,
      handleSubmitAbiEventTitle,
      handleToggleAbiEventVisible,
      handleSubmitAbiEventInputTitle,
      handleMetaDataTypeChange,
      toggleInputs,
      abiEventInputsVisibleState
    } = this.props

    return (
      <>
        <div className='grid-table__row'>
          <div className='grid-table__body__column'>
            {abiEvent.name}
          </div>
          <div className='grid-table__body__column grid-table__column-2 form'>
            {/* colSpan='2' */}
            <div className='field'>
              <TextInput
                id={`abi-event-${abiEvent.id}-title`}
                value={abiEvent.title}
                handleSubmit={(newTitle) => {
                  handleSubmitAbiEventTitle(abiEvent.id, newTitle)
                }}
              />
            </div>
          </div>
          <div
            className='grid-table__body__column has-text-centered mobile--has-text-left'
          >
            <AbiEventVisibleButton
              abiEvent={abiEvent}
              contract={contract}
              handleToggleAbiEventVisible={handleToggleAbiEventVisible}
            />
          </div>
          <div
            className='grid-table__body__column has-text-right'
          >
            <button
              className='button is-xsmall is-transparent'
              onClick={(e) => {
                e.preventDefault()
                toggleInputs(abiEvent.id)
              }}
            >
              {abiEventInputsVisibleState.includes(abiEvent.id) ? 'Hide' : 'Show'} inputs
            </button>
          </div>
        </div>

        <AbiEventInputRows
          abiEvent={abiEvent}
          abiEventInputsVisibleState={abiEventInputsVisibleState}
          handleSubmitAbiEventInputTitle={handleSubmitAbiEventInputTitle}
          handleMetaDataTypeChange={handleMetaDataTypeChange}
        />
      </>
    )
  }
}

const AbiEventInputRows = class _AbiEventInputRows extends PureComponent {

  static propTypes = {
    abiEvent: PropTypes.object.isRequired,
    abiEventInputsVisibleState: PropTypes.array.isRequired,
    handleSubmitAbiEventInputTitle: PropTypes.func.isRequired,
    handleMetaDataTypeChange: PropTypes.func.isRequired,
  }

  render () {
    const {
      abiEvent,
      abiEventInputsVisibleState,
      handleSubmitAbiEventInputTitle,
      handleMetaDataTypeChange
    } = this.props

    let inputs = abiEvent.abiEventInputs
    inputs = sortBy(inputs, input => input.id)

    if (inputs.length === 0) {
      return (
        <div className='grid-table__row'>
          <div className='grid-table__body__column'>
            {/* colSpan='5' */}
            <span className='is-size-6 has-text-weight-bold'>
              No Inputs exist for this ABI Event.
            </span>
          </div>
        </div>
      )
    } else {
      const inputRows = inputs.map(input => (
        <AbiEventInputRow
          key={`abi-event-input-row-${input.id}`}
          input={input}
          handleSubmitAbiEventInputTitle={handleSubmitAbiEventInputTitle}
          handleMetaDataTypeChange={handleMetaDataTypeChange}
        />
      ))

      const className = abiEventInputsVisibleState.includes(abiEvent.id) ? '' : 'is-hidden'

      return (
        <>
          <div
            className={`grid-table__row ${className}`}
          >
            <div className='grid-table__body__column grid-table__body__column--full-width is-dark'>
              {/* colSpan='5' */}
              {/* <div className='grid-table is-transparent is-fullwidth'> */}
                <div className='grid-table__row'>
                  <div className='grid-table__head__column'>
                    <span className='has-text-weight-normal has-text-lighter'>
                      Name <Help
                        id={`abi-event-input-name-${abiEvent.id}`}
                        text='The name this ABI Event was given when imported.'
                      />
                    </span>
                  </div>
                  <div className='grid-table__head__column grid-table__column-2'>
                    <span className='has-text-weight-normal has-text-lighter'>
                      Title <Help
                        id={`abi-event-input-title-${abiEvent.id}`}
                        text={`The text you and others will see for this ABI Event on Notus.<br />Click to rename this.`}
                      />
                    </span>
                  </div>
                  <div className='grid-table__head__column'>
                    <span className='has-text-weight-normal has-text-lighter'>
                      Type
                    </span>
                  </div>
                  <div className='grid-table__head__column'>
                    <span className='has-text-weight-normal has-text-lighter'>
                      MetaData Type
                    </span>
                  </div>
                </div>

                {inputRows}
              {/* </div> */}
            </div>
          </div>
        </>
      )
    }
  }

}

const AbiEventInputRow = class _AbiEventInputRow extends PureComponent {

  static propTypes = {
    input: PropTypes.object.isRequired,
    handleSubmitAbiEventInputTitle: PropTypes.func.isRequired,
    handleMetaDataTypeChange: PropTypes.func.isRequired,
  }

  render () {
    const {
      input,
      handleSubmitAbiEventInputTitle,
      handleMetaDataTypeChange
    } = this.props

    return <div className='grid-table__row'>
      <div className='grid-table__body__column'>
        {input.name}
      </div>
      <div className='grid-table__body__column grid-table__column-2 form'>
        <div className='field'>
          <TextInput
            id={`abi-event-input-${input.id}-title`}
            value={input.title}
            handleSubmit={(newTitle) => {
              handleSubmitAbiEventInputTitle(input.id, newTitle)
            }}
          />
        </div>
      </div>
      <div className='grid-table__body__column'>
        {input.type}
      </div>
      <div className='grid-table__body__column'>
        {input.type === 'uint256' && (
          <MetaDataTypeSelect
            abiEventInputId={parseInt(input.id, 10)}
            value={input.metaType}
            handleMetaDataTypeChange={handleMetaDataTypeChange}
          />
        )}
      </div>
    </div>
  }
}

export const ContractPage = class _ContractPage extends Component {
  state = {
    abiEventInputsVisible: []
  }

  handleTogglePublish = (contract) => {
    const { currentUser } = this.props

    if (currentUser && !currentUser.confirmedAt) {
      notusToast.info(`You will need to confirm your ${currentUser.email} email address before you can publish this contract.`)
      this.props.history.push(routes.ACCOUNT_SETTINGS)
      return
    }

    const isPublic = !contract.isPublic
    const contractDto = {
      id: contract.id,
      isPublic
    }

    this.doGenericUpdateContract(contractDto, `Contract now ${isPublic ? 'useable by everyone.' : 'useable only by you.'}`)
  }

  handleToggleAbiEventVisible = (abiEvent) => {
    const isPublic = !abiEvent.isPublic
    const abiEventDto = {
      id: abiEvent.id,
      isPublic
    }

    this.doGenericUpdateAbiEvent(abiEventDto, `ABI Event now ${isPublic ? 'visible.' : 'hidden.'}`)
  }

  doGenericUpdateAbiEvent = (abiEventDto, successMessage = 'AbiEvent updated.') => {
    debug('doGenericUpdateAbiEvent: ', abiEventDto)

    return this.props.updateAbiEventMutation({
      variables: {
        abiEvent: abiEventDto
      },
      refetchQueries: this.queriesToRefetch()
    }).then(() => {
      notusToast.success(successMessage)
    }).catch(error => {
      console.error(error)
      showErrorMessage(error)
    })
  }

  queriesToRefetch = () => {
    const { contractData } = this.props || {}

    return [
      // only refetch the contract we just updated (1 record)
      'contractsQuery',
      {
        query: contractQuery,
        variables: ({ id: parseInt(contractData.contract.id, 10) })
      }
    ]
  }

  doGenericUpdateContract = (contractDto, successMessage = 'Contract updated.') => {
    debug('doGenericUpdateContract: ', contractDto)

    return this.props.updateContractMutation({
      variables: {
        contract: contractDto
      },
      refetchQueries: this.queriesToRefetch()
    }).then(() => {
      notusToast.success(successMessage)
    }).catch(error => {
      console.error(error)
      showErrorMessage(error)
    })
  }

  handleMetaDataTypeChange = (abiEventInput) => {
    const variables = {
      abiEventInput
    }

    this.props.updateAbiEventInputMutation({
      variables,
      refetchQueries: this.queriesToRefetch()
    }).then(({ data }) => {
      notusToast.success('ABI Event Input MetaData Type updated successfully.')
    }).catch(error => {
      console.warn(error)

      error = {
        message: `Incorrect MetaDataType? (${error.message})`
      }

      showErrorMessage(error)
    })
  }

  handleSubmitAbiEventTitle = (abiEventId, newTitle) => {
    const variables = {
      abiEvent: {
        id: abiEventId,
        title: newTitle
      }
    }

    this.props.updateAbiEventMutation({
      variables,
      refetchQueries: this.queriesToRefetch()
    }).then(({ data }) => {
      notusToast.success('ABI Event Title updated successfully.')
    }).catch(error => {
      console.warn(error)

      error = {
        message: `Error updating ABI Event title (${error.message})`
      }

      showErrorMessage(error)
    })
  }

  handleSubmitAbiEventInputTitle = (abiEventInputId, newTitle) => {
    const variables = {
      abiEventInput: {
        id: abiEventInputId,
        title: newTitle
      }
    }

    this.props.updateAbiEventInputMutation({
      variables,
      refetchQueries: this.queriesToRefetch()
    }).then(({ data }) => {
      notusToast.success('ABI Event Title updated successfully.')
    }).catch(error => {
      console.warn(error)

      error = {
        message: `Error updating ABI Event Input title (${error.message})`
      }

      showErrorMessage(error)
    })
  }

  toggleInputs = (abiEventId) => {
    let { abiEventInputsVisible } = this.state
    
    if (abiEventInputsVisible.includes(abiEventId)) {
      abiEventInputsVisible = filter(abiEventInputsVisible, 
        (id) => (abiEventId !== id)
      )
    } else {
      abiEventInputsVisible.push(abiEventId)
    }

    this.setState({
      abiEventInputsVisible
    })
  }

  render () {
    let contract,
      abiEvents

    const { contractData } = this.props
    const { loading, error } = contractData || {}

    if (error) {
      console.error(error)
      return (
        <h5 className='is-size-5 has-text-danger pt100 has-text-centered'>
          There was an error fetching this contract. {error.message}
        </h5>
      )
    }

    if (loading) {
      return <ContractPageLoader />
    }

    contract = contractData.contract || {}
    abiEvents = contract.abi?.abiEvents || []
    abiEvents = sortBy(abiEvents, event => event.id)

    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='Contracts'
        />

        <ScrollToTop />

        <section className='section section--main-content pb100'>
          <FormBanner 
            backgroundColor='#4a8594'
          >
            <div className='row'>
              <div className='col-xs-12 col-sm-6'>
                <h6 className='is-size-6 has-text-weight-semibold has-text-lighter'>
                  Editing existing Contract "{contract.name}"
                </h6>
              </div>
              <div className='col-xs-12 col-sm-6 is-left-aligned-mobile has-text-right'>
                <h6 className='is-size-7 has-text-lighter'>
                  <a
                    href={`https://etherscan.io/address/${contract.address}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='has-text-lighter'
                  >View on Etherscan</a>
                </h6>
              </div>
            </div>
          </FormBanner>

          <ColorBlock
            backgroundColor='#4a8594'
            brightnessPercent={60}
            columnSizing='col-xs-12 col-sm-9 col-lg-8'
          >
            <PublishButton
              contract={contract}
              handleTogglePublish={this.handleTogglePublish}
            />
          </ColorBlock>

          <ColorBlock
            backgroundColor='#4a8594'
            brightnessPercent={40}
            columnSizing='col-xs-12'
          >
            <h6 className='is-size-6 has-text-weight-semibold has-text-lighter'>
              ABI Events:
            </h6>
            <br />

            <div className='grid-table is-transparent is-fullwidth'>
              <div className='grid-table__row'>
                <div className='grid-table__head__column'>
                  Name <Help
                    id='abi-event-name'
                    text='The name this ABI Event was given when imported.'
                  />
                </div>
                <div className='grid-table__head__column grid-table__column-2'>
                  {/* colSpan='2' */}
                  Title <Help
                    id='abi-event-title'
                    text={`The text you and others will see for this ABI Event on Notus.<br />Click to rename this.`}
                  />
                </div>
                <div className='grid-table__head__column has-text-centered mobile--has-text-left'>
                  Visible
                </div>
                <div className='grid-table__head__column'>
                  &nbsp;
                </div>
              </div>

              <AbiEventRows
                // why do we need this to force re-render when state changes?
                key={new Date()}
                abiEvents={abiEvents}
                contract={contract}
                handleToggleAbiEventVisible={this.handleToggleAbiEventVisible}
                handleSubmitAbiEventTitle={this.handleSubmitAbiEventTitle}
                handleSubmitAbiEventInputTitle={this.handleSubmitAbiEventInputTitle}
                handleMetaDataTypeChange={this.handleMetaDataTypeChange}
                toggleInputs={this.toggleInputs}
                abiEventInputsVisibleState={this.state.abiEventInputsVisible}
              />
            </div>
          </ColorBlock>
        </section>

        <FooterContainer />
      </div>
    )
  }
}
import React, { PureComponent } from 'react'
import { ErrorMessage } from '~/components/ErrorMessage'
import { HookListItem } from '~/components/hooks/HookListItem'
import { HookListItemLoader } from '~/components/hooks/HookListItemLoader'

export const HooksList = class HooksList extends PureComponent {
  componentDidUpdate (prevProps, prevState, snapshot) {
    const events = this.eventsFromProps(this.props)
    // const { client } = this.props

    console.log('events',events)
    console.log(this.props.hooks)

    // Promise.all(
    //   events.map(event => {
    //     const ipfsHash = event.parsedLog.values.ipfsHash
    //     return (
    //       client.query({ query: notusQueries.notusQuery, variables: { ipfsHash: ipfsHash.toString() } })
    //         .then(result => {
    //           console.log('.then(result => {', result)
    //           // return {
    //           //   id,
    //           //   totalVouched: result.data.Notus.entry.totalVouched
    //           // }
    //         })
    //     )
    //   })
    // ).then((results) => {
    //   console.log('(results)', results)
    //   // var totalVouches = results.reduce((accumulator, result) => {
    //   //   accumulator[result.id] = result.totalVouched
    //   //   return accumulator
    //   // }, {})

    //   // this.setState({
    //   //   totalVouches
    //   // })
    // })
  }

  eventsFromProps (props) {
    const { hooks } = props
    const { Notus } = hooks || {}

    return (Notus ? Notus.allEvents : []) || []
  }

    // TODO: This should filter out Unregistered webhooks!
  render () {
    const { loading, error } = this.props.data || {}
    let content

    const packageListLoader =
      <>
        <HookListItemLoader key='package-item-fragment-0' />
        <HookListItemLoader key='package-item-fragment-1' />
        <HookListItemLoader key='package-item-fragment-2' />
      </>

    if (error) {
      return <ErrorMessage errorMessage={error} />
    }

    const events = this.eventsFromProps(this.props)

    if (loading) {
    // if (loading || Object.keys(this.state.totalVouches).length !== events.length) {
      content = packageListLoader
    } else {
      // const sortedEvents = events.sort((a, b) => {
      //   const ipfsHashA = a.parsedLog.values.ipfsHash
      //   const ipfsHashB = b.parsedLog.values.ipfsHash
      //   return this.totalVouched(ipfsHashA).cmp(this.totalVouched(ipfsHashB))
      //   // return this.totalVouched(ipfsHashA).cmp(this.totalVouched(ipfsHashB))
      // })
      const sortedEvents = events

      content = (
        <>
          {
            sortedEvents.map((e, index) => {
              let item
              const hookValues = e.parsedLog.values
              const webhookEvent = e

              item = (
                <React.Fragment key={`hook-fragment-${index}`}>
                  <HookListItem
                    hookValues={hookValues}
                    webhookEvent={webhookEvent}
                    index={index}
                    location={this.props.location}
                    key={`hook-${index}`}
                  />
                </React.Fragment>
              )

              return item
            })
          }
        </>
      )
    }

    return (
      <>
        {content}
      </>
    )
  }
}

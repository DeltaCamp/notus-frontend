import React, { PureComponent } from 'react'
import { ethers } from 'ethers'
import { get } from 'lodash'
import { Query, graphql, withApollo } from 'react-apollo'
import { ErrorMessage } from '~/components/ErrorMessage'
import { HookListItem } from '~/components/hooks/HookListItem'
import { HookListItemLoader } from '~/components/hooks/HookListItemLoader'
import { velcroQueries } from '~/queries/velcroQueries'
import { web3Queries } from '~/queries/web3Queries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'

export const HooksList = graphql(web3Queries.networkAccountQuery, { name: 'networkAccount' })(
  graphql(
    velcroQueries.ownerQuery,
    {
      name: 'hooks',
      skip: (props) => !props.networkAccount.account || !props.networkAccount.networkId,
      options: (props) => ({
        variables: {
          address: props.networkAccount.account
        }
      })
    }
  )(
    withApollo(class HooksList extends PureComponent {
      componentDidUpdate (prevProps, prevState, snapshot) {
        const events = this.eventsFromProps(this.props)
        const { client } = this.props

        console.log(this.props.hooks)

        // Promise.all(
        //   events.map(event => {
        //     const ipfsHash = event.parsedLog.values.ipfsHash
        //     return (
        //       client.query({ query: velcroQueries.velcroQuery, variables: { ipfsHash: ipfsHash.toString() } })
        //         .then(result => {
        //           console.log('.then(result => {', result)
        //           // return {
        //           //   id,
        //           //   totalVouched: result.data.Velcro.entry.totalVouched
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
        const { Velcro } = hooks || {}

        return (Velcro ? Velcro.allEvents : []) || []
      }

      // totalVouched (id) {
      //   return this.state.totalVouches[id]
      //     ? ethers.utils.bigNumberify(this.state.totalVouches[id].toString())
      //     : ethers.utils.bigNumberify('0')
      // }

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
          const sortedEvents = events.slice(0, 3)

          content = (
            <>
              {
                sortedEvents.map((e, index) => {
                  let item
                  const hookValues = e.parsedLog.values
                  const webhookEvent = e

                  // console.log('broken', e, index)
                  // 0x516d62587731515351534d334755597171467855624c58356153724832616133647063715567694b4d5139353342

                  item = (
                    <React.Fragment key={`hook-fragment-${index}`}>
                      <span>{index}</span>

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
    })
  )
)
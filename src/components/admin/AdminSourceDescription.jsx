import React, { PureComponent } from 'react'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import { getNounArticle } from '~/utils/getNounArticle'
import { graphql } from 'react-apollo'

import { abiEventQuery } from '~/queries/abiEventQuery'
import { SCOPES, SCOPE_LABELS } from '~/constants'

export const SourceDescription = graphql(abiEventQuery, {
  name: 'abiEventQuery',
  skip: (props) => (
    !props.event.abiEventId
  ),
  options: (props) => {
    return {
      variables: {
        id: props.event.abiEventId
      }
    }
  }
})(
  ReactTimeout(class _SourceDescription extends PureComponent {

    componentDidUpdate() {
      this.props.setTimeout(ReactTooltip.rebuild)
    }

    render() {
      let title,
        nounArticle
      // let abiEventId = event.abiEventId

      // if (event.scope === SCOPES.CONTRACT_EVENT) {
      //   if (event.abiEvent) {
      //     abiEventId = event.abiEvent.id
      //   }
      // }

      const {
        abiEventQuery,
        event,
        handleStartEdit
      } = this.props

      title = SCOPE_LABELS[event.scope]

      // When we're on a custom contract ABI scope, use the abiEvent's
      // abi name and name instead
      if (
        event.scope === SCOPES.CONTRACT_EVENT
        && (abiEventQuery && !abiEventQuery.loading)
      ) {
        const { abiEvent, error } = abiEventQuery

        if (error) {
          console.error(error)
          title = '...'
        } else {
          title = `${abiEvent.abi.name} ${abiEvent.title}`
        }
      }

      nounArticle = getNounArticle(title)

      return (
        <>
          {nounArticle}
          <button
            className='event-box__variable has-react-select is-truncated'
            onClick={handleStartEdit}
            data-tip={title.length > 16 ? title : ''}
          >
            {title}
          </button>
        </>
      )
    }
    
  })
)

// import React, { PureComponent } from 'react'
// import ReactTooltip from 'react-tooltip'
// import ReactTimeout from 'react-timeout'
// import { getNounArticle } from '~/utils/getNounArticle'
// import { graphql } from 'react-apollo'

// import { abiEventQuery } from '~/queries/abiEventQuery'
// import { SCOPES, SCOPE_LABELS } from '~/constants'

// export const SourceDescription = graphql(abiEventQuery, {
//   name: 'abiEventQuery',
//   skip: (props) => (
//     !props.event.abiEventId
//   ),
//   options: (props) => {
//     return {
//       variables: {
//         id: props.event.abiEventId
//       }
//     }
//   }
// })(
//   ReactTimeout(class _SourceDescription extends PureComponent {

//     componentDidUpdate() {
//       this.props.setTimeout(ReactTooltip.rebuild)
//     }

//     render() {
//       let title,
//         nounArticle

//       const {
//         abiEventQuery,
//         event,
//         handleStartEdit
//       } = this.props

//       title = SCOPE_LABELS[event.scope]

//       if (
//         event.scope === SCOPES.CONTRACT_EVENT
//         && (abiEventQuery && !abiEventQuery.loading)
//       ) {
//         const { abiEvent, error } = abiEventQuery

//         if (error) {
//           console.error(error)
//           title = '...'
//         } else {
//           title = abiEvent.abi.name
//         }
//       }

//       nounArticle = getNounArticle(title)

//       return (
//         <>
//           <span>
//             {nounArticle}
//           </span>
//           <button
//             className='form-box__variable has-react-select is-truncated'
//             onClick={handleStartEdit}
//             data-tip={title.length > 16 ? title : ''}
//           >
//             {title}
//           </button>
//         </>
//       )
//     }
    
//   })
// )

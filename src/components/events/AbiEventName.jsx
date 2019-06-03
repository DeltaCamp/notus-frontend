// import React, { PureComponent } from 'react'
// import ReactTooltip from 'react-tooltip'
// import ReactTimeout from 'react-timeout'
// import PropTypes from 'prop-types'
// import { graphql } from 'react-apollo'

// import { abiEventQuery } from '~/queries/abiEventQuery'

// export const AbiEventName = graphql(abiEventQuery, {
//   name: 'abiEventQuery',
//   skip: (props) => (
//     !props.abiEventId
//   ),
//   options: (props) => {
//     return {
//       variables: {
//         id: props.abiEventId
//       }
//     }
//   }
// })(
//   ReactTimeout(class _AbiEventName extends PureComponent {

//     static propTypes = {
//       abiEventId: PropTypes.number.isRequired
//     }

//     componentDidUpdate() {
//       this.props.setTimeout(ReactTooltip.rebuild)
//     }

//     render() {
//       let title = '...'

//       const {
//         abiEventQuery,
//         handleStartEdit
//       } = this.props

//       if (abiEventQuery && !abiEventQuery.loading) {
//         const { abiEvent, error } = abiEventQuery

//         if (error) {
//           console.error(error)
//           return null
//         } else {
//           title = abiEvent.name
//         }
//       }

//       return (
//         <button
//           className='event-box__variable has-react-select is-truncated'
//           onClick={handleStartEdit}
//           data-tip={title.length > 16 ? title : ''}
//         >
//           {title}
//         </button>
//       )
//     }
    
//   })
// )

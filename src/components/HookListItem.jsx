// import React, { PureComponent } from 'react'
// import ReactTimeout from 'react-timeout'
// import classnames from 'classnames'
// import PropTypes from 'prop-types'
// import { get } from 'lodash'
// import { formatRoute } from 'react-router-named-routes'
// import { Link } from 'react-router-dom'
// import { Query } from 'react-apollo'
// import { ErrorMessage } from '~/components/ErrorMessage'
// import { ShortText } from '~/components/ShortText'
// import { HookListItemLoader } from '~/components/hooks/HookListItemLoader'
// import * as routes from '~/../config/routes'

// export const HookListItem = ReactTimeout(
//   class _HookListItem extends PureComponent {
//     state = {
//       downloaded: false
//     }

//     static propTypes = {
//       webhookEvent: PropTypes.object.isRequired
//     }

//     async componentDidMount () {
//     }

//     render () {
//       if (!this.props.hookValues.ipfsHash) {
//         return null
//       }

//       // console.log('ipfsHash', this.props.hookValues.ipfsHash)

//       const { ipfsHash } = this.state

//       if (!ipfsHash) {
//         return null
//       }

//       const link = formatRoute(routes.HOOK, { ipfsHash: ipfsHash })

//       const animatingCssClassNames = classnames(
//         'fade-in',
//         'slide-up',
//         'medium',
//         {
//           'slide-up-enter': this.state.startAnimating,
//           'fade-in-enter': this.state.startAnimating
//         }
//       )

//       return (
//         <div className='list-item-container'>
//           <div className='list-item'>
//             <span
//               className={`
//                 ${animatingCssClassNames}
//                 list-item__cell
//                 list-item__cell--id
//                 has-text-grey
//                 has-text-weight-light
//               `}
//             >
//               <Link
//                 to={link}
//                 className='no-select title is-size-4 has-text-weight-normal'
//               >
//                 #{this.props.index + 1} &nbsp;
//               </Link>
//             </span>

//             <span
//               className={`
//                 ${animatingCssClassNames}
//                 list-item__cell
//                 list-item__cell--title
//               `}
//             >
//               <Link to={link} className='no-select'>
//                 <h4 className='is-size-6 has-text-weight-normal is-inline-grid-top'>
//                   <span className='has-text-grey is-uppercase'>
//                     Webhook POST URL:
//                   </span>
//                   <br />
//                   <span className='is-size-6'>
//                     {get(this.state.json, 'url')}
//                   </span>
//                   <br />
//                   <br />
//                   <span className='has-text-grey is-uppercase'>
//                     Contract:
//                   </span>
//                   <br />
//                   <span className='is-size-5'>
//                     {get(this.state.json, 'query.address')}
//                   </span>
//                 </h4>
//               </Link>
//             </span>

//             <span
//               className={`
//                 ${animatingCssClassNames}
//                 list-item__cell
//                 list-item__cell--view-more
//                 has-text-right
//               `}
//             >
//               <Link to={link} className='no-select list-item--view-grid'>
//                 <span className='list-item--view-grid'>
//                   <span className='has-text-info is-size-6 is-monospaced list-item--view-more-link'>
//                     See Activity&gt;
//                   </span>
//                 </span>
//               </Link>
//             </span>
//           </div>
//         </div>
//       )
//     }
//   }
// )

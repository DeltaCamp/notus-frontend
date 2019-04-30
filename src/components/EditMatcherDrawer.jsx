// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { CheckCircle } from 'react-feather'

// import { Drawer } from '~/components/Drawer'
// // import { MatcherForm } from '~/components/recipes/MatcherForm'

// export class EditMatcherDrawer extends PureComponent {
//   static propTypes = {
//     scope: PropTypes.number,
//     abiEventId: PropTypes.number,
//     matcher: PropTypes.object,
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onChangeMatcher: PropTypes.func.isRequired
//   }

//   render () {
//     return (
//       <Drawer
//         show={this.props.isOpen}
//         onClose={this.props.onClose}
//       >
//         {this.props.matcher &&
//           <form className='form drawer-form'>
//             {/* <MatcherForm
//               matcher={this.props.matcher}
//               abiEventId={this.props.abiEventId}
//               scope={this.props.scope}
//               onChange={this.props.onChangeMatcher}
//             /> */}

//             <div className='buttons'>
//               <button
//                 className='button has-icon has-stroke-green'
//                 onClick={this.props.onClose}
//               >
//                 <CheckCircle
//                   className='icon__button has-stroke-green'
//                 />
//               </button>
//             </div>
//           </form>
//         }
//       </Drawer>
//     )
//   }
// }

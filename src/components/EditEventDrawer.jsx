// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { CheckCircle } from 'react-feather'

// import { Modal } from '~/components/Modal'
// import { ContractForm } from '~/components/forms/ContractForm'
// import { ScopeAndAbiEventSelect } from '~/components/forms/ScopeAndAbiEventSelect'
// import { Drawer } from '~/components/Drawer'

// export class EditEventDrawer extends PureComponent {
//   static propTypes = {
//     event: PropTypes.object.isRequired,
//     onChangeScopeAndAbiEventId: PropTypes.func.isRequired,
//     onCreateAbi: PropTypes.func.isRequired,
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired
//   }

//   constructor (props) {
//     super(props)
//     this.state = {
//       showAddContract: false
//     }
//   }

//   showAddContract = (e) => {
//     this.setState({
//       showAddContract: true
//     })
//   }

//   hideAddContract = () => {
//     this.setState({
//       showAddContract: false
//     })
//   }

//   handleOnCreateAbi = (abi) => {
//     this.setState({
//       showAddContract: false
//     })
//     this.props.onCreateAbi(abi)
//   }

//   render () {
//     return (
//       <>
//         <Modal
//           isOpen={this.state.showAddContract}
//           handleClose={this.hideAddContract}
//           isLarge={true}
//         >
//           {
//             this.state.showAddContract && 
//             <ContractForm
//               onCancel={this.hideAddContract}
//               onCreate={this.handleOnCreateAbi}
//             />
//           }
//         </Modal>
//         <Drawer
//           show={this.props.isOpen}
//           onClose={this.props.onClose}
//         >
//           <form className='form drawer-form'>
//             <div className='buttons'>
//               <ScopeAndAbiEventSelect
//                 scope={this.props.event.scope}
//                 abiEventId={this.props.event.abiEventId}
//                 onChangeScopeAndAbiEvent={this.props.onChangeScopeAndAbiEventId}
//                 onAddAbiEvent={this.showAddContract}
//               />
//             </div>

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
//         </Drawer>
//       </>
//     )
//   }
// }
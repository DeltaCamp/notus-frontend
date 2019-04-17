// import React, { PureComponent } from 'react'

// export const Select = class _Select extends PureComponent {

//   render() {
//     const {
//       options,
//       onChange,
//       value
//     } = this.props
//     console.log(options)

//     return (
//       <div className='field'>
//         <div className='control'>
//           <div className='select'>
//             <select
//               value={value}
//               onFocus={(e) => {
//                 onChange(e.target.value)
//               }}
//               onChange={(e) => {
//                 onChange(e.target.value)
//               }}
//             >
//               {options.map((option, index) => (
//                 <option
//                   key={`${option.value}-option-${index}`}
//                   value={option.value}
//                 >
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
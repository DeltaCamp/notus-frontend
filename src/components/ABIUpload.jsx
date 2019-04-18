import React from 'react'
import Dropzone from 'react-dropzone'

export const ABIUpload = function ({ onUpload }) {
  return (
    <Dropzone onDrop={acceptedFiles => onUpload(acceptedFiles)}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p className='abi-upload'>Upload ABI or Truffle Artifact</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
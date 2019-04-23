import React, { PureComponent } from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { extractAbi } from '~/utils/extractAbi'

export const ABIUpload = class _ABIUpload extends PureComponent {

  static propTypes = {
    onError: PropTypes.func.isRequired,
    onAbi: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  handleDrop = (acceptedFiles) => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => this.props.onError('could not load file', acceptedFiles)
    reader.onload = () => {
      const text = reader.result
      let json
      try {
        json = JSON.parse(text)
      } catch (error) {
        this.props.onError('could not parse json', acceptedFiles)
      }

      this.props.onAbi(extractAbi(json))
    }

    acceptedFiles.forEach(file => {
      reader.readAsText(file)
    })
  }

  render () {
    return (
      <Dropzone
        accept="application/json"
        multiple={false}
        onDrop={this.handleDrop}>
        {({getRootProps, getInputProps, isDragActive}) => (
          <section className={this.props.className || 'abi-upload'}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                {
                  isDragActive ? 
                    <span>Drop file here</span> : 
                    <span>Drag 'n drop or click to upload ABI or Truffle Artifact</span>
                }
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    )
  }
}
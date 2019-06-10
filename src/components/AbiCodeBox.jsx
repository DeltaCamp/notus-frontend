import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Scrollbars } from 'react-custom-scrollbars'

import { abiQuery } from '~/queries/abiQuery'

// const debug = require('debug')('notus:components:AbiCodeBox')

class ColoredScrollbars extends PureComponent {

  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 20,
      backgroundColor: `white`
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }

  render() {
    return (
      <Scrollbars
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        {...this.props} />
    );
  }
}

export const AbiCodeBox = 
  graphql(abiQuery, {
    name: 'abiData',
    skip: (props) => !props.abiId,
    options: (props) => ({
      variables: {
        id: parseInt(props.abiId, 10)
      },
      fetchPolicy: 'cache-and-network'
    })
  })(
    class _AbiCodeBox extends PureComponent {
      static propTypes = {
        abiId: PropTypes.number,
      }

      render () {
        const { abiBody, abiData } = this.props
        const abi = abiData?.abi

        return (
          <div className='code-wrapper'>
            <ColoredScrollbars autoHeight autoHide>
              <code className='code'>
                <pre>
                  {abiBody || abi?.abi || 'Choose ABI Method Above'}
                </pre>
              </code>
            </ColoredScrollbars>
          </div>
        )
      }

    }
  )
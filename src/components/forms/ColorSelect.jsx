import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'

import { NotusSelect } from '~/components/forms/NotusSelect'
import { eventColors } from '~/utils/eventColors'

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
})

const colorStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.value);

    return {
      ...styles,
      borderRadius: 8,
      backgroundColor: isDisabled
        ? color.alpha(0.1).css()
        : isSelected
          ? data.value
          : isFocused
            ? color.alpha(0.8).css()
            : data.value,
      color: isDisabled
        ? 'rgba(255, 255, 255, 0.5)'
        : 'white !important',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.value : color.alpha(0.8).css()),
        // border: '3px solid black !important'
      },

      ':focus': {
        ...styles[':focus'],
        backgroundColor: !isDisabled && (isSelected ? data.value : color.alpha(0.8).css()),
        // border: '3px solid black !important'
      },

      ':hover': {
        ...styles[':hover'],
        backgroundColor: !isDisabled && (isSelected ? data.value : color.alpha(0.8).css()),
      },
    }
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
};

export const ColorSelect =
  class _ColorSelect extends PureComponent {
    static propTypes = {
      handleColorChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }

    onChange = (newValue) => {
      // const abiEventInputClone = {
      //   id: this.props.abiEventInputId,
      //   metaType: newValue?.value || null
      // }

      this.props.handleColorChange(newValue)
    }

    render() {
      let props = this.props

      const {
        value,
      } = this.props

      let options = eventColors || []

      options = options.map(color => (
        {
          value: color,
          label: color.toString()
        }
      ))

      let selectedOption
      if (value !== null && value !== undefined) {
        selectedOption = options.find(option => option.value === value)

        if (!selectedOption) {
          selectedOption = options[0]
        }

        props = { ...this.props, value: selectedOption }
      }

      return <NotusSelect
        {...props}
        options={options}
        isSearchable={false}
        isClearable
        onChange={this.onChange}
        styles={colorStyles}
      />
    }
  }

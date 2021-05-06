/* eslint-disable no-param-reassign */
import React, { memo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import toNumber from 'lodash/toNumber'
import classNames from 'classnames'
import styles from './Input.module.scss'

const BaseInput = forwardRef(
  (
    {
      onChange,
      onBlur,
      disabled,
      className,
      invalid,
      name,
      hasLabel,
      type,
      max,
      value,
      min,
      autocomplete,
      small,
      ...rest
    },
    ref
  ) => {
    const handleChange = (event) => {
      if (disabled) return
      onChange(event.target.value)
    }

    const handleBlur = (event) => {
      if (type === 'number' && min && toNumber(value) < toNumber(min)) {
        event.target.value = min
        onChange(min)
      }
      if (type === 'number' && max && toNumber(value) > toNumber(max)) {
        event.target.value = max
        onChange(max)
      }
      onBlur(event)
    }

    const isTextAreaInput = type === 'textarea'

    const inputProps = {
      ...rest,
      id: hasLabel ? name : null,
      disabled,
      type,
      ...(min && type === 'number' ? { min } : {}),
      ...(max && type === 'number' ? { max } : {}),
      onChange: handleChange,
      onBlur: handleBlur,
      ref,
    }

    if (isTextAreaInput)
      return (
        <textarea
          className={classNames(
            styles.textarea,
            invalid && styles.invalid,
            small && styles.small
          )}
          value={value}
          {...inputProps}
          autoComplete={autocomplete}
        />
      )
    return (
      <input
        className={classNames(
          styles.input,
          invalid && styles.invalid,
          small && styles.small
        )}
        value={value}
        {...inputProps}
        autoComplete={autocomplete}
      />
    )
  }
)

BaseInput.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  hasLabel: PropTypes.bool,
  type: PropTypes.string,
  small: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.any,
  autocomplete: PropTypes.string,
}

BaseInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  disabled: false,
  className: '',
  invalid: false,
  max: null,
  value: '',
  small: false,
  min: null,
  hasLabel: false,
  type: '',
  autocomplete: 'off',
}

export default memo(BaseInput)

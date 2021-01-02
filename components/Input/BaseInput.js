/* eslint-disable no-param-reassign */
import React, { memo, forwardRef } from 'react'
import PropTypes from 'prop-types'
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
      maxValue,
      minValue,
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

    const handleBlur = (event) => onBlur(event)

    const isTextAreaInput = type === 'textarea'

    const inputProps = {
      ...rest,
      id: hasLabel ? name : null,
      disabled,
      type,
      ...(minValue && type === 'number' ? { min: minValue } : {}),
      ...(maxValue && type === 'number' ? { max: maxValue } : {}),
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
          autoComplete={autocomplete}
          {...inputProps}
        />
      )
    return (
      <input
        className={classNames(
          styles.input,
          invalid && styles.invalid,
          true && styles.small
        )}
        autoComplete={autocomplete}
        {...inputProps}
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
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  autocomplete: PropTypes.string,
}

BaseInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  disabled: false,
  className: '',
  invalid: false,
  maxValue: null,
  small: false,
  minValue: null,
  hasLabel: false,
  type: '',
  autocomplete: '',
}

export default memo(BaseInput)

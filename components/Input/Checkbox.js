/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react'
import classNames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import InputLabel from './parts/InputLabel'
import InputErrorText from './parts/InputErrorText'
import CheckIcon from '~public/icons/check.svg'
import styles from './Checkbox.module.scss'

const CheckboxComponent = ({
  input,
  label,
  name,
  disabled,
  meta,
  fluid,
  className,
  isRequired,
  onChange,
}) => {
  const { error, invalid, active } = meta
  const errorState =
    !active && (invalid || (error && error.trim().length !== 0))
  const handleOnChange = e => {
    if (disabled) return
    if (input.onChange) input.onChange(e.target.checked)
    if (onChange) onChange(e.target.checked)
  }
  const handleKeyPress = e => {
    if (e.charCode === 13) {
      if (input.onChange) input.onChange(!input.value)
    }
  }
  return (
    <>
      <div
        className={classNames(styles.container, fluid && styles.fluid)}
        tabIndex="0"
        onKeyPress={handleKeyPress}
      >
        <input type="checkbox" {...input} onChange={handleOnChange} />
        <div
          className={classNames(
            styles.checkbox,
            input.value && styles.checked,
            disabled && styles.disabled,
            fluid && styles.fluid,
            errorState && styles.error,
            className
          )}
        >
          <CheckIcon />
        </div>
        <InputLabel
          label={label}
          name={name}
          isRequired={isRequired}
          className={styles.label}
        />
      </div>
      <InputErrorText error={active ? null : error} />
    </>
  )
}

CheckboxComponent.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  fluid: PropTypes.bool,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    active: PropTypes.bool,
    invalid: PropTypes.bool,
  }),
}

CheckboxComponent.defaultProps = {
  label: '',
  input: {
    value: [],
    onChange: null,
  },
  meta: {
    error: null,
    active: false,
  },
  className: null,
  fluid: false,
  name: null,
  disabled: false,
  isRequired: false,
  onChange: null,
}

const Checkbox = ({ visible, name, validate, normalize, ...rest }) => {
  if (!visible) return null
  return (
    <Field
      name={name}
      component={CheckboxComponent}
      validate={validate}
      normalize={normalize}
      type="checkbox"
      props={{ name, ...rest }}
    />
  )
}

Checkbox.propTypes = {
  visible: PropTypes.bool,
  name: PropTypes.string,
  validate: PropTypes.func,
  normalize: PropTypes.func,
}

Checkbox.defaultProps = {
  visible: true,
  name: null,
  validate: null,
  normalize: null,
}

export default Checkbox

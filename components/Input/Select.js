/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import {
  map,
  get,
  uniq,
  filter,
  find,
  isNil,
  isEmpty as lodashEmpty,
  includes,
} from 'lodash'
import classNames from 'classnames'
import { FiX as CloseIcon } from 'react-icons/fi'
import { BaseButton, Loader } from '~components'
import useOutsideClick from '~hooks/useOutsideClick'
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import InputErrorText from './parts/InputErrorText'
import InputLabel from './parts/InputLabel'
import styles from './Select.module.scss'

const SelectComponent = ({
  disabled,
  loading,
  label,
  name,
  options,
  className,
  onChange,
  fluid,
  isRequired,
  input,
  meta,
  placeholder,
  multiple,
  isCustom,
  onReset,
}) => {
  const { value } = input
  const { error, active } = meta
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const isEmpty = (val) => isNil(val) || val === '' || val.length === 0
  const isActive = (key) => (multiple ? includes(value, key) : value === key)
  const handleOnChange = (val) => {
    if (input.onChange) input.onChange(val)
    if (onChange) onChange(val)
  }

  const Title = () => {
    const title =
      get(
        find(options, (o) => o.value === value),
        'label'
      ) || placeholder
    if (!multiple) return <span>{title}</span>
    if (!isEmpty(value)) {
      return map(options, ({ label: l, value: key }) => {
        if (includes(value, key)) {
          return (
            <BaseButton
              key={key}
              className={styles.chip}
              onClick={() => handleOnChange(filter(value, (v) => v !== key))}
            >
              <span className={styles.title}>{l}</span>
              <CloseIcon />
            </BaseButton>
          )
        }
      })
    }
    return <span>{title}</span>
  }

  useOutsideClick({ ref, isOpen: open, setOpen })
  const handleOptionClick = (key) => {
    if (multiple) {
      if (includes(value, key)) {
        handleOnChange(filter(value, (v) => v !== key))
      } else {
        handleOnChange(uniq([...value, key]))
      }
    } else {
      handleOnChange(key)
    }
    if (!multiple) setOpen(false)
  }

  const handleOpen = () => {
    if (loading || disabled || lodashEmpty(options)) return
    setOpen(!open)
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleOpen()
    }
  }

  const Content = () => {
    if (loading) return <Loader loading className={styles.loading} />
    return <Title />
  }

  return (
    <div
      ref={ref}
      id={`field-${name}`}
      className={classNames(styles.root, fluid && styles.fluid, className)}
    >
      <div
        className={classNames(styles.container, fluid && styles.fluid)}
        onClick={handleOpen}
        onKeyPress={handleKeyPress}
      >
        <InputLabel
          isRequired={isRequired}
          label={label}
          name={name}
          onReset={onReset}
        />
        {isCustom ? (
          <select
            name={name}
            className={classNames(
              styles.select,
              isEmpty(value) && styles.placeholder,
              open && styles.active,
              disabled && styles.disabled,
              !active && error && !open && styles.error
            )}
            value={value}
            onChange={(e) => handleOptionClick(e.target.value)}
            tabIndex="0"
          >
            <option value="">---</option>
            {map(options, (option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div
            className={classNames(
              styles.select,
              isEmpty(value) && styles.placeholder,
              open && styles.active,
              disabled && styles.disabled,
              !active && error && !open && styles.error
            )}
            tabIndex="0"
          >
            <Content />
            <ArrowDownIcon
              className={classNames(styles.arrowIcon, open && styles.active)}
            />
          </div>
        )}

        <InputErrorText error={active ? null : error} />
      </div>
      <div className={styles.wrapper}>
        {open && !isCustom && (
          <div className={styles.options}>
            {map(options, (option, index) => (
              <BaseButton
                key={index}
                className={classNames(
                  styles.option,
                  isActive(option.value) && styles.active
                )}
                onClick={() => handleOptionClick(option.value)}
              >
                <span>{option.label}</span>
              </BaseButton>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

SelectComponent.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  fluid: PropTypes.bool,
  label: PropTypes.string,
  onReset: PropTypes.any,
  multiple: PropTypes.bool,
  loading: PropTypes.bool,
  isRequired: PropTypes.bool,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    active: PropTypes.bool,
  }),
  isCustom: PropTypes.bool,
  placeholder: PropTypes.string,
}

SelectComponent.defaultProps = {
  label: '',
  placeholder: '',
  input: {
    value: [],
    onChange: null,
  },
  meta: {
    error: null,
    active: false,
  },
  isCustom: false,
  className: null,
  fluid: false,
  loading: false,
  name: null,
  disabled: false,
  options: [],
  multiple: false,
  isRequired: false,
  onReset: null,
  onChange: null,
}

const Select = ({
  visible,
  options,
  className,
  disabled,
  name,
  validate,
  onChange,
  normalize,
  fluid,
  label,
  isRequired,
  multiple,
  loading,
  isCustom,
  onReset,
  ...dropdownProps
}) => {
  if (!visible) return null
  return (
    <Field
      name={name}
      component={SelectComponent}
      validate={validate}
      normalize={normalize}
      type="select-multi"
      props={{
        disabled,
        label,
        name,
        options,
        isRequired,
        fluid,
        className,
        onChange,
        multiple,
        loading,
        isCustom,
        onReset,
        ...dropdownProps,
      }}
    />
  )
}

export default Select

Select.propTypes = {
  visible: PropTypes.bool,
  options: PropTypes.objectOf(PropTypes.any), // { key: { label: string, value: 1 }}
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func,
  normalize: PropTypes.func,
  fluid: PropTypes.bool,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onReset: PropTypes.any,
  loading: PropTypes.bool,
  isRequired: PropTypes.bool,
  isCustom: PropTypes.bool, // use HTML5 option select instead
}

Select.defaultProps = {
  label: '',
  className: null,
  visible: true,
  fluid: false,
  loading: false,
  name: null,
  disabled: false,
  options: [],
  validate: null,
  onReset: null,
  onChange: null,
  normalize: null,
  multiple: false,
  isRequired: false,
  isCustom: false,
}

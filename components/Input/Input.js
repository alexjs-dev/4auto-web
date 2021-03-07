import React, { memo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Field } from 'redux-form'
import {
  FiEyeOff as VisibilityIcon,
  FiEye as VisibilityOffIcon,
} from 'react-icons/fi'
import styles from './Input.module.scss'
import BaseButton from '~components/Button/BaseButton'
import InputErrorText from './parts/InputErrorText'
import InputLabel from './parts/InputLabel'
import BaseInput from './BaseInput'

const ToggleVisibilityButton = memo(({ onClick, active, visible }) => {
  const { t } = useTranslation()
  if (!visible) return null
  return (
    <BaseButton onClick={onClick} className={styles.passwordToggleButton}>
      {!active && <VisibilityOffIcon />}
      {active && <VisibilityIcon />}
    </BaseButton>
  )
})

ToggleVisibilityButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  active: PropTypes.bool.isRequired,
}

ToggleVisibilityButton.defaultProps = {
  visible: false,
}

const InputComponent = (props) => {
  const {
    label,
    meta,
    type,
    placeholder,
    input,
    disabled,
    forwardedRef,
    isRequired,
    small,
    className,
    fluid,
    ...rest
  } = props
  const { name } = input
  const { error, invalid, active } = meta
  const [useType, setUseType] = useState(type)
  const toggleVisibility = useCallback(() => {
    const newType = useType === 'password' ? 'text' : 'password'
    setUseType(newType)
  }, [type, useType])

  return (
    <div
      className={classNames(styles.container, className, fluid && styles.fluid)}
    >
      <InputLabel
        isRequired={isRequired}
        label={label}
        active={active}
        name={name}
        small={small}
      />
      <div className={styles.inputWrapper}>
        <BaseInput
          type={useType}
          placeholder={placeholder}
          invalid={!active && (invalid || (error && error.trim().length !== 0))}
          disabled={disabled}
          hasLabel={!!label}
          ref={forwardedRef}
          small={small}
          {...input}
          {...rest}
        />
        <ToggleVisibilityButton
          visible={type === 'password'}
          active={useType !== 'password'}
          onClick={toggleVisibility}
        />
      </div>
      <InputErrorText error={active ? null : error} />
    </div>
  )
}

InputComponent.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    invalid: PropTypes.bool,
    active: PropTypes.bool,
  }).isRequired,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  forwardedRef: PropTypes.shape(),
  className: PropTypes.string,
  fluid: PropTypes.bool,
}

InputComponent.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  isRequired: false,
  forwardedRef: null,
  small: false,
  fluid: false,
  className: null,
}

const Input = ({
  name,
  validate,
  normalize,
  type,
  onChange,
  disabled,
  label,
  placeholder,
  hidden,
  forwardedRef,
  ...rest
}) => {
  const handleBlur = useCallback((event) => {
    // used to prevent the need for double clicking when submiting forms
    const { relatedTarget } = event
    if (relatedTarget && relatedTarget.getAttribute('type') === 'submit') {
      event.preventDefault()
    }
  }, [])
  if (hidden || !name) return null
  // if (!name)
  //   return (
  //     <InputComponent
  //       disabled={disabled}
  //       label={label}
  //       placeholder={placeholder}
  //       forwardedRef={forwardedRef}
  //       input={{
  //         name: '',
  //         onChange: null,
  //       }}
  //       meta={{
  //         error: false,
  //         invalid: false,
  //         active: false,
  //       }}
  //       {...rest}
  //     />
  //   )
  return (
    <Field
      name={name}
      component={InputComponent}
      validate={validate}
      normalize={normalize}
      type={type}
      onChange={onChange}
      onBlur={handleBlur}
      props={{
        disabled,
        label,
        placeholder,
        forwardedRef,
        type,
        ...rest,
      }}
    />
  )
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  normalize: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  fluid: PropTypes.bool,
  small: PropTypes.bool,
  forwardedRef: PropTypes.shape(),
  className: PropTypes.string,
}

Input.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  placeholder: '',
  validate: null,
  normalize: null,
  onChange: () => {},
  disabled: false,
  hidden: false,
  small: false,
  fluid: false,
  forwardedRef: null,
  className: null,
}

const WrappedComponent = React.forwardRef((props, ref) => {
  return <Input {...props} forwardedRef={ref} />
})

export default WrappedComponent

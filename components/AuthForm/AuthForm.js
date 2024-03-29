import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { values as toVal } from 'lodash'
import PropTypes from 'prop-types'
import {
  fieldTypes,
  autoCompleteFields,
  emailValidator,
  passwordValidator,
  validateFormData,
} from '~utils/formValidators'
import { Input } from '~components'
import AuthCreators from '~store/auth/creators'
import SignInForm from './parts/SignInForm'
import SignupForm from './parts/SignUpForm'
import ForgotForm from './parts/ForgotForm'

export const types = {
  SIGNIN: 'SIGNIN',
  SIGNUP: 'SIGNUP',
  FORGOT: 'FORGOT',
}

const AuthForm = ({ type }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const onSubmit = async (values) => {
    switch (type) {
      case types.SIGNIN:
        await validateFormData(values, [fieldTypes.email, fieldTypes.password])
        dispatch(AuthCreators.logIn(values))
        break
      case types.SIGNUP:
        await validateFormData(values, [
          fieldTypes.email,
          fieldTypes.password,
          fieldTypes.username,
        ])
        dispatch(AuthCreators.signUp(values))
      default:
        break
    }
  }

  const title = {
    [types.SIGNIN]: 'button.signIn',
    [types.FORGOT]: 'button.forgotPassword',
    [types.SIGNUP]: 'button.signUp',
  }

  const DefaultFields = () => (
    <Input
      key={fieldTypes.email}
      isRequired
      placeholder={t('placeholder.email')}
      label={t('label.email')}
      autocomplete={fieldTypes.email}
      name={fieldTypes.email}
      type="email"
      validate={[emailValidator]}
    />
  )

  const AuthFields = () => (
    <Input
      key={fieldTypes.password}
      isRequired
      placeholder={t('placeholder.password')}
      name={fieldTypes.password}
      type={fieldTypes.password}
      autocomplete={autoCompleteFields[fieldTypes.password]}
      label={t('label.password')}
      validate={[passwordValidator]}
    />
  )

  const RegistrationFields = () => (
    <>
      <Input
        placeholder={t('placeholder.username')}
        label={t('label.username')}
        autocomplete={autoCompleteFields[fieldTypes.username]}
        name={fieldTypes.username}
        isRequired
      />
      <Input
        placeholder={t('placeholder.firstName')}
        label={t('label.firstName')}
        autocomplete={autoCompleteFields[fieldTypes.firstName]}
        name={fieldTypes.firstName}
      />
      <Input
        placeholder={t('placeholder.lastName')}
        label={t('label.lastName')}
        autocomplete={autoCompleteFields[fieldTypes.lastName]}
        name={fieldTypes.lastName}
      />
    </>
  )

  const Fields = () => {
    switch (type) {
      case types.SIGNUP:
        return (
          <>
            <DefaultFields />
            <AuthFields />
            <RegistrationFields />
          </>
        )
      case types.SIGNIN:
        return (
          <>
            <DefaultFields />
            <AuthFields />
          </>
        )
      case types.FORGOT:
      default:
        return <DefaultFields />
    }
  }

  switch (type) {
    case types.SIGNIN:
      return (
        <SignInForm onSubmit={onSubmit} title={t(title[type])}>
          <Fields />
        </SignInForm>
      )
    case types.SIGNUP:
      return (
        <SignupForm onSubmit={onSubmit} title={t(title[type])}>
          <Fields />
        </SignupForm>
      )
    case types.FORGOT:
      return (
        <ForgotForm onSubmit={onSubmit} title={t(title[type])}>
          <Fields />
        </ForgotForm>
      )
    default:
      return null
  }
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(toVal(types)).isRequired,
}

export default AuthForm

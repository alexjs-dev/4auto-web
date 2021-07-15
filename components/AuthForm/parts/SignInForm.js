import React from 'react'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { authLoadingSelector } from '~store/auth/selectors'
import { FcGoogle } from 'react-icons/fc'
import styles from '../AuthForm.module.scss'
import {
  BaseButton,
  Button,
  Spacer,
  GoogleButton,
  FacebookButton,
} from '~components'

const formName = 'signInForm'

const Component = ({ handleSubmit, onSubmit, children, title }) => {
  const { t } = useTranslation()
  const loading = useSelector(authLoadingSelector)
  return (
    <form className={styles.container}>
      {title && <h4>{title}</h4>}
      <div className={styles.social}>
        <GoogleButton title="Sign in with Google" href="https://forautobackend.herokuapp.com/oauth/google" />
      </div>
      <div className={styles.social}>
        <FacebookButton title="Sign in with Facebook" href="https://forautobackend.herokuapp.com/oauth/facebook" />
      </div>
      {children}
      <BaseButton
        className={styles.link}
        isInternalLink
        href="/forgot-password"
      >
        {`${t('button.forgotPassword')}?`}
      </BaseButton>
      <Button
        fluid
        baseType="submit"
        loading={loading}
        onClick={handleSubmit(onSubmit)}
      >
        {t('button.signIn')}
      </Button>
      <Spacer className={styles.spacer} />
      <Button
        fluid
        type={Button.types.GHOST}
        disabled={loading}
        isInternalLink
        href="/sign-up"
      >
        {t('button.signUp')}
      </Button>
    </form>
  )
}

Component.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
}

const SignInForm = reduxForm({
  form: formName,
  enableReinitialize: true,
})(Component)

export default SignInForm

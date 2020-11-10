import React from 'react'
import { reduxForm } from 'redux-form'
import GoogleButton from 'react-google-button'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { authLoadingSelector } from '~store/auth/selectors'
import styles from '../AuthForm.module.scss'
import { BaseButton, Button, Spacer } from '~components'

const formName = 'signInForm'

const Component = ({ handleSubmit, onSubmit, children }) => {
  const { t } = useTranslation()
  const loading = useSelector(authLoadingSelector)
  return (
    <form className={styles.container}>
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
      <div className={styles.google}>
        <GoogleButton
          type="dark"
          onClick={() => {
            console.log('Google button clicked')
          }}
        />
      </div>
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

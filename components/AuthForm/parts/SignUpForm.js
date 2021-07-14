import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import styles from '../AuthForm.module.scss'
import { Button, Spacer, GoogleButton, FacebookButton } from '~components'

const formName = 'signUpForm'

const Component = ({ onSubmit, children, handleSubmit, title }) => {
  const { t } = useTranslation()

  return (
    <form className={styles.container}>
      {title && <h4>{title}</h4>}
      {/* {children}
      <Button fluid baseType="submit" onClick={handleSubmit(onSubmit)}>
        {t('button.signUp')}
      </Button> */}
      <div className={styles.social}>
        <GoogleButton
          title="Sign up with Google"
          href="https://forautobackend.herokuapp.com/oauth/google"
        />
      </div>

      <div className={styles.social}>
        <FacebookButton
          title="Sign up with Facebook"
          href="https://forautobackend.herokuapp.com/oauth/facebook"
        />
      </div>
      <Spacer className={styles.spacer} />
      <Button fluid type={Button.types.GHOST} isInternalLink href="/sign-in">
        {t('button.signIn')}
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

const SignUpForm = reduxForm({
  form: formName,
  enableReinitialize: true,
})(Component)

export default SignUpForm

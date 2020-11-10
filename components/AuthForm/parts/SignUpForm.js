import React from 'react'
import { reduxForm } from 'redux-form'
import GoogleButton from 'react-google-button'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import styles from '../AuthForm.module.scss'
import { Button, Spacer } from '~components'

const formName = 'signUpForm'

const Component = ({ onSubmit, children, handleSubmit }) => {
  const { t } = useTranslation()

  return (
    <form className={styles.container}>
      {children}
      <Button fluid baseType="submit" onClick={handleSubmit(onSubmit)}>
        {t('button.signUp')}
      </Button>
      <div className={styles.google}>
        <GoogleButton
          type="dark"
          label="Sign up with Google"
          onClick={() => {
            console.log('Google button clicked')
          }}
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

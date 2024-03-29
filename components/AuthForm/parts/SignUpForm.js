import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import styles from '../AuthForm.module.scss'
import {
  Button,
  Spacer,
  LanguageList,
  GoogleButton,
  FacebookButton,
} from '~components'
import config from '../../../config'

const formName = 'signUpForm'

const Component = ({ onSubmit, children, handleSubmit, title }) => {
  const { t } = useTranslation()

  return (
    <form className={styles.container}>
      <div className={styles.disclaimer}>
      <span>{t('titles.registrationDisclaimer')}</span>
      </div>
      {title && <h4>{title}</h4>}
      {/* {children}
      <Button fluid baseType="submit" onClick={handleSubmit(onSubmit)}>
        {t('button.signUp')}
      </Button> */}
      <div className={styles.social}>
        <GoogleButton
          title={t('button.signUpWithGoogle')}
          href={config.oauthUrls.google}
        />
      </div>

      <div className={styles.social}>
        <FacebookButton
          title={t('button.signUpWithFacebook')}
          href={config.oauthUrls.facebook}
        />
      </div>
      <Spacer className={styles.spacer} />
      <Button fluid type={Button.types.GHOST} isInternalLink href="/sign-in">
        {t('button.signIn')}
      </Button>
      <div style={{ marginTop: '2rem' }}>
        <LanguageList />
      </div>
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

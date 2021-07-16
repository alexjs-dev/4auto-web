import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import styles from '../AuthForm.module.scss'
import { Button, Spacer, LanguageList } from '~components'

const formName = 'forgotPasswordForm'

const Component = ({ children, onSubmit, handleSubmit, title }) => {
  const { t } = useTranslation()

  return (
    <form className={styles.container}>
      {title && <h4>{title}</h4>}
      {children}
      <Button fluid baseType="submit" onClick={handleSubmit(onSubmit)}>
        {t('button.reset')}
      </Button>
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

const ForgotPasswordForm = reduxForm({
  form: formName,
  enableReinitialize: true,
})(Component)

export default ForgotPasswordForm

import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FiSend, FiArrowLeft } from 'react-icons/fi'
import { Input, Button } from '~components'
import useUser from '~hooks/useUser'
import styles from './ChatScreen.module.scss'

const ChatScreen = ({ onChatCancel, onSubmit, visible }) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useUser()
  const { push } = useRouter()
  const handleSubmit = (values) => {
    if (!isLoggedIn) {
      push('/sign-in')
    } else {
      onChatCancel()
    }
    console.log('values', values)
  }
  return (
    <form
      className={classNames(
        styles.container,
        visible && styles.visible,
        'animated fadeIn'
      )}
    >
      <Input label={t('button.message')} name="message" type="textarea" />
      <Button
        label={t('button.send')}
        onClick={onChatCancel}
        fluid
        onClick={() => handleSubmit(onSubmit)}
      >
        <FiSend />
        &nbsp;
        {t('button.send')}
      </Button>
      <Button
        color={Button.colors.RED}
        onClick={onChatCancel}
        fluid
        type={Button.types.GHOST}
      >
        <FiArrowLeft />
        &nbsp;
        {t('button.back')}
      </Button>
    </form>
  )
}

const ChatScreenForm = reduxForm({
  form: 'vehicleCardMessageForm',
  enableReinitialize: true,
})(ChatScreen)

export default ChatScreenForm

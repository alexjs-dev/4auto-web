import React from 'react'
import { reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { FiSend, FiArrowLeft } from 'react-icons/fi'
import { Input, Button } from '~components'
import styles from './ChatScreen.module.scss'

const ChatScreen = ({ onChatCancel, visible }) => {
  const { t } = useTranslation()
  return (
    <form
      className={classNames(
        styles.container,
        visible && styles.visible,
        'animated slideInUp'
      )}
    >
      <Input label="Message" name="message" type="textarea" />
      <Button label="Send" onClick={onChatCancel} fluid>
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

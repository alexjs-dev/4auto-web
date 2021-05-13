import React from 'react'
import get from 'lodash/get'
import { reduxForm, getFormValues } from 'redux-form'
import { useSelector } from 'react-redux'
import { BaseButton, Input } from '../../../components'
import { FiSend } from 'react-icons/fi'
import styles from './ChatInput.module.scss'

type Props = {}

const ChatInputForm: React.FunctionComponent<Props> = () => {
  const baseFormValues = useSelector(getFormValues('messageInputForm'))
  const message = get(baseFormValues, 'message', '')
  const textRowsCount = message.length && message.split('\n').length
  const rows = textRowsCount && textRowsCount > 2 ? 2 : textRowsCount || 1
  return (
    <form className={styles.container}>
      <Input
        // @ts-ignore
        name="message"
        type="textarea"
        className={styles.input}
        placeholder="Type your message"
        cols={1}
        rows={rows}
      />
      {/* @ts-ignore */}
      <BaseButton className={styles.submitButton}>
        <FiSend />
      </BaseButton>
    </form>
  )
}

const ChatInput = reduxForm({
  form: 'messageInputForm',
  enableReinitialize: false,
})(ChatInputForm)

export default ChatInput

import React from 'react'
import get from 'lodash/get'
import { reduxForm, getFormValues, change } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import MessagesCreators from '../../../store/messages/creators'
import { BaseButton, Input } from '../../../components'
import { FiSend } from 'react-icons/fi'
import styles from './ChatInput.module.scss'
import { currentChatSelector } from '~/store/chats/selectors'

type Props = {
  handleSubmit: any
}

const form = 'messageInputForm'

const ChatInputForm: React.FunctionComponent<Props> = ({ handleSubmit }) => {
  const baseFormValues = useSelector(getFormValues('messageInputForm'))
  const message = get(baseFormValues, 'message', '')
  const chat = useSelector(currentChatSelector)
  const dispatch = useDispatch()
  const textRowsCount = message.length && message.split('\n').length
  const rows = textRowsCount && textRowsCount > 2 ? 2 : textRowsCount || 1
  const chatId = get(chat, '_id')

  console.log('handleSubmit', handleSubmit)

  const onSubmit = (values: any) => {
    console.log('message submit', values)
    const message = get(values, 'message', '')
    if (message && message.trim() !== '' && chatId) {
      dispatch(
        MessagesCreators.createMessage({
          text: values.message,
          chatId,
        })
      )
      dispatch(change(form, 'message', ''))
    }
  }

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)
      }}
    >
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
      <BaseButton
        className={styles.submitButton}
        onClick={handleSubmit(onSubmit)}
      >
        <FiSend />
      </BaseButton>
    </form>
  )
}

const ChatInput = reduxForm({
  form,
  enableReinitialize: false,
  /* @ts-ignore */
})(ChatInputForm)

export default ChatInput

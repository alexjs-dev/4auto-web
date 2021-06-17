import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import get from 'lodash/get'
import map from 'lodash/map'
import { scrollToBottom } from '../../../utils/helpers'
import styles from './MessagesList.module.scss'
import useUser from '../../../hooks/useUser'
import { getMessage } from '../../../utils/chatUtils'

type Props = {
  messages: any
}

const MessagesList: React.FunctionComponent<Props> = ({ messages }) => {
  const { currentUser } = useUser()
  const messageContainerRef = useRef(null)

  useEffect(() => {
    if (messageContainerRef.current) {
      /* @ts-ignore */
      scrollToBottom(messageContainerRef.current, true)
    }
  }, [messageContainerRef.current])

  useEffect(() => {
    const container = messageContainerRef.current
    if (messages.length && messageContainerRef.current) {
      /* @ts-ignore */
      const lastMessage = container.children[messages.length]

      const scrollHeight = get(container, 'scrollHeight', 0)
      const scrollTop = get(container, 'scrollTop', 0)
      const offsetHeight = get(container, 'offsetHeight', 0)
      /* @ts-ignore */
      if (
        lastMessage &&
        scrollHeight - scrollTop - offsetHeight - lastMessage.clientHeight - 8 <
          1
      ) {
        /* @ts-ignore */
        scrollToBottom(messageContainerRef.current, false)
      }
    }
  }, [messages])

  return (
    <div className={styles.container}>
      <ul ref={messageContainerRef} id="chat-list">
        {map(messages, (message) => {
          const isAuthor = get(currentUser, '_id') === message.userId
          return (
            <li key={message._id}>
              <div
                className={classNames(
                  !isAuthor && styles.messageOther,
                  message.offer && styles.unstyledMessage
                )}
              >
                {getMessage(message)}
              </div>
              <span className={classNames(!isAuthor && styles.messageOther)}>
                {moment(message.updatedAt).fromNow()}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MessagesList

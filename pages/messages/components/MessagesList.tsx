import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import get from 'lodash/get'
import map from 'lodash/map'
import styles from './MessagesList.module.scss'
import useUser from '../../../hooks/useUser'

type Props = {
  messages: any
}

const MessagesList: React.FunctionComponent<Props> = ({ messages }) => {
  const { currentUser } = useUser()
  return (
    <div className={styles.container}>
      <ul>
        {map(messages, (message) => {
          const isAuthor = get(currentUser, '_id') === message.authorId
          return (
            <>
              <li
                key={message._id}
                className={classNames(isAuthor && styles.messageOther)}
              >
                {message.text}
              </li>
              <span
                key={`time-${message._id}`}
                className={classNames(isAuthor && styles.messageOther)}
              >
                {moment(message.updatedAt).fromNow()}
              </span>
            </>
          )
        })}
      </ul>
    </div>
  )
}

export default MessagesList

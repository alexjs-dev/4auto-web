import React from 'react'
import classNames from 'classnames'
import map from 'lodash/map'
import styles from './MessagesList.module.scss'

type Props = {
  messages: any
}

const MessagesList: React.FunctionComponent<Props> = ({ messages }) => {
  return (
    <div className={styles.container}>
      <ul>
        {map(messages, (message) => (
          <>
            <li
              key={message._id}
              className={classNames(message.isAuthor && styles.messageOther)}
            >
              Hello this is a test wow Hello this is a test wow Hello this is a
              test wow Hello this is a test wow Hello this is a test wow Hello
              this is a test wow
            </li>
            <span
              key={`time-${message._id}`}
              className={classNames(message.isAuthor && styles.messageOther)}
            >
              Yesterday 14:38
            </span>
          </>
        ))}
      </ul>
    </div>
  )
}

export default MessagesList

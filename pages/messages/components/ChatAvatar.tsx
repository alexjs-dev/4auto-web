import React from 'react'
import moment from 'moment'
import { Avatar } from '../../../components'
import styles from './ChatAvatar.module.scss'

type Props = {
  userId: string
  username: string
  avatarSrc: string
  topic: string
  updatedAt?: string
}

const ChatAvatar: React.FunctionComponent<Props> = ({
  userId,
  username,
  avatarSrc,
  topic,
  updatedAt,
}) => {
  return (
    <section className={styles.container}>
      <Avatar
        userId={userId}
        username={username}
        avatarSrc={avatarSrc}
        hideUsername
      />
      <div className={styles.title}>
        <h6>{username}</h6>
        <span>{topic}</span>
      </div>
      {updatedAt && (
        <span className={styles.chatUpdatedTitle}>
          {moment(updatedAt).fromNow()}
        </span>
      )}
    </section>
  )
}

export default ChatAvatar

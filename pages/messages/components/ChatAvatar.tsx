import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { Avatar, BaseButton } from '../../../components'
import styles from './ChatAvatar.module.scss'

type Props = {
  userId: string
  username: string
  avatarSrc: string
  topic: string
  updatedAt?: string
  listingId?: string
  wrapTopic?: boolean
  hideLinks?: boolean
}

const ChatAvatar: React.FunctionComponent<Props> = ({
  userId,
  username,
  avatarSrc,
  topic,
  updatedAt,
  listingId,
  wrapTopic,
  hideLinks,
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
        {!hideLinks && (
          <>
            {/* @ts-ignore */}
            <BaseButton isInternalLink href={`/profile/${userId}`}>
              <h6>{username}</h6>
            </BaseButton>
            {/* @ts-ignore */}
            <BaseButton
              isInternalLink
              href={`/listing/${listingId}`}
              className={classNames(wrapTopic && styles.wrapText)}
            >
              <span>{topic}</span>
            </BaseButton>
          </>
        )}
        {hideLinks && (
          <>
            <section>
              <h6>{username}</h6>
            </section>
            <section className={classNames(wrapTopic && styles.wrapText)}>
              <span>{topic}</span>
            </section>
          </>
        )}
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

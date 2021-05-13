import React from 'react'
import { parseCloudinaryUrl } from '~/utils/helpers'
import { BaseButton } from '../'
import styles from './Avatar.module.scss'
import UserAvatar from './UserAvatar'

type Props = {
  title?: string
  avatarSrc?: string
  username?: string
  hideUsername?: boolean
  userId: string
}

const Avatar: React.FunctionComponent<Props> = ({
  title,
  avatarSrc,
  username,
  userId,
  hideUsername,
}) => {
  const src = parseCloudinaryUrl(avatarSrc)
  const hasImageSrc = src && src !== ''
  return (
    <div className={styles.container}>
      {title && <p>{title}</p>}
      {/* @ts-ignore */}
      <BaseButton
        className={styles.user}
        href={`/profile/${userId}`}
        isInternalLink
      >
        {hasImageSrc && <img src={src} alt={username} />}
        {!hasImageSrc && <UserAvatar username={username} />}
        {!hideUsername && (
          <span className={styles.link}>{username || 'Username'}</span>
        )}
      </BaseButton>
    </div>
  )
}

export default Avatar

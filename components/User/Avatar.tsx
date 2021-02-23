import React from 'react'
import { BaseButton } from '../'
import styles from './Avatar.module.scss'

type Props = {
  title?: string
  avatarSrc?: string
  username?: string
  userId: string
}

const Avatar: React.FunctionComponent<Props> = ({
  title,
  avatarSrc,
  username,
  userId,
}) => {
  return (
    <div className={styles.container}>
      {title && <p>{title}</p>}
      <div className={styles.user}>
        <img
          src={
            avatarSrc ||
            'https://res.cloudinary.com/forautocloud/image/upload/v1614110570/static/Screenshot_2021-02-23_at_22.02.19_bssgk8.png'
          }
          alt={username}
        />
        {/* @ts-ignore */}
        <BaseButton
          label={username}
          href={`/profile/${userId}`}
          isInternalLink
          className={styles.link}
        >
          {username || 'Username'}
        </BaseButton>
      </div>
    </div>
  )
}

export default Avatar

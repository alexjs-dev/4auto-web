import React from 'react'
import styles from '../profile.module.scss'

type Props = {
  src?: string
  username: string
}
const ProfileAvatar: React.FunctionComponent<Props> = ({ src, username }) => {
  return (
    <div className={styles.avatar}>
      <img src={src} alt={username} />
    </div>
  )
}

export default ProfileAvatar

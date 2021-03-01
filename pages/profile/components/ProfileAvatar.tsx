import React from 'react'
import UserAvatar from '../../../components/User/UserAvatar'
import styles from '../profile.module.scss'

type Props = {
  src?: string
  username: string
}
const ProfileAvatar: React.FunctionComponent<Props> = ({ src, username }) => {
  return (
    <div className={styles.avatar}>
      {src && <img src={src} alt={username} />}
      {!src && <UserAvatar firstName={username} />}
    </div>
  )
}

export default ProfileAvatar

import React from 'react'
import classNames from 'classnames'
import { get } from 'lodash'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/auth/selectors'
import styles from './UserAvatar.module.scss'

type Props = {
  username?: string
  fullScreen?: boolean
}

const UserAvatar: React.FunctionComponent<Props> = ({
  username,
  fullScreen,
}) => {
  const currentUser = useSelector(currentUserSelector)
  const firstName = get(currentUser, 'profile.firstName')
  const usernameFallback = get(currentUser, 'profile.username')
  const nameFallback =
    firstName && firstName !== '' ? firstName : usernameFallback
  return (
    <div
      className={classNames(styles.container, fullScreen && styles.fullScreen)}
    >
      <span>
        {username ? username.substring(0, 1) : nameFallback.substring(0, 1)}
      </span>
    </div>
  )
}

export default UserAvatar

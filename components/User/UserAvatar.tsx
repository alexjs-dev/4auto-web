import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/auth/selectors'
import styles from './UserAvatar.module.scss'
import { getUsername } from '~/utils/helpers'

type Props = {
  username?: string
  fullScreen?: boolean
}

const UserAvatar: React.FunctionComponent<Props> = ({
  username,
  fullScreen,
}) => {
  const currentUser = useSelector(currentUserSelector)

  const currentUsername = getUsername(currentUser)

  return (
    <div
      className={classNames(styles.container, fullScreen && styles.fullScreen)}
    >
      <span>
        {username ? username.substring(0, 2) : currentUsername.substring(0, 2)}
      </span>
    </div>
  )
}

export default UserAvatar

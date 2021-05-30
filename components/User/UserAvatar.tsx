import React from 'react'
import classNames from 'classnames'
import { get } from 'lodash'
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
      <span>{username ? username : currentUsername}</span>
    </div>
  )
}

export default UserAvatar

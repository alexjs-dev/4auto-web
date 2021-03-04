import React from 'react'
import classNames from 'classnames'
import { get } from 'lodash'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/auth/selectors'
import styles from './UserAvatar.module.scss'

type Props = {
  username: string
  fullScreen?: boolean
}

const UserAvatar:React.FunctionComponent<Props> = ({ username, fullScreen }) => {
  const currentUser = useSelector(currentUserSelector)
  const currentFirstName = get(currentUser, 'profile.firstName', '?')
  return (
    <div className={classNames(styles.container, fullScreen && styles.fullScreen)}>
      <span>
        {username ? username.substring(0, 1) : currentFirstName.substring(0, 1)}
      </span>
    </div>
  )
}

export default UserAvatar

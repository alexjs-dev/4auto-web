import React from 'react'
import { get } from 'lodash'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '~store/auth/selectors'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({ firstName }) => {
  const currentUser = useSelector(currentUserSelector)
  const currentFirstName = get(currentUser, 'profile.firstName', '?')
  return (
    <div className={styles.container}>
      <span>
        {firstName
          ? firstName.substring(0, 1)
          : currentFirstName.substring(0, 1)}
      </span>
    </div>
  )
}

export default UserAvatar

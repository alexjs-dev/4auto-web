import React, { useEffect } from 'react'
import get from 'lodash/get'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { currentUserSelector } from '../../store/auth/selectors'
import { Loader } from '~/components'

const ProfilePage: React.FunctionComponent = () => {
  const currentUser = useSelector(currentUserSelector)
  const { push } = useRouter()
  const userId = get(currentUser, '_id')

  useEffect(() => {
    push(userId ? `/profile/${userId}` : '/')
  }, [userId])

  return  <Loader centered loading isBranded fullscreen />
}

export default ProfilePage

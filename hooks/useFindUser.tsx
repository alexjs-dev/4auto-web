import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import UserType from '../types/user'
import Creators from '../store/user/creators'

type Props = {
  prefetchedUser?: UserType
  id?: string | undefined | string[]
}

const userFindUser = (props: Props) => {
  const { prefetchedUser, id } = props
  if (!process.browser) return null
  const dispatch = useDispatch()
  useEffect(() => {
    if (id && isEmpty(prefetchedUser)) {
      dispatch(Creators.fetchUserById(id))
    }
  }, [dispatch, Creators, id])
}

export default userFindUser

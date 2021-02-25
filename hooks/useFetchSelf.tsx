import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Creators from '../store/auth/creators'
import { isLoggedInSelector } from '../store/auth/selectors'

const useFetchSelf = () => {
  if (!process.browser) return null
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(isLoggedInSelector)
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(Creators.fetchSelf())
    }
  }, [dispatch, Creators, isLoggedIn])
}

export default useFetchSelf

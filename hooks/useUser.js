import { useSelector } from 'react-redux'
import { isLoggedInSelector } from '~store/auth/selectors'

const useUser = () => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  return {
    isLoggedIn,
  }
}

export default useUser

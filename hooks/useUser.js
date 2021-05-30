import { useSelector } from 'react-redux'
import { isLoggedInSelector, currentUserSelector } from '~store/auth/selectors'

const useUser = () => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const currentUser = useSelector(currentUserSelector)
  return {
    isLoggedIn,
    currentUser,
  }
}

export default useUser

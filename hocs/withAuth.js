import { useRouter } from 'next/router'
import get from 'lodash/get'

const withAuth = (WrappedComponent, props) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter()
      const loginRequired = get(props, 'loginRequired', true)

      const accessToken = localStorage.getItem('feathers-jwt')

      //  const isProtected = get(args, 'isProtected', true)

      // If there is no access token we redirect to "/" page.
      if (!accessToken && loginRequired) {
        Router.replace('/')
        return null
      }
      if (accessToken && !loginRequired) {
        Router.replace('/')
        return null
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />
    }

    // If we are on server, return null
    return null
  }
}

export default withAuth

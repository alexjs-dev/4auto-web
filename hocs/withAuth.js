import { useRouter } from 'next/router'
import get from 'lodash/get'

const withAuth = (WrappedComponent, args) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter()

      const accessToken = localStorage.getItem('feathers-jwt')

      console.log('props', props);

      console.log('args', args);

      const isProtected = get(args, 'isProtected', true)

      console.log('isProtected', isProtected)

      console.log('accessToken', accessToken)

      // If there is no access token we redirect to "/" page.
      if (!accessToken && isProtected) {
        Router.replace('/')
        return null
      }
      if (accessToken && !isProtected) {
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

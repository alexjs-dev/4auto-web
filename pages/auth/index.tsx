import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import AuthCreators from '../../store/auth/creators'

const Auth = () => {
    const { push, asPath } = useRouter()
    const dispatch = useDispatch()
    if (asPath && asPath.includes('access_token')) {
        const accessToken = asPath.split('access_token=')[1];
        // @ts-ignore
        window.localStorage.setItem('feathers-jwt', accessToken);
      //  dispatch(AuthCreators.logIn({ strategy: 'jwt', accessToken }));
    } else {
       // push('/');
    }
    return null;

}

export default Auth;

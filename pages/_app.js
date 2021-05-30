import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { Header, NavigationDrawer, Modal } from '~components'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import SocketClient from '../lib/SocketClient'
import store, { persistor } from '~store'
import '~i18n'
import '~styles/reset.scss'
import '~styles/global.scss'
import '~styles/animate.min.scss'
import 'react-multi-carousel/lib/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

let socketClient

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const accessToken =
    process.browser && window && window.localStorage.getItem('feathers-jwt')
  useEffect(() => {
    if (!socketClient && process.browser && accessToken) {
      socketClient = new SocketClient()
    }
  }, [socketClient, accessToken])
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <NavigationDrawer />
          <ToastContainer />
          <Modal />
          <Component {...pageProps} key={router.asPath} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp

import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Header, NavigationDrawer } from '~components'
import { Provider } from 'react-redux'
import store from '~store'
import '~i18n'
import '~styles/reset.scss'
import '~styles/global.scss'
// import '~styles/animate.min.scss'
import 'react-multi-carousel/lib/styles.css'
import 'react-toastify/dist/ReactToastify.css'

const MyApp = ({ Component, pageProps }) => (
  <>
    <Provider store={store}>
      <Header />
      <NavigationDrawer />
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  </>
)

export default MyApp

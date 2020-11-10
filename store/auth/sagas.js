import { takeLatest, select, put, call, delay } from 'redux-saga/effects'
import Router from 'next/router'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { stopSubmit } from 'redux-form'
import i18n from '~i18n'
// import { app } from '~lib/FeathersClient'
import { fieldTypes } from '~utils/formValidators'
import { Types } from './creators'

const app = {}

const snackbarConfig = {
  position: 'top-right',
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

function* handleLogIn({ params }) {
  try {
    const response = yield call(app.authenticate, {
      strategy: 'local',
      ...params,
    })
    if (response.accessToken) {
      const user = get(response, 'user', {})
      const firstName = get(user, 'profile.firstName', '')
      yield put({ type: Types.LOG_IN_SUCCESS, data: user })
      Router.push('/')
      toast.success(`${i18n.t('snackbar.welcome')} ${firstName}!`, {
        ...snackbarConfig,
        autoClose: 2000,
      })
    } else {
      throw new Error('Missing accessToken')
    }
  } catch (e) {
    toast.error(i18n.t('errors.invalid_credentials', snackbarConfig))
    yield put(
      stopSubmit('signInForm', {
        [fieldTypes.email]: 'errors.invalid_credentials',
        [fieldTypes.password]: 'errors.invalid_credentials',
      })
    )
    yield put({ type: Types.LOG_IN_FAILURE, error: e })
  }
}

function* handleLogOut() {
  try {
    // app.logout.removeAccessToken(true)
    yield call(app.logout)
  } catch (e) {
    console.error(e)
  }
}

const sagas = [
  takeLatest(Types.LOG_IN, handleLogIn),
  takeLatest(Types.LOG_OUT, handleLogOut),
]

export default sagas

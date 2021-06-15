import { takeLatest, select, put, call } from 'redux-saga/effects'
import Router from 'next/router'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { stopSubmit } from 'redux-form'
import i18n from '~i18n'
import UsersService from '~services/users'
import { feathersClient } from '~services/ApiClient'
import socketClient from '~lib/SocketClient'
import { fieldTypes } from '~utils/formValidators'
import { Types } from './creators'

const usersService = new UsersService()

const snackbarConfig = {
  position: 'top-right',
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

function* handleLogIn({ params }) {
  try {
    const response = yield call(feathersClient.authenticate, {
      strategy: 'local',
      ...params,
    })
    if (response.accessToken) {
      const currentUser = get(response, 'user', {})
      const firstName = get(currentUser, 'profile.firstName', '')
      const SocketClient = new socketClient()
      SocketClient.socketAuth(response.accessToken)
      yield put({
        type: Types.LOG_IN_SUCCESS,
        data: { currentUser, accessToken: response.accessToken },
      })
      toast.success(`${i18n.t('snackbar.welcome')} ${firstName}!`, {
        ...snackbarConfig,
        autoClose: 2000,
      })
      setTimeout(() => {
        Router.push('/')
      }, 600)
      return currentUser
    } else {
      throw new Error(i18n.t('errors.oops'))
    }
  } catch (e) {
    toast.error(i18n.t('errors.invalid_credentials', snackbarConfig))
    yield put(
      stopSubmit('signInForm', {
        [fieldTypes.email]: 'errors.invalid_credentials',
        [fieldTypes.password]: 'errors.invalid_credentials',
      })
    )
    console.error(e)
    yield put({ type: Types.LOG_IN_FAILURE, error: e })
    return {}
  }
}

function* handleSignUp({ params }) {
  try {
    yield call(usersService.create, params)
    yield call(handleLogIn, {
      params: {
        email: params.email,
        password: params.password,
      },
    })
    yield put({ type: Types.SIGN_UP_SUCCESS })
  } catch (e) {
    console.error(e)
    if (get(e, 'errors.username')) {
      stopSubmit('signUpForm', {
        [fieldTypes.username]: 'errors.invalidUsername',
      })
      toast.error(i18n.t('errors.invalidUsername', snackbarConfig))
    } else if (get(e, 'errors.email')) {
      stopSubmit('signUpForm', {
        [fieldTypes.username]: 'errors.emailExists',
      })
      toast.error(i18n.t('errors.emailExists', snackbarConfig))
    } else {
      toast.error(i18n.t('errors.oops', snackbarConfig))
    }
    yield put({ type: Types.SIGN_UP_FAILURE, error: e })
  }
}

function* handleFetchSelf() {
  try {
    yield call(feathersClient.reAuthenticate)
    const state = yield select()
    const userId = get(state, 'auth.currentUser._id')
    if (!userId) throw new Error('Missing user id')
    const data = yield call(usersService.get, userId)
    yield put({ type: Types.FETCH_SELF_SUCCESS, data })
  } catch (e) {
    yield put({ type: Types.FETCH_SELF_FAILURE, error: e })
  }
}

function* handleLogOut() {
  try {
    window.localStorage.removeItem('feathers-jwt')
    yield put({ type: Types.LOG_OUT_SUCCESS, data: {} })
  } catch (e) {
    console.error(e)
    yield put({ type: Types.LOG_OUT_FAILURE })
  }
}

function* handleUpdateSelf({ params }) {
  try {
    const response = yield call(usersService.patch, params.userId, params)
    yield put({ type: Types.UPDATE_SELF_SUCCESS, data: response })
  } catch (e) {
    console.error(e)
    yield put({ type: Types.UPDATE_SELF_FAILURE, error: e })
  }
}

const sagas = [
  takeLatest(Types.LOG_IN, handleLogIn),
  takeLatest(Types.SIGN_UP, handleSignUp),
  takeLatest(Types.LOG_OUT, handleLogOut),
  takeLatest(Types.FETCH_SELF, handleFetchSelf),
  takeLatest(Types.UPDATE_SELF, handleUpdateSelf),
]

export default sagas

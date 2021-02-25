import { takeLatest, select, put, call } from 'redux-saga/effects'
import Router from 'next/router'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { stopSubmit, updateSyncErrors } from 'redux-form'
import i18n from '~i18n'
import UsersService from '~services/users'
import FeathersClient from '~lib/FeathersClient'
import { fieldTypes } from '~utils/formValidators'
import { Types } from './creators'

const app = new FeathersClient()
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
    const response = yield call(app.authenticate, {
      strategy: 'local',
      ...params,
    })
    if (response.accessToken) {
      const currentUser = get(response, 'user', {})
      const firstName = get(currentUser, 'profile.firstName', '')
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
    return null
  }
}

function* handleSignUp({ params }) {
  try {
    const user = yield call(usersService.create, params)
    if (user) {
      yield call(handleLogIn, {
        params: {
          email: params.email,
          password: params.password,
        },
      })
      yield put({ type: Types.SIGN_UP_SUCCESS })
    }
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
    const state = yield select()
    const userId = get(state, 'auth.currentUser._id')
    let data
    if (userId) {
      data = yield call(usersService.get, userId)
    }
    yield put({ type: Types.FETCH_SELF_SUCCESS, data })
  } catch (e) {
    yield put({ type: Types.FETCH_SELF_FAILURE, error: e })
  }
}

function* handleLogOut() {
  try {
    app.logout.removeAccessToken(true)
    yield call(app.logout)
  } catch (e) {
    console.error(e)
  }
}

const sagas = [
  takeLatest(Types.LOG_IN, handleLogIn),
  takeLatest(Types.SIGN_UP, handleSignUp),
  takeLatest(Types.LOG_OUT, handleLogOut),
  takeLatest(Types.FETCH_SELF, handleFetchSelf),
]

export default sagas

import { takeLatest, put, call } from 'redux-saga/effects'
import UsersService from '~services/users'
import { Types } from './creators'

const usersService = new UsersService()

function* handleFetchUserById(action) {
  try {
    const { id } = action
    const data = yield call(usersService.get, id)
    yield put({
      type: Types.FETCH_USER_BY_ID_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_USER_BY_ID_FAILURE })
  }
}

const sagas = [takeLatest(Types.FETCH_USER_BY_ID, handleFetchUserById)]

export default sagas

import { takeLatest, put, call, select } from 'redux-saga/effects'
import ChatStatsService from '~services/chatStats'
import { isLoggedInSelector } from '../auth/selectors'

import { Types } from './creators'

const chatStatsService = new ChatStatsService()

function* fetchChatStats() {
  try {
    const loggedIn = yield select((state) => isLoggedInSelector(state))
    if (!loggedIn) {
      yield put({
        type: Types.FETCH_CHAT_STATS_SUCCESS,
        data: null,
      })
      return
    }
    const data = yield call(chatStatsService.find)
    yield put({
      type: Types.FETCH_CHAT_STATS_SUCCESS,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: Types.FETCH_CHAT_STATS_FAILURE })
  }
}

const sagas = [takeLatest(Types.FETCH_CHAT_STATS, fetchChatStats)]

export default sagas

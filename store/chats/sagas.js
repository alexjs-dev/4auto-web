import { takeLatest, put, call, select } from 'redux-saga/effects'
import { omit } from 'lodash'
import ChatStatsService from '~services/chatStats'
import ChatsService from '~services/chats'

import { isLoggedInSelector } from '../auth/selectors'

import { Types } from './creators'

const chatStatsService = new ChatStatsService()
const chatsService = new ChatsService()

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

function* handleFetchChats(action) {
  const successType = Types.FETCH_CHATS_SUCCESS
  const failureType = Types.FETCH_CHATS_FAILURE
  try {
    const { params } = action
    const prevPagination = yield select((state) => state.chats.chatsPagination)
    const { limit = 10, skip = 0, total = 0 } = prevPagination

    if (skip + limit < total || total === 0) {
      const response = yield call(chatsService.find, {
        query: {
          $limit: limit,
          $sort: { createdAt: -1 },
          ...(skip > 0 ? { $skip: skip } : {}),
          ...omit(params, ['resetPagination']),
        },
      })
      const { data, ...pagination } = response
      yield put({
        type: successType,
        data,
        pagination: {
          ...pagination,
          skip: pagination.skip + pagination?.limit || 10,
        },
      })
    } else {
      yield put({
        type: successType,
        data: {},
        pagination: prevPagination,
      })
    }
  } catch (error) {
    console.error(error)
    yield put({ type: failureType })
  }
}

const sagas = [
  takeLatest(Types.FETCH_CHAT_STATS, fetchChatStats),
  takeLatest(Types.FETCH_CHATS, handleFetchChats),
]

export default sagas

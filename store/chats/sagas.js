import { takeLatest, put, call, select } from 'redux-saga/effects'
import { omit, get } from 'lodash'
import { toast } from 'react-toastify'
import i18n from '~i18n'
import Router from 'next/router'
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
          $sort: { updatedAt: -1 },
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

function* handleFetchChat(action) {
  const successType = Types.FETCH_CHAT_SUCCESS
  const failureType = Types.FETCH_CHAT_FAILURE
  try {
    const { id } = action
    const data = yield call(chatsService.get, id)
    yield put({
      type: successType,
      data,
    })
  } catch (error) {
    console.error(error)
    yield put({ type: failureType })
  }
}

function* handleCreateChat(action) {
  const successType = Types.CREATE_CHAT_SUCCESS
  const failureType = Types.CREATE_CHAT_FAILURE
  try {
    const { params } = action
    const redirect = get(params, 'redirect')
    const data = yield call(chatsService.create, omit(params, ['redirect']))
    console.log('data', data);
    yield put({
      type: successType,
      data,
    })
    if (redirect) {
      setTimeout(() => {
        Router.push('/messages')
      }, 600)
    }
    if (params.offer) {
      toast.success(i18n.t('snackbar.offerSent'))
    }
  } catch (error) {
    const type = get(error, 'data.error')
    if (type === 'offerThrottled') {
      toast.error(i18n.t('errors.tooManyRequestsTryAgain'))
    }
    yield put({ type: failureType })
  }
}

const sagas = [
  takeLatest(Types.FETCH_CHAT_STATS, fetchChatStats),
  takeLatest(Types.FETCH_CHATS, handleFetchChats),
  takeLatest(Types.FETCH_CHAT, handleFetchChat),
  takeLatest(Types.CREATE_CHAT, handleCreateChat),
]

export default sagas

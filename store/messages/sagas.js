import { takeLatest, put, call, select, takeEvery } from 'redux-saga/effects'
import MessageService from '~services/messages'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'
import i18n from '~i18n'
import reverse from 'lodash/reverse'
import { Types } from './creators'

const messagesService = new MessageService()

function* handleFetchMessages(action) {
  const successType = Types.FETCH_MESSAGES_SUCCESS
  const failureType = Types.FETCH_MESSAGES_FAILURE
  const { id, params } = action
  const prevPagination = yield select((state) =>
    get(state.messagesPagination, id)
  )

  const chatId = id
  const limit = get(prevPagination, 'limit', 10)
  const skip = get(prevPagination, 'skip', 0)
  const total = get(prevPagination, 'total', 0)
  try {
    if (skip + limit < total || total === 0) {
      const response = yield call(messagesService.find, {
        query: {
          $limit: limit,
          $sort: { createdAt: -1 },
          ...(skip > 0 ? { $skip: skip } : {}),
          ...omit(params, ['resetPagination']),
          chatId,
        },
      })
      const { data, ...pagination } = response
      yield put({
        type: successType,
        data: reverse(data),
        chatId,
        pagination: {
          ...pagination,
          skip: pagination.skip + pagination?.limit || 10,
        },
      })
    } else {
      yield put({
        type: successType,
        data: [],
        pagination: prevPagination,
      })
    }
  } catch (error) {
    yield put({ type: failureType })
  }
}

function* handleCreateMessage(action) {
  try {
    const { data } = action
    const response = yield call(messagesService.create, data)
    yield put({
      type: Types.CREATE_MESSAGE_SUCCESS,
      data: response,
    })
  } catch (error) {
    const type = get(error, 'data.error')
    if (type === 'offerThrottled' || type === 'messageThrottled') {
      toast.error(i18n.t('errors.tooManyRequestsTryAgain'))
    }
    yield put({ type: Types.CREATE_MESSAGE_FAILURE })
  }
}

function* handleMessagePush(action) {
  try {
    const { data } = action
    const state = yield select()
    const currentChatId = get(state, 'chats.currentChat._id')
    if (currentChatId === data.chatId) {
      yield call(messagesService.patch, data._id, {
        isRead: true,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

const sagas = [
  takeLatest(Types.FETCH_MESSAGES, handleFetchMessages),
  takeLatest(Types.CREATE_MESSAGE, handleCreateMessage),
  takeEvery(Types.PUSH_MESSAGE, handleMessagePush),
]

export default sagas

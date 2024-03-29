import { createReducer } from 'reduxsauce'
import { Types } from './creators'
import { uniqBy, get } from 'lodash'

const INITIAL_STATE = {
  messages: {},
  messagesPagination: {},
  loadingMessages: false,
  sendingMessage: false,
}

const fetchMessages = (state, { params }) => ({
  ...state,
  messages: get(params, 'resetPagination') ? {} : state.messages,
  messagesPagination: get(params, 'resetPagination')
    ? {}
    : state.messagesPagination,
  loadingMessages: true,
})

const pushMessage = (state, { data }) => ({
  ...state,
  messages: {
    ...state.messages,
    [data.chatId]: [...get(state.messages, data.chatId, []), data],
  },
})

const fetchMessagesSuccess = (state, { data, chatId, pagination }) => {
  const id = chatId || get(data, '[0].chatId')
  return {
    ...state,
    messages: {
      ...state.messages,
      [id]: [...get(state.messages, id, []), ...data],
    },
    messagesPagination: {
      ...state.messagesPagination,
      [id]: pagination,
    },
    loadingMessages: false,
    pagination,
  }
}

const fetchMessagesFailure = (state) => ({
  ...state,
  loadingMessages: false,
})

const createMessage = (state) => ({
  ...state,
  sendingMessage: true,
})
const createMessageSuccess = (state, { data }) => ({
  ...state,
  sendingMessage: false,
  messages: {
    ...state.messages,
    [data.chatId]: uniqBy(
      [...get(state.messages, data.chatId, {}), data],
      '_id'
    ),
  },
})
const createMessageFailure = (state) => ({
  ...state,
  sendingMessage: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_MESSAGES]: fetchMessages,
  [Types.FETCH_MESSAGES_SUCCESS]: fetchMessagesSuccess,
  [Types.FETCH_MESSAGES_FAILURE]: fetchMessagesFailure,
  [Types.PUSH_MESSAGE]: pushMessage,
  [Types.CREATE_MESSAGE]: createMessage,
  [Types.CREATE_MESSAGE_SUCCESS]: createMessageSuccess,
  [Types.CREATE_MESSAGE_FAILURE]: createMessageFailure,
})

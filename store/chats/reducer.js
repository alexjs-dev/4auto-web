import { createReducer } from 'reduxsauce'
import { Types } from './creators'
import { keyBy, get } from 'lodash'

const INITIAL_STATE = {
  loadingChatStats: false,
  chatStats: null,
  currentChat: {},
  loadingChats: false,
  chatsPagination: {},
  chats: {},
}

const fetchChatStats = (state) => ({
  ...state,
  loadingChatStats: true,
})

const fetchChatStatsSuccess = (state, { data }) => ({
  ...state,
  loadingChatStats: false,
  chatStats: data,
})

const fetchChatStatsFailure = (state) => ({
  ...state,
  loadingChatStats: false,
})

const fetchChats = (state, { params }) => ({
  ...state,
  chats: get(params, 'resetPagination') ? {} : state.chats,
  chatsPagination: get(params, 'resetPagination') ? {} : state.chatsPagination,
  loadingChats: true,
})

const fetchChatsSuccess = (state, { data, pagination }) => ({
  ...state,
  chats: {
    ...state.chats,
    ...keyBy(data, '_id'),
  },
  loadingChats: false,
  chatsPagination: pagination,
})

const fetchChatsFailure = (state) => ({
  ...state,
  loadingChats: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_CHAT_STATS]: fetchChatStats,
  [Types.FETCH_CHAT_STATS_SUCCESS]: fetchChatStatsSuccess,
  [Types.FETCH_CHAT_STATS_FAILURE]: fetchChatStatsFailure,
  [Types.FETCH_CHATS]: fetchChats,
  [Types.FETCH_CHATS_SUCCESS]: fetchChatsSuccess,
  [Types.FETCH_CHATS_FAILURE]: fetchChatsFailure,
})

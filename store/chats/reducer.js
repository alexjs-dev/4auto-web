import { createReducer } from 'reduxsauce'
import { Types } from './creators'
import { keyBy, get } from 'lodash'

const INITIAL_STATE = {
  loadingChatStats: false,
  chatStats: {},
  currentChat: {},
  loadingChats: false,
  loadingChat: false,
  creatingChat: false,
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

const pushUnreadMessage = (state, { data }) => ({
  ...state,
  chats: {
    ...state.chats,
    [data.chatId]: {
      ...get(state.chats, data.chatId, {}),
      lastMessage: data,
    },
  },
  chatStats: {
    ...state.chatStats,
    ...(data.chatId !== state.currentChat._id
      ? {
          unreads: {
            ...get(state.chatStats, 'unreads', {}),
            [data.chatId]:
              get(state.chatStats, `unreads.${data.chatId}`, 0) + 1,
          },
        }
      : {}),
  },
})

const fetchChat = (state, { id }) => ({
  ...state,
  currentChat: get(state.chats, id, { _id: id }),
  loadingChat: true,
})

const fetchChatSuccess = (state, { data }) => ({
  ...state,
  currentChat: data,
  loadingChat: false,
})

const fetchChatFailure = (state) => ({
  ...state,
  loadingChat: false,
})

const createChat = (state, { id }) => ({
  ...state,
  creatingChat: true,
})

const createChatSuccess = (state, { data }) => ({
  ...state,
  currentChat: { ...state.chats, [data._id]: data },
  creatingChat: false,
})

const createChatFailure = (state) => ({
  ...state,
  creatingChat: false,
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_CHAT_STATS]: fetchChatStats,
  [Types.FETCH_CHAT_STATS_SUCCESS]: fetchChatStatsSuccess,
  [Types.FETCH_CHAT_STATS_FAILURE]: fetchChatStatsFailure,
  [Types.FETCH_CHATS]: fetchChats,
  [Types.FETCH_CHATS_SUCCESS]: fetchChatsSuccess,
  [Types.FETCH_CHATS_FAILURE]: fetchChatsFailure,
  [Types.CREATE_CHAT]: createChat,
  [Types.CREATE_CHAT_SUCCESS]: createChatSuccess,
  [Types.CREATE_CHAT_FAILURE]: createChatFailure,
  [Types.PUSH_UNREAD_MESSAGE]: pushUnreadMessage,
  [Types.FETCH_CHAT]: fetchChat,
  [Types.FETCH_CHAT_SUCCESS]: fetchChatSuccess,
  [Types.FETCH_CHAT_FAILURE]: fetchChatFailure,
})

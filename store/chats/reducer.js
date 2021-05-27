import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  loadingChatStats: false,
  chatStats: null,
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

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_CHAT_STATS]: fetchChatStats,
  [Types.FETCH_CHAT_STATS_SUCCESS]: fetchChatStatsSuccess,
  [Types.FETCH_CHAT_STATS_FAILURE]: fetchChatStatsFailure,
})

import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchChatStats: [],
    fetchChatStatsSuccess: ['data'],
    fetchChatStatsFailure: [],
    fetchChats: ['params'],
    fetchChatsSuccess: ['data'],
    fetchChatsFailure: [],
  },
  {}
)

export default Creators

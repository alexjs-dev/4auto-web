export const chatStatsSelector = (state) => state.chats.chatStats
export const chatStatsLoadingSelector = (state) => state.chats.loadingChatStats

export const chatsSelector = (state) => state.chats.chats
export const chatsLoadingSelector = (state) => state.chats.loadingChats
export const chatsPaginationSelector = (state) => state.chats.chatsPagination

export const currentChatSelector = (state) => state.chats.currentChat
export const currentChatLoader = (state) => state.chats.loadingChat

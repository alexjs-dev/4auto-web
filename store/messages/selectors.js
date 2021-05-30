export const messageSelector = (state) => state.messages.messages
export const messagesPaginationSelector = (state) =>
  state.messages.messagesPagination

export const messagesLoadingSelector = (state) => state.messages.loadingMessages
export const messagesIsSendingSelector = (state) =>
  state.messages.sendingMessage

import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchMessages: ['id', 'params'],
    fetchMessagesSuccess: ['data', 'pagination', 'chatId'],
    fetchMessagesFailure: [],
    createMessage: ['data'],
    pushMessage: ['data'],
    createMessageSuccess: ['data'],
    createMessageFailure: [],
  },
  {}
)

export default Creators

import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchMessages: ['chatId', 'params'],
    fetchMessagesSuccess: ['data'],
    fetchMessagesFailure: [],
    createMessage: ['data'],
    createMessageSuccess: ['data'],
    createMessageFailure: [],
  },
  {}
)

export default Creators

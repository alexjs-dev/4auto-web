import ApiClient from './ApiClient'

class MessagesService extends ApiClient {
  constructor() {
    super('messages')
  }
}

export default MessagesService

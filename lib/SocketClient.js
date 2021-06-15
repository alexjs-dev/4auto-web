import socketio from '@feathersjs/socketio-client'
import feathers from '@feathersjs/feathers'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import ChatCreators from '../store/chats/creators'
import MessagesCreators from '../store/messages/creators'
import store from '../store'

const baseUrl = process.env.API_URL
const socket = io(baseUrl)

class SocketClient {
  constructor() {
    this.accessToken = window.localStorage.getItem('feathers-jwt')
    this.app = feathers()
    this.app.configure(socketio(socket))

    if (process.browser) {
      this.app.configure(
        auth({
          storage: window.localStorage,
        })
      )
      this.socketAuth(this.accessToken)
    }
  }

  socketAuth(accessToken) {
    if (!accessToken || (accessToken && accessToken.trim().length === 0)) {
      return
    }
    socket.on('connect', () => {
      socket.emit(
        'create',
        'authentication',
        {
          strategy: 'jwt',
          accessToken: this.accessToken,
        },
        function (err, result) {
          if (!err) console.log(result)
        }
      )
    })

    this.app.io.on('disconnect', (reason) => {
      console.warn('Socket disconnection', reason)
    })

    this.app.service('messages').on('created', (message) => {
      store.dispatch(ChatCreators.pushUnreadMessage(message))
      store.dispatch(MessagesCreators.pushMessage(message))
    })

    this.app.service('chats').on('created', (chat) => {
      console.log('chat', chat)
    })
  }
}

export default SocketClient

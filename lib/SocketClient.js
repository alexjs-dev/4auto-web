import socketio from '@feathersjs/socketio-client'
import feathers from '@feathersjs/feathers'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import ChatCreators from '../store/chats/creators'
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
    }
    if (this.accessToken && this.accessToken.trim() !== '') {
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
        console.log('message', message)
      })

      this.app.service('chats').on('created', (chat) => {
        console.log('chat', chat)
      })
    }
  }
}

export default SocketClient

//   this.feathers.on('authenticated', () => {
//     console.log('socket auth ok')
//     this.messages.on('created', (msg) => {
//       console.log(msg)
//     })
//   })

//   this.messages.on('created', (msg) => {
//     console.log(msg)
//   })

// this.feathers.configure(socketio(socket))
// client.authenticate().catch((e) => {
//   console.error(e)
// })

// client.on('authenticated', () => {
//   console.log('socket connection success')

//   if (isEmpty(messagesService.listeners('created'))) {
//     messagesService.on('created', (message) => {
//       onMessageCreated(store, message);
//     });
//   }
//   if (isEmpty(verifyOnceService.listeners('created'))) {
//     verifyOnceService.on('created', (result) => {
//       onVerifyOnceCreated(store, result);
//     });
//   }
//})

//   socket.on('connect', () => {
//     console.log('on socket connection')
//     socket.emit(
//       'create',
//       'authentication',
//       {
//         strategy: 'jwt',
//         accessToken: this.accessToken,
//       },
//       function (error, response) {
//         if (error) console.error(error)
//         if (response && !error) {
//           this.userId = response.user._id
//         }
//       }
//     )

//     socket.on(this.userId, (msg) => {
//       console.log('message: ' + msg)
//     })
//   })

// Set up Socket.io client with the socket
//   app.configure(socketio(socket))

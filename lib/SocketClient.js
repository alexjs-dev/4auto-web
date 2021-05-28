import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import { feathersClient } from '~services/ApiClient'

const baseUrl = process.env.API_URL
const socket = io(baseUrl)

class SocketClient {
  constructor() {
    this.userId
    this.accessToken = window.localStorage.getItem('feathers-jwt')
    this.feathers = feathersClient.app
    this.messages = this.feathers.service('messages')

    if (this.accessToken && this.accessToken !== '') {
      this.feathers.configure(socketio(socket))

      // Receive real-time events through Socket.io
      this.feathers.app.service('messages').on('created', (message) => {
        console.log('message', message)
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

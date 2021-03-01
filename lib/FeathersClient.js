import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import rest from '@feathersjs/rest-client'
import io from 'socket.io-client'
import axios from 'axios'
import auth from '@feathersjs/authentication-client'

const baseUrl = process.env.API_URL
const socketConnection = false

class FeathersClient {
  constructor() {
    this.socketClient = io(baseUrl)
    this.restClient = rest(baseUrl)
    this.app = feathers()
    this.app.configure(
      socketConnection
        ? socketio(this.socketClient)
        : this.restClient.axios(axios)
    )
    if (process.browser) {
      this.app.configure(
        auth({
          storage: window.localStorage,
        })
      )
    }
  }

  client = () => this.app

  service = (service) => this.app.service(service)

  authenticate = (config) => this.app.authenticate(config)

  reAuthenticate = () => this.app.reAuthenticate()
}

export default FeathersClient

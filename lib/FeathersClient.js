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

  disconnect = async () => {
    console.log('Disconnecting...')
    if (process.browser) {
      window.localStorage.removeItem('feathers-jwt')
      await this.app.logout()
    }
  }

  reAuthenticate = () => {
    console.log('Re-authenticating...')
    try {
      this.app.reAuthenticate()
    } catch (e) {
      console.error('Authentication error', e)
      this.disconnect()
    }
  }

  authenticate = async (config) => {
    console.log('Authenticating...')
    try {
      if (process.browser) {
        const response = await this.app.authenticate(config)
        if (response.accessToken)
          window.localStorage.setItem('feathers-jwt', response.accessToken)
        return response
      }
    } catch (e) {
      console.error('Authentication error', e)
      await this.disconnect()
    }
  }
}

export default FeathersClient

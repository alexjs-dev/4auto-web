import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { Creators } from '../store/auth/creators'
import store from '../store'
import axios from 'axios'
import auth from '@feathersjs/authentication-client'

const baseUrl = process.env.API_URL

class FeathersClient {
  constructor() {
    this.restClient = rest(baseUrl)
    this.socket
    this.app = feathers()
    this.app.configure(this.restClient.axios(axios))
    if (process.browser) {
      this.app.configure(
        auth({
          storage: window.localStorage,
          cookie: 'feathers-jwt'
        })
      )
    }
  }

  client = () => this.app

  service = (service) => this.app.service(service)

  disconnect = async () => {
    console.log('Disconnecting...')
    if (process.browser) {
      store.dispatch(Creators.logOut())
      window.localStorage.removeItem('feathers-jwt')
      await this.app.logout()
    }
  }

  reAuthenticate = async () => {
    console.log('Re-authenticating...')
    try {
      await this.app.reAuthenticate()
      // this.socket = new SocketClient()
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
        if (response.accessToken) {
          window.localStorage.setItem('feathers-jwt', response.accessToken)
        }
        return response
      }
    } catch (e) {
      console.error('Authentication error', e)
      await this.disconnect()
    }
  }
}

export default FeathersClient

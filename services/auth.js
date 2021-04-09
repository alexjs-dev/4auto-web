// import ApiClient from './ApiClient'
// import client from '~services/socketClient'

// class AuthService extends ApiClient {
//   constructor() {
//     super('authentication')
//     this.feathers = this.client.feathersClient
//   }

//   getToken = async () => {
//     const token = await this.feathers.passport.getJWT()
//     return token
//   }

//   logOut = async () => {
//     if (process.browser) {
//       window.localStorage.removeItem('feathers-jwt')
//       client.services.messages.removeListener('created')
//       client.defaultSocket.disconnect()
//       await this.feathers.logout()
//     }
//   }

//   authenticate = async ({ accessToken }) => {
//     if (process.browser) {
//       if (!client.io.authenticated || !client.io.connected) {
//         client.initSocket()
//       }
//       if (client.defaultSocket) {
//         client.defaultSocket.connect()
//       }
//       window.localStorage.setItem('feathers-jwt', accessToken)
//       await this.feathers.authenticate({
//         strategy: 'jwt',
//         accessToken,
//       })
//     }
//   }
// }

// export default AuthService

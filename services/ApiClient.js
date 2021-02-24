import FeathersClient from '~lib/FeathersClient'

const app = new FeathersClient()

class ApiClient {
  constructor(namespace) {
    this.namespace = namespace
    this.service = app.service(namespace)
    this.app = app
  }

  find = (params) => {
    return this.service.find(params)
  }

  get = (id, params) => {
    return this.service.get(id, params)
  }

  create = (data, params) => {
    return this.service.create(data, params)
  }

  update = (id, data, params) => {
    return this.service.update(id, data, params)
  }

  patch = (id, data, params) => {
    return this.service.patch(id, data, params)
  }

  remove = (id, params) => {
    return this.service.remove(id, params)
  }
}

export default ApiClient

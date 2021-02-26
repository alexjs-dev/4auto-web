import FeathersClient from '~lib/FeathersClient'

const feathersClient = new FeathersClient()

class ApiClient {
  constructor(namespace) {
    this.namespace = namespace
    this.service = feathersClient.service(namespace)
    this.app = feathersClient
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

export { feathersClient }

export default ApiClient

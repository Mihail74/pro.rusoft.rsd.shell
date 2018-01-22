export default class LoadableMapModel {
  constructor (type, data = {}) {
    this.type = type
    this.data = data
    Object.freeze(this)
  }

  put (key, value) {
    return new LoadableMapModel(this.type, {
      ...this.data,
      [key]: value
    })
  }

  remove (key) {
    const data = {
      ...this.data
    }
    delete data[key]
    return new LoadableMapModel(this.type, data)
  }

  get (key) {
    return this.data[key]
  }
}

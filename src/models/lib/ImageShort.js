import Joi from 'joi'
import AbstractModel from './AbstractModel'

export const schema = {
  format: Joi.string(),
  width: Joi.number(),
  height: Joi.number(),
  url: Joi.string(),
  version: Joi.number()
}

export default class ImageShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id () {
    return `${this.url},${this.version || 0}`
  }

  static fromJS (data) {
    return data == null ? null : new ImageShort({
      format: data.format,
      width: data.width,
      height: data.height,
      url: data.secure_url,
      version: data.version
    })
  }
}

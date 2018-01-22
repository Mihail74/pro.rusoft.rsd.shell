import Joi from 'joi'
import AbstractModel from './AbstractModel'

export const schemaFactory = (type) => ({
  isLoading: Joi.boolean().required(),
  isLoaded: Joi.boolean().required(),
  value: Joi.object().type(type).allow(null)
})

export default class LoadableModel extends AbstractModel {
  constructor (type, data = {
    isLoading: true,
    isLoaded: false,
    value: null
  }) {
    super(data, schemaFactory(type))
    this.type = type
    Object.freeze(this)
  }

  loaded (value) {
    return new LoadableModel(this.type, {
      isLoaded: true,
      isLoading: false,
      value
    })
  }

  loading () {
    return new LoadableModel(this.type, {
      isLoaded: this.isLoaded,
      isLoading: true,
      value: this.value
    })
  }
}

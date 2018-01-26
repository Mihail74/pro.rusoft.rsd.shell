import Joi from 'joi'
import AbstractModel from './AbstractModel'
import TransferShort from './TransferShort'

export const schema = () => ({
  descriptor: Joi.object().type(TransferShort)
})

export default class TransferModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id () {
    return this.descriptor.id
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new TransferModel(transfer => ({
      ...data,
      descriptor: TransferShort.fromJS(data, { ...context })
    }))
  }
}

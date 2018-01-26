import Joi from 'joi'
import AbstractModel from './AbstractModel'
import WalletShort from './WalletShort'
import TransferModel from './TransferModel'

export const schema = () => ({
  descriptor: Joi.object().type(WalletShort),
  incoming: Joi.array(Joi.object().type(TransferModel)),
  outgoing: Joi.array(Joi.object().type(TransferModel))
})

export default class ProjectModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id () {
    return this.descriptor.id
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new ProjectModel(project => ({
      ...data,
      descriptor: WalletShort.fromJS(data, { ...context })
    }))
  }
}

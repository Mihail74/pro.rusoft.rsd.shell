import Joi from 'joi'
import AbstractModel from './AbstractModel'
import UserShort from './UserShort'

export const schema = () => ({
  id: Joi.string().required(),
  address: Joi.string().required(),
  createdDate: Joi.object().type(Date).required(),
  type: Joi.string().allow(['INVESTING', 'PERSONAL']),
  user: Joi.object().type(UserShort).required()
})

export default class WalletShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new WalletShort(wallet => ({
      ...data,
      user: context.user ? context.user : UserShort.fromJS(data.user),
      createdDate: new Date(data.createdDate)
    }))
  }
}

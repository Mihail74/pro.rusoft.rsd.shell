import Joi from 'joi'
import AbstractModel from './AbstractModel'
// import WalletShort from './WalletShort'
// import AmountShort from './AmountShort'

export const schema = () => ({
  id: Joi.string().required()
  // sender: Joi.string().required(),
  // recepient: Joi.string().required(),
  // amount: Joi.object().type(AmountShort).required(),
  // createdDate: Joi.object().type(Date).required()
})

export default class TransferShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new TransferShort(transfer => ({
      id: data.id
      // createdDate: data.createdDate
      // sender: WalletShort.fromJS(data.sender),
      // recepient: WalletShort.fromJS(data.recepient),
      // amount: AmountShort.fromJS(data.amount)
    }))
  }
}

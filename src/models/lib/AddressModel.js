import Joi from 'joi'
import BigNumber from 'bignumber.js'
import AbstractModel from './AbstractModel'

export const schema = () => ({
  address: Joi.string().required(),
  balance: Joi.object().type(BigNumber).required(),
  unconfirmedBalance: Joi.object().type(BigNumber).required()
})

export default class AddressModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new AddressModel({
      address: data.address,
      balance: new BigNumber(data.balance),
      unconfirmedBalance: new BigNumber(data.unconfirmedBalance)
    })
  }
}

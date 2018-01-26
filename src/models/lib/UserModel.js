import Joi from 'joi'
import AbstractModel from './AbstractModel'
import UserShort from './UserShort'
import TransferWithdrawalModel from './TransferWithdrawalModel'
import TransferDepositModel from './TransferDepositModel'

export const schema = () => ({
  descriptor: Joi.object().type(UserShort),
  deposites: Joi.array(Joi.object().type(TransferDepositModel)),
  withdrawals: Joi.array(Joi.object().type(TransferWithdrawalModel))
})

export default class UserModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id () {
    return this.descriptor.id
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new UserModel(user => ({
      ...data,
      descriptor: UserShort.fromJS(data.descriptor, { ...context }),
      deposites: AbstractModel.buildArray(data.deposites, TransferDepositModel.fromJS, { ...context, user }),
      withdrawals: AbstractModel.buildArray(data.withdrawals, TransferWithdrawalModel.fromJS, { ...context, user })
    }))
  }
}

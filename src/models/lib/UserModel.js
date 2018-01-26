import Joi from 'joi'
import AbstractModel from './AbstractModel'
import UserShort from './UserShort'
import ProjectShort from './ProjectShort'
import WalletShort from './WalletShort'
import TransferWithdrawalModel from './TransferWithdrawalModel'
import TransferDepositModel from './TransferDepositModel'

export const schema = () => ({
  descriptor: Joi.object().type(UserShort),
  investingWallet: Joi.object().type(WalletShort).required(),
  personalWallet: Joi.object().type(WalletShort).required(),
  deposites: Joi.array().items(Joi.object().type(TransferDepositModel)),
  withdrawals: Joi.array().items(Joi.object().type(TransferWithdrawalModel)),
  projects: Joi.array().items(Joi.object().type(ProjectShort))
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
    return data == null ? null : new UserModel(user => {
      const descriptor = UserShort.fromJS(data.descriptor, { ...context })
      return {
        ...data,
        descriptor,
        projects: AbstractModel.buildArray(data.projects, ProjectShort.fromJS, { ...context, owner: descriptor }),
        investingWallet: WalletShort.fromJS(data.investingWallet, { ...context, user: descriptor }),
        personalWallet: WalletShort.fromJS(data.personalWallet, { ...context, user: descriptor }),
        deposites: AbstractModel.buildArray(data.deposites, TransferDepositModel.fromJS, { ...context, user: descriptor }),
        withdrawals: AbstractModel.buildArray(data.withdrawals, TransferWithdrawalModel.fromJS, { ...context, user: descriptor })
      }
    })
  }
}

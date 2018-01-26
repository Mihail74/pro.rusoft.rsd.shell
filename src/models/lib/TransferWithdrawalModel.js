import Joi from 'joi'
import AbstractModel from './AbstractModel'
import TransferShort from './TransferShort'
import ProjectShort from './ProjectShort'
import UserShort from './UserShort'

export const schema = () => ({
  transfer: Joi.object().type(TransferShort),
  project: Joi.object().type(ProjectShort),
  user: Joi.object().type(UserShort)
})

export default class TransferWithdrawalModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new TransferWithdrawalModel(transferDeposit => ({
      ...data,
      user: context.user
        ? context.user.descriptor
        : UserShort.fromJS(data.user, { ...context }),
      project: context.project
        ? context.project.descriptor
        : ProjectShort.fromJS(data.project, { ...context }),
      transfer: TransferShort.fromJS(data, { ...context })
    }))
  }
}

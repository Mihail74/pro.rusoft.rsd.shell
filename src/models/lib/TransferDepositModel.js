import Joi from 'joi'
import AbstractModel from './AbstractModel'
import TransferShort from './TransferShort'
import ProjectShort from './ProjectShort'
import UserShort from './UserShort'

export const schema = () => ({
  id: Joi.string().required(),
  transfer: Joi.object().type(TransferShort),
  project: Joi.object().type(ProjectShort),
  user: Joi.object().type(UserShort)
})

export default class TransferDepositModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new TransferDepositModel(transferDeposit => ({
      ...data,
      user: context.user
        ? context.user
        : UserShort.fromJS(data.user, { ...context }),
      project: context.project
        ? context.project
        : ProjectShort.fromJS(data.project, { ...context }),
      transfer: TransferShort.fromJS(data, { ...context })
    }))
  }
}

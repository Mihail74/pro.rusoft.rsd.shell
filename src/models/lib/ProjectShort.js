import Joi from 'joi'
import AbstractModel from './AbstractModel'
import UserShort from './UserShort'
import ImageShort from './ImageShort'

export const schema = () => ({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  thumbnail: Joi.object().type(ImageShort).allow(null),
  owner: Joi.object().type(UserShort).required(),
  createdDate: Joi.object().type(Date).required(),
  members: Joi.array().items(Joi.object().type(UserShort)).allow(null),
  targetValue: Joi.number(),
  balance: Joi.number(),
  startedDate: Joi.object().type(Date).allow(null),
  dueDate: Joi.object().type(Date).allow(null),
  status: Joi.string().required(),
  address: Joi.string().required()
})

export default class ProjectShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new ProjectShort(project => ({
      ...data,
      thumbnail: ImageShort.fromJS(data.thumbnail),
      owner: context.owner ? context.owner : UserShort.fromJS(data.owner),
      createdDate: new Date(data.createdDate),
      startedDate: new Date(data.startedDate),
      dueDate: new Date(data.dueDate),
      members: AbstractModel.buildArray(data.members, UserShort.fromJS)
    }))
  }
}

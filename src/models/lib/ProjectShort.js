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
  createdDate: Joi.object().type(Date),
  members: Joi.array().items(Joi.object().type(UserShort)).allow(null)
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
      members: AbstractModel.buildArray(data.members, UserShort.fromJS)
    }))
  }
}

import Joi from 'joi'
import AbstractModel from './AbstractModel'

export const schema = () => ({
  factory: Joi.func().arity(0).required(),
  data: Joi.object()
})

export default class DialogModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }
}

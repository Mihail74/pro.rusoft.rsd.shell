import Joi from 'joi'
import BigNumber from 'bignumber.js'
import AbstractModel from './AbstractModel'
import TokenShort from './TokenShort'

export const schema = () => ({
  token: Joi.object().type(TokenShort).required(),
  value: Joi.object().type(BigNumber).required()
})

export default class AmountShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }
}

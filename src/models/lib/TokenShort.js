import Joi from 'joi'
import BigNumber from 'bignumber.js'
import AbstractModel from './AbstractModel'

export const schema = () => ({
  blockchain: Joi.string().required(),
  name: Joi.string().required(),
  symbol: Joi.string().required(),
  decimals: Joi.number({ min: 0, max: 32 })
})

export default class TokenShort extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id (): String {
    return `${this.blockchain}/${this.name}`
  }

  get digits (): BigNumber {
    return new BigNumber(10).pow(this.decimals)
  }

  readPennies (value): BigNumber {
    return new BigNumber(value)
  }

  readAmount (value): BigNumber {
    return this.readPennies(value).div(this.digits)
  }

  static valueOf (fullName) {
    switch (fullName) {
      case tRSD.id: return tRSD
      case tBTC.id: return tBTC
      case RSD.id: return RSD
      case BTC.id: return BTC
    }
    throw new Error('No such Token')
  }
}

export const tRSD = new TokenShort({
  blockchain: 'bitcoin-testnet',
  name: 'tRSD',
  symbol: 'RSD',
  decimals: 8
})

export const RSD = new TokenShort({
  blockchain: 'bitcoin',
  name: 'RSD',
  symbol: 'RSD',
  decimals: 8
})

export const tBTC = new TokenShort({
  blockchain: 'bitcoin-testnet',
  name: 'tBTC',
  symbol: 'BTC',
  decimals: 8
})

export const BTC = new TokenShort({
  blockchain: 'bitcoin',
  name: 'BTC',
  symbol: 'BTC',
  decimals: 8
})

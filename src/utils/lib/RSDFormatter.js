import BigNumber from 'bignumber.js'

export const formatRSD = function (value) {
  return new BigNumber(value).dividedBy(1e8).toFormat(2)
}

import bip39 from 'bip39'

export default (value) => bip39.validateMnemonic(value)

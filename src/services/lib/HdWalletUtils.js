import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39'

export default class HdWalletUtils {
  constructor (applicationContext) {
    this.applicationContext = applicationContext
  }

  createInvestingAddress (mnemonic) {
    return this.generateChildAddress({
      mnemonic,
      number: 0
    })
  }

  createPersonalAddress (mnemonic) {
    return this.generateChildAddress({
      mnemonic,
      number: 1
    })
  }

  generateChildAddress ({mnemonic, number}) {
    return bitcoin.HDNode
      .fromSeedBuffer(bip39.mnemonicToSeed(mnemonic), this.network)
      .derivePath(`m/44'/1'/0'/0/${number}`)
      .keyPair.getAddress()
  }
}

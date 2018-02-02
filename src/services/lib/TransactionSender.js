import { BACKEND } from 'src/remotes'
import coinSelect from 'coinselect'
import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39'

export default class TransactionSender {
  constructor (applicationContext) {
    this.applicationContext = applicationContext
    this.network = bitcoin.networks.testnet
    this.feeRate = 55 // satoshis per byte
  }

  async sendTransaction ({ fromAddress, toAddress, mnemonic, value }) {
    const wallet = bitcoin.HDNode
      .fromSeedBuffer(bip39.mnemonicToSeed(mnemonic), this.network)
      .derivePath(`m/44'/1'/0'/0/0`)

    let { data: { utxo: utxos } } = await BACKEND.get(`address/${fromAddress}/utxo`)

    utxos = utxos.map(e => ({
      ...e,
      value: Math.round(e.amount * 1e8),
      txId: e.txid
    }))

    const targets = [
      {
        address: toAddress,
        value
      }
    ]

    let { inputs, outputs } = coinSelect(utxos, targets, this.feeRate)
    const txb = new bitcoin.TransactionBuilder(this.network)

    inputs.forEach(input => txb.addInput(input.txId, input.vout))
    outputs.forEach(output => {
      // Сдачу обратно
      if (!output.address) {
        output.address = wallet.getAddress()
      }
      txb.addOutput(output.address, output.value)
    })

    for (let i = 0; i < inputs.length; i++) {
      txb.sign(i, wallet.keyPair)
    }

    BACKEND.post('transaction/', {
      rawtx: txb.build().toHex()
    })
  }
}

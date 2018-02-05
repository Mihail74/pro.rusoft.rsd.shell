import { mapState, mapActions, mapMutations } from 'vuex'
import { ADDRESS_DETAILS_LOADED } from '@/store/modules/lib/addresses'
import { AddressModel } from 'src/models'

export default {
  props: {
    fromAddressIn: String,
    toAddressIn: String,
    valueIn: String,
    currencyIn: String
  },
  inject: ['webSocketService', 'transactionSender'],
  data () {
    return {
      subscriber: null,
      mnemonic: null,
      fromAddress: this.fromAddressIn,
      toAddress: this.toAddressIn,
      value: this.valueIn,
      currency: this.currencyIn
    }
  },
  async created () {
    await this.loadAddressDetails(this.fromAddress)
    this.subscriber = this.webSocketService.subscribe('addresses', this.fromAddress, addressDetails => {
      this.updateStore(AddressModel.fromJS(JSON.parse(addressDetails)))
    })
  },
  beforeDestroy () {
    this.subscriber.unsubscribe()
    this.subscriber = null
  },
  computed: {
    addressDetails () {
      return this.addressLoadableModel.value
    },
    ...mapState({
      addressLoadableModel (state) {
        return state.addresses.table.get(this.fromAddress)
      }
    })
  },
  methods: {
    ...mapActions({
      loadAddressDetails: 'addresses/loadAddressDetails',
      unsubscribeFromAddress: 'addresses/unsubscribeFromAddress'
    }),
    ...mapMutations({
      updateStore: `addresses/${ADDRESS_DETAILS_LOADED}`
    }),
    send () {
      this.transactionSender.sendTransaction({
        fromAddress: this.fromAddress,
        toAddress: this.toAddress,
        mnemonic: this.mnemonic,
        value: Number(this.value)
      })
    }
  }
}

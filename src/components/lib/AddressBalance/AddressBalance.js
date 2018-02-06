import { mapState, mapActions, mapMutations } from 'vuex'
import { ADDRESS_DETAILS_LOADED } from '@/store/modules/lib/addresses'
import { AddressModel } from 'src/models'

export default {
  props: {
    address: String,
    isAddressVisible: { type: Boolean, default: true }
  },
  inject: ['webSocketService'],
  data () {
    return {
      subscriber: null
    }
  },
  async created () {
    await this.loadAddressDetails(this.address)
    this.subscriber = this.webSocketService.subscribe('addresses', this.address, addressDetails => {
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
        return state.addresses.table.get(this.address)
      }
    }),
    balance () {
      return this.addressDetails.balance.plus(this.addressDetails.unconfirmedBalance).toNumber()
    }
  },
  methods: {
    ...mapActions({
      loadAddressDetails: 'addresses/loadAddressDetails'
    }),
    ...mapMutations({
      updateStore: `addresses/${ADDRESS_DETAILS_LOADED}`
    })
  }
}

import { mapState, mapActions, mapMutations } from 'vuex'
import { ADDRESS_DETAILS_LOADED } from '@/store/modules/lib/addresses'
import { AddressModel } from 'src/models'
import { formatRSD } from 'src/utils'

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
    this.subscriber = this.webSocketService.subscribe('addresses', this.address, addressDetails => {
      this.updateStore(AddressModel.fromJS(JSON.parse(addressDetails)))
    })
    await this.loadAddressDetails(this.address)
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
      return formatRSD(this.addressDetails.balance.plus(this.addressDetails.unconfirmedBalance))
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

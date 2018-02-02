import { mapState, mapActions, mapMutations } from 'vuex'
import { ADDRESS_DETAILS_LOADED } from '@/store/modules/lib/addresses'
import { AddressModel } from 'src/models'

export default {
  props: {
    address: String
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
      addressLoadableModel: (state) => state.addresses.table.get(state.route.params.address)
    })
  },
  methods: {
    ...mapActions({
      loadAddressDetails: 'addresses/loadAddressDetails',
      unsubscribeFromAddress: 'addresses/unsubscribeFromAddress'
    }),
    ...mapMutations({
      updateStore: `addresses/${ADDRESS_DETAILS_LOADED}`
    })
  }
}

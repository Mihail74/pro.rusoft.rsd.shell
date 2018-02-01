import { mapState, mapActions } from 'vuex'
import * as partials from 'src/partials'

export default {
  components: {
    ...partials
  },
  async created () {
    await this.loadAddressDetails(this.address)
  },
  async beforeRouteLeave (to, from, next) {
    await this.unsubscribeFromAddress(this.address)
    next()
  },
  computed: mapState({
    address: (state) => state.route.params.address,
    addressDetails: (state) => state.addresses.table.get(state.route.params.address)
  }),
  methods: {
    ...mapActions({
      loadAddressDetails: 'addresses/loadAddressDetails',
      unsubscribeFromAddress: 'addresses/unsubscribeFromAddress'
    })
  }
}

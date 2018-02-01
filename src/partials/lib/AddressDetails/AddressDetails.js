import { AddressModel } from 'src/models'

export default {
  computed: {
    balance () {
      return this.addressDetails.balance.toNumber()
    },
    unconfirmedBalance () {
      return this.addressDetails.unconfirmedBalance.toNumber()
    }
  },

  props: {
    addressDetails: AddressModel
  }
}

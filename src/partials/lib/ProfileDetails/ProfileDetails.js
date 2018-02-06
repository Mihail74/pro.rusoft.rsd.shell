import { UserModel, DialogModel } from 'src/models'
import ProjectsList from './ProjectsList/ProjectsList.vue'
import { TransferModal } from 'src/modals'
import { BACKEND } from 'src/remotes'
import { AddressBalance } from 'src/components'

export default {
  components: {
    ProjectsList,
    AddressBalance
  },
  props: {
    profile: UserModel
  },
  data () {
    return {
      transferAmount: null,
      currency: null,
      recipient: null,
      subscriber: null
    }
  },
  methods: {
    transfer () {
      this.$store.dispatch('modals/open', new DialogModel({
        factory: () => TransferModal,
        data: {
          fromAddress: this.profile.personalWallet.address,
          toAddress: this.recipient,
          value: this.transferAmount,
          currency: this.currency
        }
      }))
    },
    faucet () {
      BACKEND.post('/faucet', {
        address: this.profile.investingWallet.address,
        value: 5000000
      })
    }
  }
}

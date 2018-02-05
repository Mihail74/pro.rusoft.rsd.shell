import { UserModel, DialogModel } from 'src/models'
import ProjectsList from './ProjectsList/ProjectsList.vue'
import { TransferModal } from 'src/modals'

export default {
  components: {
    ProjectsList
  },
  props: {
    profile: UserModel
  },
  data () {
    return {
      transferAmount: null,
      currency: null,
      recipient: null
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
    }
  }
}

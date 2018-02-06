import { UserModel, DialogModel } from 'src/models'
import ProjectsList from './ProjectsList/ProjectsList.vue'
import { TransferModal } from 'src/modals'
import { BACKEND } from 'src/remotes'

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
      recipient: null,
      subscriber: null,
      investingWalletBalance: null,
      investingWalletUnconfirmedBalance: null,
      personalWalletUnconfirmedBalance: null,
      personalWalletBalance: null
    }
  },
  async created () {
    const { data } = await BACKEND.get(`address/${this.profile.investingWallet.address}`)
    this.investingWalletBalance = data.balance
    this.investingWalletUnconfirmedBalance = data.unconfirmedBalance
    console.log(this.profile.personalWallet.address)

    const { data: data2 } = await BACKEND.get(`address/${this.profile.personalWallet.address}`)
    console.log(data2)
    this.personalWalletBalance = data2.balance
    this.personalWalletUnconfirmedBalance = data2.unconfirmedBalance
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

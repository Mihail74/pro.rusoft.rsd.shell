import { ProjectShort } from 'src/models'
import { AddressBalance } from 'src/components'
import { mapState } from 'vuex'
import { BACKEND, withAuthorization } from 'src/remotes'

export default {
  components: {
    AddressBalance
  },
  inject: ['transactionService'],
  props: {
    project: ProjectShort
  },
  data () {
    return {
      mnemonic: null,
      value: null
    }
  },
  computed: {
    ...mapState({
      principal: (state) => state.account.principal,
      user: (state) => state.account.principal.user
    })
  },
  methods: {
    async support () {
      const rawtx = await this.transactionService.createSignedFromInvestingWalletTx({
        fromAddress: this.user.investingWallet.address,
        toAddress: this.project.address,
        mnemonic: this.mnemonic,
        value: this.value
      })
      console.log(this.project)
      await BACKEND.post(`/projects/${this.project.id}/deposit`, {
        rawtx
      },
      withAuthorization(this.principal.token))
    }
  }
}

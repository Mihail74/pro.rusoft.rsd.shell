import { ProjectShort } from 'src/models'
import { AddressBalance } from 'src/components'
import { mapState, mapActions } from 'vuex'
import { required, numeric, minValue } from 'vuelidate/lib/validators'
import { mnemonic } from 'src/validators'

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
      value: null,
      isSending: false,
      isError: false
    }
  },
  validations: {
    mnemonic: {
      required,
      mnemonic
    },
    value: {
      required,
      numeric,
      minValue: minValue(1)
    }
  },
  computed: {
    ...mapState({
      principal: (state) => state.account.principal,
      user: (state) => state.account.principal.user
    })
  },
  methods: {
    ...mapActions({
      deposit: 'api/post'
    }),
    async support () {
      this.isSending = true
      this.isError = false
      try {
        const rawtx = await this.transactionService.createSignedFromInvestingWalletTx({
          fromAddress: this.user.investingWallet.address,
          toAddress: this.project.address,
          mnemonic: this.mnemonic,
          value: this.value
        })
        this.deposit({
          url: `/projects/${this.project.id}/deposit`,
          data: {
            rawtx
          }
        }).catch(e => {
          console.log(e)
          this.isError = true
        })
      } finally {
        this.isSending = false
      }
    }
  }
}

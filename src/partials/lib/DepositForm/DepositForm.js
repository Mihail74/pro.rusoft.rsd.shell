import { ProjectShort } from 'src/models'
import { AddressBalance } from 'src/components'
import { mapState, mapActions } from 'vuex'
import { required, numeric, minValue } from 'vuelidate/lib/validators'
import { mnemonic } from 'src/validators'
import BigNumber from 'bignumber.js'

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
      isError: false,
      isSignCorrect: true
    }
  },
  validations: {
    mnemonic: {
      required,
      mnemonic
    },
    value: {
      required
      // numeric,
      // minValue: minValue(0.001)
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
      this.isSignCorrect = true
      this.isError = false

      // TODO: @mdkardaev внутри CPU-intensive операция, поэтому так
      setTimeout(this.signAndSend, 500)
    },
    async signAndSend () {     
      try {
        const rawtx = await this.transactionService.createSignedFromInvestingWalletTx({
          fromAddress: this.user.investingWallet.address,
          toAddress: this.project.address,
          mnemonic: this.mnemonic,
          value: new BigNumber(this.value).mul(1e8).toNumber()
        })
        await this.deposit({
          url: `/projects/${this.project.id}/deposit`,
          data: {
            rawtx
          }
        })
      } catch (e) {
        this.isError = true
        if (e.response.status === 400) {
          this.isSignCorrect = false
        }
      } finally {
        this.isSending = false
      }
    }
  }
}

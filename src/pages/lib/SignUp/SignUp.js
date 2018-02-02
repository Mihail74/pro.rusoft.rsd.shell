import { required, sameAs, email } from 'vuelidate/lib/validators'
import bip39 from 'bip39'

export default {
  inject: ['hdWalletUtils'],
  data () {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      error: null,
      alreadyExistUserError: null,
      mnemonic: null
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs('password')
    },
    mnemonic: {
      required
    }
  },
  methods: {
    async signup () {
      try {
        await this.$store.dispatch('account/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          investingAddress: this.hdWalletUtils.createInvestingAddress(this.mnemonic),
          personalAddress: this.hdWalletUtils.createPersonalAddress(this.mnemonic)
        })
        this.$router.push('/confirm')
      } catch (e) {
        console.log(e)
        this.error = e.message
        if (e.response.data.indexOf('duplicate key error collection') >= 0) {
          this.alreadyExistUserError = true
        }
      }
    },
    generateMnemonic () {
      this.mnemonic = bip39.generateMnemonic()
    }
  }
}

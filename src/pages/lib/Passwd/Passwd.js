import { required, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      password: null,
      passwordConfirmation: null,
      error: null
    }
  },
  validations: {
    password: {
      required
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async passwd () {
      try {
        await this.$store.dispatch('account/passwd', {
          check: this.$route.params.check,
          password: this.password
        })
        this.$router.push('/private')
      } catch (e) {
        console.log(e)
        this.error = e.message
      }
    }
  }
}

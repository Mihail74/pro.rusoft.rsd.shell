import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: null,
      password: null,
      error: null,
      wrongCredentialsError: null
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    async signin () {
      try {
        await this.$store.dispatch('account/login', {
          email: this.email,
          password: this.password
        })
        this.$router.push(this.$route.query.redirect || '/private')
      } catch (e) {
        console.log(e)
        this.error = e.message
        if (e.response.data.indexOf('Wrong credentials') >= 0) {
          this.wrongCredentialsError = true
        }
      }
    }
  }
}

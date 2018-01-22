import { required, sameAs, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      error: null,
      alreadyExistUserError: null
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
    }
  },
  methods: {
    async signup () {
      try {
        await this.$store.dispatch('account/signup', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.$router.push('/confirm')
      } catch (e) {
        console.log(e)
        this.error = e.message
        if (e.response.data.indexOf('duplicate key error collection') >= 0) {
          this.alreadyExistUserError = true
        }
      }
    }
  }
}

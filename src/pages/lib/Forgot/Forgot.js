import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: null,
      error: null
    }
  },
  validations: {
    email: {
      required
    }
  },
  methods: {
    async forgot () {
      try {
        await this.$store.dispatch('account/forgot', {
          email: this.email
        })
        this.$router.push('/recover')
      } catch (e) {
        console.log(e)
        this.error = e.message
      }
    }
  }
}

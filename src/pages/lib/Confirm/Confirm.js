export default {
  data () {
    return {
      error: null
    }
  },
  async created () {
    if (this.$route.params.check) {
      try {
        await this.$store.dispatch('account/confirm', {
          check: this.$route.params.check
        })
        this.$router.push('/private')
      } catch (e) {
        console.log(e)
        this.error = e.message
      }
    }
  }
}

export default {
  data () {
    return {
      error: null
    }
  },
  async created () {
    if (this.$route.params.check) {
      try {
        const { check } = await this.$store.dispatch('account/recover', {
          check: this.$route.params.check
        })
        this.$router.push(`/private/passwd/${check}`)
      } catch (e) {
        console.log(e)
        this.error = e.message
      }
    }
  }
}

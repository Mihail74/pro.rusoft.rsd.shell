export default {
  methods: {
    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push('/signin')
    }
  }
}

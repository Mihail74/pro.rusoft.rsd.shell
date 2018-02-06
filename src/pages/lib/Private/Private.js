import { mapState } from 'vuex'

export default {
  methods: {
    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push('/signin')
    }
  },
  computed: mapState({
    profileId: (state) => state.account.principal.user._id
  })
}

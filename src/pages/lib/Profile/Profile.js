import { mapState, mapActions } from 'vuex'
import * as partials from 'src/partials'

export default {
  components: {
    ...partials
  },
  async created () {
    await this.loadProfileDetails(this.profileId)
  },
  computed: mapState({
    profileId: (state) => state.route.params.profileId,
    profile: (state) => state.profiles.table.get(state.route.params.profileId)
  }),
  methods: mapActions({
    loadProfileDetails: 'profiles/loadProfileDetails'
  })
}

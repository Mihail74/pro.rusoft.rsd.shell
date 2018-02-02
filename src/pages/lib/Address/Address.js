import { mapState } from 'vuex'
import * as partials from 'src/partials'

export default {
  components: {
    ...partials
  },
  computed: mapState({
    address: (state) => state.route.params.address
  })
}

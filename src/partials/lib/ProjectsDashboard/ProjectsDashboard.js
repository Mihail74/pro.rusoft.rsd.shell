import { mapState } from 'vuex'
import moment from 'moment'
import pluralize from 'pluralize'
import * as components from 'src/components'

export default {
  components,
  computed: mapState({
    projects: state => state.projects.list
  }),
  methods: {
    moment,
    pluralize
  }
}

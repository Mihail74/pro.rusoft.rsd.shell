import { UserModel } from 'src/models'
import ProjectsList from './ProjectsList/ProjectsList.vue'

export default {
  components: {
    ProjectsList
  },

  data () {
    return {
      transferAmount: null,
      currency: null,
      recipient: null
    }
  },

  props: {
    profile: UserModel
  }
}

import { mapActions } from 'vuex'

export default {
  async created () {
    await this.loadProjects()
  },
  methods: mapActions({
    loadProjects: 'projects/loadProjects'
  })
}

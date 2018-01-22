import { sortBy } from 'lodash'
import VueTypes from 'vue-types'
import { mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import { CurationModel } from 'src/models'
import * as directives from 'src/directives'
import * as components from 'src/components'

export default {
  props: {
    curation: VueTypes.instanceOf(CurationModel)
  },
  data: () => ({
    users: null,
    invites: null,
    like: null,
    invite: {
      email: null
    }
  }),
  components,
  directives,
  async created () {
    const project = this.curation.iteration.configuration.project
    const available = await this.loadCurators()
    const checked = this.curation.curators

    const users = {
      [project.user.id]: { entry: project.user, type: 'user', isChecked: false }
    }
    for (const curator of available) {
      users[curator.id] = { entry: curator, type: 'user', isChecked: false }
    }
    for (const curator of checked) {
      const item = users[curator.id]
      if (item) {
        item.isChecked = true
      }
    }

    this.users = Object.values(users)

    const invites = {}
    for (const invite of project.invites) {
      invites[invite.id] = {
        entry: invite,
        type: 'invite',
        isChecked: false
      }
    }
    for (const invite of this.curation.invites) {
      const item = invites[invite.id]
      if (item) {
        item.isChecked = true
      }
    }

    this.invites = Object.values(invites)
  },
  validations: {
    invite: {
      email: {
        required,
        email
      }
    }
  },
  computed: {
    visibleItems () {
      const items = [ ...this.users || [], ...this.invites || [] ]
      const like = this.like == null ? '' : this.like.trim()
      const filtered = (like === '' || like === '*')
        ? items
        : items.filter(item => (
          item.type === 'user' && (
            item.entry.name && item.entry.name.indexOf(like) >= 0 ||
            item.entry.email && item.entry.email.indexOf(like) >= 0
          ) ||
          item.type === 'invite' && (
            item.entry.email && item.entry.email.indexOf(like) >= 0
          )
        ))
      return sortBy(filtered, ['entry.type', 'entry.name', 'entry.email'])
    }
  },
  methods: {
    ...mapActions({
      close: 'modals/close',
      loadCurators: 'curators/loadCurators',
      updateCurators: 'projects/updateCurators',
      inviteCurator: 'projects/inviteCurator'
    }),
    async submit () {
      await this.updateCurators({
        curation: this.curation,
        curators: this.users.filter(item => item.isChecked).map(item => item.entry),
        invites: this.invites.filter(item => item.isChecked).map(item => item.entry)
      })
      this.close()
    },
    async sendInvite () {
      const invite = await this.inviteCurator({
        curation: this.curation,
        email: this.invite.email
      })
      this.invite.email = null
      this.$v.invite.$reset()
      this.invites.push({
        type: 'invite',
        entry: invite,
        isChecked: true
      })
    }
  }
}

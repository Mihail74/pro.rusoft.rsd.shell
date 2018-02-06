import { ProjectShort } from 'src/models'

export default {
  beforeCreate () {
    Object.assign(this.$options.components, {
      ...require('src/partials')
    })
  },
  props: {
    user: Object,
    project: ProjectShort
  }
}

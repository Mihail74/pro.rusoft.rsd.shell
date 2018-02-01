import VueTypes from 'vue-types'
import { ProjectShort, DialogModel } from 'src/models'
import { ConfirmationModal } from 'src/modals'

export default {
  props: {
    project: VueTypes.instanceOf(ProjectShort)
  },
  data: () => ({
    supportAmount: null
  }),

  methods: {
    support () {
      console.log(`Поддержать проект на  RSD`)
      this.$store.dispatch('modals/open', new DialogModel({
        factory: () => ConfirmationModal,
        data: {
          message: `${this.supportAmount} RSD успешно зачислены`
        }
      }))
    }
  }
}

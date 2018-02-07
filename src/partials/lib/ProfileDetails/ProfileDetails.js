import { UserModel, DialogModel } from 'src/models'
import ProjectsList from './ProjectsList/ProjectsList.vue'
import { TransferModal } from 'src/modals'
import { mapActions } from 'vuex'
import { AddressBalance } from 'src/components'
import _ from 'lodash'

export default {
  components: {
    ProjectsList,
    AddressBalance
  },
  props: {
    profile: UserModel
  },
  data () {
    return {
      transferAmount: null,
      currency: null,
      recipient: null,
      subscriber: null,
      isPurchasing: false
    }
  },
  computed: {
    supportedProjects () {
      return _.uniqBy(this.profile.deposites, e => e.project.id).map(e => e.project)
    },
    withdrawnProjects () {
      return _.uniqBy(this.profile.withdrawals, e => e.project.id).map(e => e.project)
    }
  },
  methods: {
    ...mapActions({
      faucet: 'api/post'
    }),
    async purchase () {
      this.isPurchasing = true
      try {
        await this.faucet({
          url: '/faucet',
          data: {
            value: 5000000
          }
        })
      } finally {
        this.isPurchasing = false
      }
    }
  }
}

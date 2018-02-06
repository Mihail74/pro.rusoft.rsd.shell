import { ProjectShort } from 'src/models'
import { AddressBalance } from 'src/components'

export default {
  components: {
    AddressBalance
  },
  props: {
    user: Object,
    project: ProjectShort
  },
  data () {
    return {
      mnemonic: null,
      value: null
    }
  },
  methods: {
    support () {
      console.log(`Send to wallet ${this.project.address} from ${this.user.investingWallet.address} amount ${this.value} RSD`)
    }
  }
}

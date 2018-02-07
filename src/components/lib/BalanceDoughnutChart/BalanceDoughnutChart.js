import { DoughnutChart } from 'src/components'
import { ProjectShort } from 'src/models'
import BigNumber from 'bignumber.js'
import { mapActions } from 'vuex'

export default {
  components: {
    DoughnutChart
  },
  props: {
    project: ProjectShort
  },
  inject: ['webSocketService'],
  data () {
    return {
      subscriber: null
    }
  },
  async created () {
    console.log(this.project)
    this.subscriber = this.webSocketService.subscribe('addresses', this.project.address, addressDetails => {
      this.loadProject()
    })
  },
  beforeDestroy () {
    this.subscriber.unsubscribe()
    this.subscriber = null
  },
  computed: {
    balance () {
      return new BigNumber(this.project.balance).plus(new BigNumber(this.project.unconfirmedBalance))
    }
  },
  methods: {
    ...mapActions({
      loadProject: 'projects/loadProjects'
    }),
    getConfig () {
      const targetValue = new BigNumber(this.project.targetValue)
      const current = this.balance
      console.log(current)

      return {
        data: {
          labels: ['Собрано', 'Осталось'],
          datasets: [{
            label: 'Цель',
            data: [current.toNumber(), Math.max(targetValue.minus(current).toNumber(), 0)],
            borderWidth: [0, 3],
            backgroundColor: ['#2196f3']
          }]
        }
      }
    },
    getLabel () {
      return this.balance.div(new BigNumber(this.project.targetValue)).mul(100).toFormat(0).toString()
    }
  }
}

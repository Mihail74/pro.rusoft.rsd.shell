import { ProjectShort, DialogModel } from 'src/models'
import { DateDoughnutChart, BalanceDoughnutChart } from 'src/components'
import { DepositModal } from 'src/modals'
import { mapState } from 'vuex'

export default {
  components: {
    DateDoughnutChart,
    BalanceDoughnutChart
  },
  props: {
    project: ProjectShort
  },
  data: () => ({
    timeProgress: null, // { daysLast: null, days: null },
    valueProgress: null // { value: null, targetValue: null }
  }),
  created () {
    this.timeProgress = {
      daysLast: 20,
      days: 50
    }
    this.valueProgress = {
      value: 600000,
      targetValue: 1000000
    }
  },
  methods: {
    timeChartFactory,
    valueChartFactory,
    support (project) {
      this.$store.dispatch('modals/open', new DialogModel({
        factory: () => DepositModal,
        data: {
          project: this.project
        }
      }))
    },
    isNewProject (project) {
      return project.status === 'NEW'
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.account.principal.user,
      investingWallet: (state) => state.account.principal.user.investingWallet.address
    })
  }
}

const COLORS_TIME = ['rgba(0, 0, 200, 0.5)', 'rgba(200, 200, 200, 0.5)']
const COLORS_VALUE = ['rgba(200, 0, 0, 0.5)', 'rgba(200, 200, 200, 0.5)']

function valueChartFactory ({ value, targetValue }) {
  return (context) => ({
    data: {
      datasets: [{
        label: 'Осталось собрать',
        backgroundColor: COLORS_VALUE,
        borderWidth: 1,
        data: [
          value,
          (targetValue > value) ? targetValue - value : 0
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 90,
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  })
}

function timeChartFactory ({ daysLast, days }) {
  return (context) => ({
    data: {
      datasets: [{
        label: 'Осталось собрать',
        backgroundColor: COLORS_TIME,
        borderWidth: 1,
        data: [
          daysLast,
          days - daysLast
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 90,
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  })
}

import { DoughnutChart } from 'src/components'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export default {
  components: {
    DoughnutChart
  },

  props: {
    projects: Array
  },

  methods: {
    amountConfig (project) {
      const targetValue = new BigNumber(project.targetValue)
      const current = new BigNumber(project.balance)
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
    amountPercent (project) {
      return new BigNumber(project.balance).div(new BigNumber(project.targetValue)).mul(100).toFormat(0).toString()
    },
    dateConfig (project) {
      const started = moment(project.startedDate)
      const now = moment()
      const due = moment(project.dueDate)
      return {
        data: {
          labels: ['Прошло', 'Осталось'],
          datasets: [{
            label: 'Цель',
            data: [now.diff(started, 'days'), due.diff(now, 'days')],
            borderWidth: [0, 3],
            backgroundColor: ['#2196f3']
          }]
        }
      }
    },
    dateLeft (project) {
      const now = moment()
      const due = moment(project.dueDate)
      return due.diff(now, 'days')
    }
  }
}

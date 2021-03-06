import { ProjectShort } from 'src/models'
import Chart from '../Chart/Chart.vue'

export default {
  components: {
    Chart
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
    valueChartFactory
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

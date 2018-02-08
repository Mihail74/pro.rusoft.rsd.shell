import { DoughnutChart } from 'src/components'
import { ProjectShort } from 'src/models'
import moment from 'moment'

export default {
  components: {
    DoughnutChart
  },
  props: {
    project: ProjectShort
  },
  methods: {
    getConfig () {
      const started = moment(this.project.startedDate)
      const now = moment()
      const due = moment(this.project.dueDate)
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
    getLabel () {
      const now = moment()
      const due = moment(this.project.dueDate)
      return `${due.diff(now, 'days')} дн.`
    }
  }
}

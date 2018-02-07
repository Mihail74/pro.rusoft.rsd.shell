// import Chart from 'chart.js'
// import { Doughnut, mixins } from 'vue-chartjs'

// export default {
//   extends: Doughnut,
//   mixins: [mixins.reactiveData],
//   props: {
//     type: String,
//     config: Object
//   },
//   data () {
//     return {
//       chartData: this.config.data,
//       options: this.config.options
//     }
//   },
//   mounted () {
//     console.log(this.config)
//     this.renderChart(this.chartData, this.options)
//   }
// }
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
  }
}

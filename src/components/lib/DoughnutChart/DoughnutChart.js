import { Chart } from 'src/components'

export default {
  components: {
    Chart
  },
  props: {
    config: [Object, Function],
    label: String
  },
  methods: {
    getConfig () {
      return {
        ...this.config,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 90,
          legend: {
            display: false
          },
          title: {
            display: false
          },
          layout: {
            padding: 5
          },
          tooltips: {
            titleFontSize: 10
          }
        }
      }
    }
  }
}

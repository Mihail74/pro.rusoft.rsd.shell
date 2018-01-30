import Chart from 'src/components/lib/Chart/Chart.vue'

export default {
  components: {
    Chart
  },

  props: {
    projects: Array
  },

  methods: {
    currentAmount () {
      const value = Math.trunc(Math.random() * 100)
      return {
        data: {
          labels: ['Собрано', 'Осталось'],
          datasets: [{
            label: 'Цель',
            data: [value, 100 - value],
            borderWidth: [0, 3],
            backgroundColor: ['#2196f3', '#f44336']
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

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
      return {
        data: {
          labels: ['Собрано', 'Осталось'],
          datasets: [{
            label: 'Цель',
            data: [100, 500],
            borderWidth: 1,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
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
            display: true
          }
        }
      }
    }
  }
}

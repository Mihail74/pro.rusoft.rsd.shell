import Chart from 'chart.js'

export default {
  props: {
    type: String,
    data: [Object, Function],
    options: [Object, Function]
  },
  mounted () {
    const context = this.$refs.canvas.getContext('2d')
    this.chart = new Chart(context, {
      type: this.$props.type,
      data: (this.$props.data instanceof Function)
        ? this.$props.data(context)
        : this.$props.data,
      options: (this.$props.options instanceof Function)
        ? this.$props.options(context)
        : this.$props.options
    })
  }
}

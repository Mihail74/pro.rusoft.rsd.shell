import Chart from 'chart.js'

export default {
  props: {
    type: String,
    config: [Object, Function],
    label: String
  },
  mounted () {
    const context = this.$refs.canvas.getContext('2d')
    const config = (this.$props.config instanceof Function)
      ? this.$props.config(context)
      : this.$props.config
    this.chart = new Chart(context, {
      ...config,
      type: this.$props.type
    })
  }
}

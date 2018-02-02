export default {
  beforeCreate () {
    Object.assign(this.$options.components, {
      ...require('src/partials')
    })
  },
  props: {
    fromAddress: String,
    toAddress: String,
    value: String,
    currency: String
  }
}

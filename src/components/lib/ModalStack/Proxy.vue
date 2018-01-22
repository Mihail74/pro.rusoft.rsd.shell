<script>

export default {
  name: 'proxy',
  abstract: true,
  props: {
    component: {
      type: [ String, Object, Function ]
    },
    pass: Object
  },
  render (createElement) {
    return createElement(this.component, {
      props: this.pass
    })
  }
}

</script>

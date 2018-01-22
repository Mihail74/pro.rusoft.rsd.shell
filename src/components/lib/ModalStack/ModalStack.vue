<template>
  <section class="root modal-stack">
    <modal v-for="item in stack" :modal="item.modal" :key="item.id"></modal>
  </section>
</template>

<script>
import VueTypes from 'vue-types'
import { DialogModel } from 'src/models'

export default {
  props: {
    stack: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.string.isRequired,
        modal: VueTypes.instanceOf(DialogModel).isRequired
      }
    ))
  },
  components: {
    Modal: require('./Modal.vue')
  }
}
</script>

<style scoped lang="scss">
  .root.modal-stack {
    position: relative;
    overflow: visible;
    z-index: 100;
  }
</style>

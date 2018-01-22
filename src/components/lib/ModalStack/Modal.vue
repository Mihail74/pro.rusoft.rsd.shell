<template>
  <div class="root modal">
    <div class="content" @click.self="$store.dispatch('modals/close')">
      <proxy :component="modal.factory()" :pass="modal.data"></proxy>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import Proxy from './Proxy'
import { DialogModel } from 'src/models'

export default {
  props: {
    modal: VueTypes.instanceOf(DialogModel)
  },
  components: {
    Proxy
  }
}
</script>

<style scoped lang="scss" src="./Modal.scss"></style>

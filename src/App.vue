<template>
  <div id="app" class="app">
    <router-view></router-view>
    <modal-stack :stack="$store.state.modals.stack" />
  </div>
</template>

<script>
import * as components from 'src/components'
export default {
  name: 'app',
  components
}
</script>

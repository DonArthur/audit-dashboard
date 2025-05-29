<template>
  <div id="app" class="d-flex">
    <Sidebar />
    <main class="flex-grow-1 bg-light p-4 overflow-auto" style="margin-left: 250px;">
      <router-view/>
    </main>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Sidebar,
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
}
</style>

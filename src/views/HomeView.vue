<template>
  <div class="home">
    <h1>BERANDA</h1>
    <div>
      <ChartComponent />
    </div>
  </div>
</template>

<script>
import ChartComponent from '@/components/ChartComponent.vue';

export default {
  name: 'HomeView',
  components: {
    ChartComponent,
  },
  data() {
    return {}
  },
}
</script>

<template>
  <div class="home">
    <h1>BERANDA</h1>
    <div>
      Komponen card masing-masing direktorat dan skornya (di atas)
    </div>
    <div>
      Komponen Slideshow (di bawah kiri)
    </div>
    <div>
      (di bawah kanan)
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

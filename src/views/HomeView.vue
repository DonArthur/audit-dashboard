<template>
  <div class="home">
    <h1>BERANDA</h1>
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci dolore possimus velit consequatur ullam perferendis commodi animi! Minima suscipit vel repudiandae eum non, voluptatibus maiores itaque laudantium sit harum!</span>
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci dolore possimus velit consequatur ullam perferendis commodi animi! Minima suscipit vel repudiandae eum non, voluptatibus maiores itaque laudantium sit harum!</span>
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci dolore possimus velit consequatur ullam perferendis commodi animi! Minima suscipit vel repudiandae eum non, voluptatibus maiores itaque laudantium sit harum!</span>
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

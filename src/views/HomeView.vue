<template>
  <div class="home">
    <h3>BERANDA</h3>
    <div class="card-container">
      <div v-for="item in direktorat" :key="item.docId" class="card">
        {{ item.nama_direktorat }}
      </div>
    </div>
    <!-- <div>
      Komponen Slideshow (di bawah kiri)
    </div> -->
    <div>
      (di bawah kanan)
      <ChartComponent />
    </div>
  </div>
</template>

<script>
import ChartComponent from '@/components/ChartComponent.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default {
  name: 'HomeView',
  components: {
    ChartComponent,
  },
  data() {
    return {
      direktorat: [],
    }
  },
  methods: {
    async getDirectorates() {
      const qSnapshot = await getDocs(collection(db, 'direktorat'))
      this.direktorat = qSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
      console.log(qSnapshot);
    },
  },
  mounted() {
    this.getDirectorates()
  },
}
</script>
<style scoped>
.card-container {
  display: flex;
  align-items: center;
  overflow: auto;
}

.card {
  height: 50px;
  width: 120px;
}
</style>
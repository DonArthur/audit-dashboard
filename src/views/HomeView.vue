<template>
  <div class="home">
    <h3>BERANDA</h3>
    <div class="card-container">
      <div v-for="item in direktorat" :key="item" class="card">
        {{ item }}
      </div>
    </div>
    <!-- <div>
      Komponen Slideshow (di bawah kiri)
    </div> -->
    <div>
      <ChartComponent />
    </div>
  </div>
</template>

<script>
import ChartComponent from "@/components/ChartComponent.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default {
  name: "HomeView",
  components: {
    ChartComponent,
  },
  data() {
    return {
      direktorat: [],
    };
  },
  methods: {
    async getDirectorates() {
      const qSnapshot = await getDocs(collection(db, "direktorat"));
      const data = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const arr = data.map((item) => item.nama_direktorat);
      this.direktorat = [...new Set(arr)];
    },
  },
  mounted() {
    this.getDirectorates();
  },
};
</script>
<style scoped>
.card-container {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.card {
  flex: 0 0 auto;
  height: 50px;
  width: 200px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
}

.card:nth-child(6n + 1) {
  background: #00809d;
}
.card:nth-child(6n + 2) {
  background: #fcf8dd;
}
.card:nth-child(6n + 3) {
  background: #ffd700;
}
.card:nth-child(6n + 4) {
  background: #d3af37;
}
.card:nth-child(6n + 5) {
  background: #e4004b;
}
.card:nth-child(6n + 6) {
  background: #ed775a;
}
.card:nth-child(6n + 7) {
  background: #fad691;
}
.card:nth-child(6n + 8) {
  background: #c9cdcf;
}
.card:nth-child(6n + 9) {
  background: #33a1e0;
}
.card:nth-child(6n + 10) {
  background: #7a85c1;
}
</style>
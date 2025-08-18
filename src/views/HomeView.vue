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
      this.direktorat = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
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
  background: #f8b400;
}
.card:nth-child(6n + 2) {
  background: #ff6f61;
}
.card:nth-child(6n + 3) {
  background: #6fcf97;
}
.card:nth-child(6n + 4) {
  background: #56ccf2;
}
.card:nth-child(6n + 5) {
  background: #bb6bd9;
}
.card:nth-child(6n + 6) {
  background: #f2994a;
}
</style>
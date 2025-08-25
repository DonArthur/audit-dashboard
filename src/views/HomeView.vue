<template>
  <div class="home">
    <h3>BERANDA</h3>
    <div class="card-container">
      <button
        type="button"
        v-for="item in hasilDirektorat"
        :key="item"
        class="card"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="setSelected(item)"
      >
        {{ item.nama_direktorat }} {{ getResultPercentage(item.hasil) }}
      </button>
    </div>
    <div>
      <ChartComponent :dataHasil="hasilDirektorat" />
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ selectedDir.nama_direktorat }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div v-if="selectedData.length > 0">
              {{ selectedData }}
            </div>
            <!-- <table
              v-if="selectedData.length > 0"
              class="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>Unit/Direktorat</th>
                  <th>Nama Karyawan</th>
                  <th>Skor</th>
                  <th>Index Maturity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in selectedData" :key="key">
                  <td>{{ item.direktorat_id }}</td>
                  <td>{{ item.employee_id }}</td>
                  <td>{{ item.jawaban }}</td>
                  <td>Maturity</td>
                </tr>
              </tbody>
            </table> -->
            <div v-else>
              <span>Belum mengisi kuesioner</span>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
      hasil: [],
      hasilDirektorat: [],
      selectedDir: "",
      selectedData: [],
    };
  },
  methods: {
    async getDirectorates() {
      const qSnapshot = await getDocs(collection(db, "direktorat"));
      const data = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      this.direktorat = data;
      console.log("direktorat", this.direktorat);
    },
    async getResults() {
      const qSnapshot = await getDocs(collection(db, "hasil_pertanyaan"));
      const data = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const dirArr = this.direktorat.map((item) => {
        return {
          nama_direktorat: item.nama_direktorat,
          hasil: data.filter((ans) => ans.direktorat_id === item.docId),
        };
      });
      this.hasil = data;
      this.hasilDirektorat = dirArr;
    },
    setSelected(dir) {
      this.selectedDir = dir;
      const selected = this.hasil.filter(
        (item) => item.direktorat_id === dir.docId
      );
      console.log(selected);
      // this.selectedDir = dir.nama_direktorat;
      // this.selectedData = this.hasil.filter(
      //   (item) => item.direktorat_id === dir.docId
      // );
    },
    getResultPercentage(arr) {
      let result = 0;
      if (arr.length > 0) {
        arr.forEach((item) => {
          if (item.jawaban) {
            result += 1;
          }
        });
        return `${Math.round(result / arr.length) * 100}%`;
      } else {
        return "0%";
      }
    },
  },
  mounted() {
    this.getDirectorates();
    this.getResults();
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
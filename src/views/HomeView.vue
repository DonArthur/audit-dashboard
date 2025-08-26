<template>
  <div class="home">
    <h3>BERANDA</h3>

    <div class="card-container">
      <button
        type="button"
        v-for="item in hasilDirektorat"
        :key="item.docId"
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
              {{ selectedDir.nama_direktorat || "Selected" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <table
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
                <tr
                  v-for="(item, idx) in selectedData"
                  :key="item.docId || idx"
                >
                  <td>{{ getDirectorateName(item.direktorat_id) }}</td>
                  <td>{{ employeeNames[item.employee_id] || "Loading..." }}</td>
                  <td>{{ item.jawaban ? "1" : "0" }}</td>
                  <td>Maturity</td>
                </tr>
              </tbody>
            </table>
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
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default {
  name: "HomeView",
  components: { ChartComponent },
  data() {
    return {
      direktorat: [],
      hasil: [],
      hasilDirektorat: [],
      selectedDir: {},
      selectedData: [],
      employees: [],
      employeeNames: {}, // cache: employeeId -> name
    };
  },
  methods: {
    // load directorates
    async getDirectorates() {
      const qSnapshot = await getDocs(collection(db, "direktorat"));
      this.direktorat = qSnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));
    },

    // get single employee name and cache it
    async getEmployeeName(empId) {
      if (!empId) return "NN";
      if (this.employeeNames[empId]) return this.employeeNames[empId];

      try {
        const colRef = doc(db, "employee", empId);
        const colSnap = await getDoc(colRef);
        if (colSnap.exists()) {
          this.employeeNames[empId] = colSnap.data().name || "NN";
        } else {
          this.employeeNames[empId] = "NN";
        }
        return this.employeeNames[empId];
      } catch (err) {
        console.error("getEmployeeName error", err);
        this.employeeNames[empId] = "NN";
        return "NN";
      }
    },

    // fetch all employees (to know which ids to preload)
    async getEmployees() {
      const qSnapshot = await getDocs(collection(db, "employee"));
      this.employees = qSnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));
    },

    // preload all employee names in parallel
    async preloadEmployeeNames() {
      if (!this.employees.length) return;
      const promises = this.employees.map((emp) =>
        this.getEmployeeName(emp.docId)
      );
      await Promise.all(promises);
    },

    // safe lookup for directorate name
    getDirectorateName(id) {
      const found = this.direktorat.find((dir) => dir.docId === id);
      return found ? found.nama_direktorat : id || "Unknown";
    },

    // fetch hasil_pertanyaan and group by directorate
    async getResults() {
      const qSnapshot = await getDocs(collection(db, "hasil_pertanyaan"));
      const data = qSnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));
      this.hasil = data;

      // Build hasilDirektorat array (one entry per directorate)
      const dirArr = this.direktorat.map((item) => {
        return {
          nama_direktorat: item.nama_direktorat,
          docId: item.docId,
          hasil: data.filter((ans) => ans.direktorat_id === item.docId),
        };
      });
      this.hasilDirektorat = dirArr;
    },

    // invoked when user clicks a card button
    setSelected(dir) {
      this.selectedDir = dir || {};
      // filter hasil by dir.docId
      this.selectedData = (this.hasil || []).filter(
        (item) => item.direktorat_id === dir.docId
      );

      // preload employee names for the selectedData to speed template render
      const empIds = [
        ...new Set(this.selectedData.map((s) => s.employee_id)),
      ].filter(Boolean);
      if (empIds.length) {
        // start fetching but don't block UI
        empIds.forEach((id) => this.getEmployeeName(id));
      }
    },

    // keep returning "50%" style string for buttons
    getResultPercentage(arr) {
      let result = 0;
      if (!Array.isArray(arr) || arr.length === 0) return "0%";
      arr.forEach((item) => {
        if (item.jawaban) result += 1;
      });
      const percent = Math.round((result / arr.length) * 100);
      return `${percent}%`;
    },
  },

  // ensure proper load order: directorates -> results -> employees -> preload names
  async mounted() {
    try {
      await this.getDirectorates();
      await this.getResults();
      await this.getEmployees();
      await this.preloadEmployeeNames();
    } catch (err) {
      console.error("init error", err);
    }
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
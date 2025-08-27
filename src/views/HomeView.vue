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
        <!-- {{ item.nama_direktorat }} {{ getResultPercentage(item.hasil) }} -->
        {{ item.nama_direktorat }} {{ getResultPercentage(item) }}
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
              v-if="groupedResults.length > 0"
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
                <tr v-for="(item, idx) in groupedResults" :key="idx">
                  <td>{{ getDirectorateName(item.direktorat_id) }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.result }}</td>
                  <td>{{ item.category }}</td>
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
      selectedData: [], // raw results for one directorate
      employees: [],
      employeeNames: {},
      kategori_skor: [], // for category thresholds
    };
  },
  computed: {
    // Build grouped results per employee
    groupedResults() {
      if (!this.selectedData.length) return [];

      const grouped = {};

      this.selectedData.forEach((item) => {
        const name = this.employeeNames[item.employee_id] || "-";
        if (!grouped[item.employee_id]) {
          grouped[item.employee_id] = {
            direktorat_id: item.direktorat_id,
            name,
            result: 0,
          };
        }
        if (item.jawaban) {
          grouped[item.employee_id].result += 1;
        }
      });

      return Object.values(grouped).map((entry) => ({
        ...entry,
        category: this.getCategory(entry.result),
      }));
    },
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

    async getCategories() {
      const qSnapshot = await getDocs(collection(db, "kategori_skor"));
      this.kategori_skor = qSnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));
    },

    // fetch all employees
    async getEmployees() {
      const qSnapshot = await getDocs(collection(db, "employee"));
      this.employees = qSnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));
    },

    async preloadEmployeeNames() {
      if (!this.employees.length) return;
      const promises = this.employees.map((emp) =>
        this.getEmployeeName(emp.docId)
      );
      await Promise.all(promises);
    },

    getDirectorateName(id) {
      const found = this.direktorat.find((dir) => dir.docId === id);
      return found ? found.nama_direktorat : id || "Unknown";
    },

    async getResults() {
      const qSnapshot = await getDocs(collection(db, "hasil_pertanyaan"));
      const data = qSnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));
      this.hasil = data;

      this.hasilDirektorat = this.direktorat.map((item) => ({
        nama_direktorat: item.nama_direktorat,
        docId: item.docId,
        hasil: data.filter((ans) => ans.direktorat_id === item.docId),
      }));
    },

    setSelected(dir) {
      this.selectedDir = dir || {};
      this.selectedData = (this.hasil || []).filter(
        (item) => item.direktorat_id === dir.docId
      );

      const empIds = [
        ...new Set(this.selectedData.map((s) => s.employee_id)),
      ].filter(Boolean);
      if (empIds.length) {
        empIds.forEach((id) => this.getEmployeeName(id));
      }
    },

    // getResultPercentage(arr) {
    //   let result = 0;
    //   if (!Array.isArray(arr) || arr.length === 0) return "0%";
    //   arr.forEach((item) => {
    //     if (item.jawaban) result += 1;
    //   });
    //   const percent = Math.round((result / arr.length) * 100);
    //   return `${percent}%`;
    // },
    getResultPercentage(item) {
      console.log(item);
      switch (item.nama_direktorat) {
        case "IT Governance":
          return "97%";
        case "Risk Management":
          return "96%";
        case "Internal Audit":
          return "100%";
        case "Human Capital":
          return "95%";
        case "Compliance":
          return "100%";
        case "Legal":
          return "100%";
        case "IT Security":
          return "90%";
        case "IT Operation":
          return "93%";
        case "IT Development":
          return "95%";
        default:
          break;
      }
    },

    // categorization logic (can also load thresholds from kategori_skor)
    getCategory(score) {
      if (score >= 10) return "Maturity";
      if (score >= 5) return "Growth";
      return "Awareness";
    },
  },
  async mounted() {
    try {
      await this.getDirectorates();
      await this.getResults();
      await this.getEmployees();
      await this.preloadEmployeeNames();
      await this.getCategories();
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
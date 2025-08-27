<template>
  <div>
    <h3 class="mb-4">PENGATURAN KUESIONER</h3>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button class="btn bg-primary text-white rounded" @click="openAddModal">
          TAMBAH PERTANYAAN
        </button>
      </div>
      <div class="card-body">
        <p>TABEL PERTANYAAN</p>
        <div class="table-wrapper">
          <vue-good-table
            :columns="kolom_pertanyaan"
            :rows="pertanyaan"
            :fixed-header="true"
            :pagination-options="{
              enabled: true,
              perPage: 10,
            }"
          >
            <template #table-row="props">
              <span v-if="props.column.field === 'actions'">
                <button
                  class="btn bg-primary text-white rounded me-2"
                  @click="openEditQuestion(props.row)"
                >
                  Ubah
                </button>
                <button
                  class="btn bg-danger text-white rounded"
                  @click="deleteQuestion(props.row)"
                >
                  Hapus
                </button>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
    <div class="modal fade" id="addModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <span>{{ isEditMode ? "UBAH" : "TAMBAH" }} PERTANYAAN</span>
          </div>
          <div class="modal-body">
            <form>
              <label for="direktorat_id">Pilih Direktorat</label>
              <select
                class="form-control"
                v-if="categories.direktorat"
                id="direktorat_id"
                v-model="formPertanyaan.direktorat_id"
              >
                <option
                  v-for="direktorat in categories.direktorat"
                  :key="direktorat.docId"
                  :value="direktorat.id"
                >
                  {{ direktorat.nama_direktorat }}
                </option>
              </select>
              <label
                for="direktorat_id"
                v-if="categories.klausa && !formPertanyaan.annex_id"
                >Pilih Klausul</label
              >
              <div v-if="categories.klausa && !formPertanyaan.annex_id">
                <select
                  class="form-control"
                  id="klausa_id"
                  v-model="formPertanyaan.klausa_id"
                >
                  <option
                    v-for="klausa in categories.klausa"
                    :key="klausa.docId"
                    :value="klausa.id"
                  >
                    {{ klausa.nama_klausa }}
                  </option>
                </select>
                <button
                  class="btn bg-danger text-white"
                  @click="
                    (e) => {
                      e.preventDefault();
                      formPertanyaan.klausa_id = 0;
                    }
                  "
                >
                  Hapus
                </button>
              </div>
              <label
                for="direktorat_id"
                v-if="categories.sub_klausa && formPertanyaan.klausa_id"
                >Pilih Sub-Klausul</label
              >
              <div v-if="categories.sub_klausa && formPertanyaan.klausa_id">
                <select
                  class="form-control"
                  id="sub_klausa_id"
                  v-model="formPertanyaan.sub_klausa_id"
                >
                  <option
                    v-for="subKlausa in categories.sub_klausa"
                    :key="subKlausa.docId"
                    :value="subKlausa.id"
                  >
                    {{ subKlausa.nama_sub_klausa }}
                  </option>
                </select>
                <button
                  class="btn bg-danger text-white"
                  @click="
                    (e) => {
                      e.preventDefault();
                      formPertanyaan.sub_klausa_id = 0;
                    }
                  "
                >
                  Hapus
                </button>
              </div>
              <label
                for="direktorat_id"
                v-if="categories.annex && !formPertanyaan.klausa_id"
                >Pilih Annex</label
              >
              <div v-if="categories.annex && !formPertanyaan.klausa_id">
                <select
                  class="form-control"
                  id="annex_id"
                  v-model="formPertanyaan.annex_id"
                >
                  <option
                    v-for="annex in categories.annex"
                    :key="annex.docId"
                    :value="annex.id"
                  >
                    {{ annex.nama_annex }}
                  </option>
                </select>
                <button
                  class="btn bg-danger text-white"
                  @click="
                    (e) => {
                      e.preventDefault();
                      formPertanyaan.annex_id = 0;
                    }
                  "
                >
                  Hapus
                </button>
              </div>
              <label
                for="direktorat_id"
                v-if="categories.sub_control && formPertanyaan.annex_id"
                >Pilih Kontrol</label
              >
              <div v-if="categories.sub_control && formPertanyaan.annex_id">
                <select
                  class="form-control"
                  id="sub_control_id"
                  v-model="formPertanyaan.sub_control_id"
                >
                  <option
                    v-for="subKon in categories.sub_control"
                    :key="subKon.docId"
                    :value="subKon.id"
                  >
                    {{ subKon.nama_sub_control }}
                  </option>
                </select>
                <button
                  class="btn bg-danger text-white"
                  @click="
                    (e) => {
                      e.preventDefault();
                      formPertanyaan.sub_control_id = 0;
                    }
                  "
                >
                  Hapus
                </button>
              </div>
              <label for="pertanyaan">Isi Pertanyaan</label><br />
              <input
                type="textarea"
                v-model="formPertanyaan.pertanyaan"
                :rows="4"
              />
            </form>
          </div>
          <div class="modal-footer">
            <button
              :class="`btn bg-${
                computedDisabledSave ? 'secondary' : 'primary'
              } text-white rounded`"
              :disabled="computedDisabledSave"
              @click="addQuestion"
            >
              SIMPAN
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="confirmDeleteModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <span>KONFIRMASI PENGHAPUSAN DATA</span>
          </div>
          <div class="modal-body">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div v-if="dataToDelete">
              <span>ID: {{ dataToDelete.id }}</span
              ><br />
              <span>Pertanyaan: {{ dataToDelete.pertanyaan }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn bg-danger text-white rounded"
              @click="confirmDelete"
            >
              KONFIRMASI
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="`toast align-items-center ${
        requestSuccess ? 'text-bg-primary' : 'text-bg-danger'
      } border-0 position-fixed top-0 start-50 translate-middle-x m-3`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toastEl"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toastMessage }}
        </div>
        <!-- <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Modal, Toast } from "bootstrap";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

export default {
  name: "PengaturanKuesioner",
  components: { VueGoodTable },
  data() {
    return {
      categories: {
        annex: [],
        direktorat: [],
        kategori_skor: [],
        klausa: [],
        sub_control: [],
        sub_klausa: [],
      },
      lookup: {}, // maps for faster lookup
      formPertanyaan: this.emptyForm(),
      kolom_pertanyaan: [
        {
          label: "Direktorat",
          field: (row) => this.lookup.direktorat?.[row.direktorat_id] || "-",
        },
        {
          label: "Annex",
          field: (row) => this.lookup.annex?.[row.annex_id] || "-",
        },
        {
          label: "Kontrol",
          field: (row) => this.lookup.sub_control?.[row.sub_control_id] || "-",
        },
        {
          label: "Klausul",
          field: (row) => this.lookup.klausa?.[row.klausa_id] || "-",
        },
        {
          label: "Sub-Klausul",
          field: (row) => this.lookup.sub_klausa?.[row.sub_klausa_id] || "-",
        },
        { label: "Pertanyaan", field: "pertanyaan" },
        { label: "Actions", field: "actions", type: "slot" },
      ],
      pertanyaan: [],
      isEditMode: false,
      toastMessage: "",
      requestSuccess: false,
      toastInstance: null,
      dataToDelete: null,
    };
  },
  async mounted() {
    await this.getCategories();
    await this.getQuestion();
  },
  computed: {
    computedDisabledSave() {
      const f = this.formPertanyaan;
      return (
        !f.direktorat_id ||
        !f.pertanyaan ||
        (f.annex_id && !f.sub_control_id) ||
        (f.klausa_id && !f.sub_klausa_id)
      );
    },
  },
  methods: {
    emptyForm() {
      return {
        docId: null,
        annex_id: "",
        direktorat_id: "",
        klausa_id: "",
        pertanyaan: "",
        sub_control_id: "",
        sub_klausa_id: "",
      };
    },
    async getCategories() {
      for (const key of Object.keys(this.categories)) {
        const querySnapshot = await getDocs(collection(db, key));
        this.categories[key] = querySnapshot.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        // Build lookup map
        this.lookup[key] = this.categories[key].reduce((map, item) => {
          map[item.docId] = item[`nama_${key.replace("_", "")}`] || "";
          return map;
        }, {});
      }
    },
    async getQuestion() {
      try {
        const querySnapshot = await getDocs(collection(db, "pertanyaan"));
        const results = [];

        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();

          // Fill lookups while fetching
          data.direktoratName = await this.getNameByDocId(
            "direktorat",
            data.direktorat_id,
            "nama_direktorat"
          );
          data.annexName = await this.getNameByDocId(
            "annex",
            data.annex_id,
            "nama_annex"
          );
          data.subControlName = await this.getNameByDocId(
            "sub_control",
            data.sub_control_id,
            "nama_sub_control"
          );
          data.klausaName = await this.getNameByDocId(
            "klausa",
            data.klausa_id,
            "nama_klausa"
          );
          data.subKlausaName = await this.getNameByDocId(
            "sub_klausa",
            data.sub_klausa_id,
            "nama_sub_klausa"
          );

          results.push({ id: docSnap.id, ...data });
        }

        this.pertanyaan = results;
      } catch (err) {
        console.error("Error loading pertanyaan:", err);
      }
    },
    async getNameByDocId(collection, docId, columnName) {
      if (!docId) return "-";
      if (!this.lookup[collection]) this.lookup[collection] = {};

      // already cached
      if (this.lookup[collection][docId]) {
        return this.lookup[collection][docId];
      }

      try {
        const ref = doc(db, collection, docId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          this.lookup[collection][docId] = data[columnName] || "NN";
          return this.lookup[collection][docId];
        }
        return "NN";
      } catch (e) {
        console.error(e);
        return "NN";
      }
    },
    openAddModal() {
      this.isEditMode = false;
      this.formPertanyaan = this.emptyForm();
      this.showModal("addModal");
    },
    openEditQuestion(data) {
      this.isEditMode = true;
      this.formPertanyaan = { ...data }; // clone
      this.showModal("addModal");
    },
    async addQuestion() {
      try {
        if (this.isEditMode) {
          await updateDoc(
            doc(db, "pertanyaan", this.formPertanyaan.docId),
            this.formPertanyaan
          );
          this.showToast("Pertanyaan berhasil diubah");
        } else {
          await addDoc(collection(db, "pertanyaan"), this.formPertanyaan);
          this.showToast("Pertanyaan berhasil ditambah");
        }
        this.getQuestion();
      } catch (err) {
        this.showToast(`Terjadi kesalahan: ${err}`, false);
      }
    },
    deleteQuestion(data) {
      this.dataToDelete = data;
      this.showModal("confirmDeleteModal");
    },
    async confirmDelete() {
      try {
        await deleteDoc(doc(db, "pertanyaan", this.dataToDelete.docId));
        this.showToast("Data berhasil dihapus");
        this.getQuestion();
      } catch (err) {
        this.showToast(`Terjadi kesalahan: ${err}`, false);
      }
    },
    showToast(message, isSuccess = true) {
      this.requestSuccess = isSuccess;
      this.toastMessage = message;
      this.toastInstance = new Toast(this.$refs.toastEl);
      this.toastInstance.show();
      this.hideModal("addModal");
      this.hideModal("confirmDeleteModal");
    },
    showModal(id) {
      const el = document.getElementById(id);
      new Modal(el).show();
    },
    hideModal(id) {
      const el = document.getElementById(id);
      const modal = Modal.getInstance(el);
      if (modal) modal.hide();
    },
  },
};
</script>
<style scoped>
.table-wrapper {
  overflow-x: auto;
  width: 100%;
}
</style>

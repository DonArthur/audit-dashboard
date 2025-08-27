<template>
  <div>
    <h3 class="mb-4">PENGATURAN KATEGORI</h3>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          class="btn bg-primary text-white rounded"
          @click="openAddModal('DIREKTORAT')"
        >
          TAMBAH DIREKTORAT
        </button>
      </div>
      <div class="card-body">
        <p>TABEL DIREKTORAT</p>
        <vue-good-table
          :columns="kolom_direktorat"
          :rows="categories.direktorat"
          :pagination-options="{
            enabled: true,
            perPage: 3,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <button
                class="btn bg-primary text-white rounded me-2"
                @click="openEditModal('DIREKTORAT', props.row, 'direktorat')"
              >
                Ubah
              </button>
              <button
                class="btn bg-danger text-white rounded"
                @click="deleteRow(props.row, 'direktorat')"
              >
                Hapus
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          class="btn bg-primary text-white rounded"
          @click="openAddModal('KLAUSUL')"
        >
          TAMBAH KLAUSUL
        </button>
      </div>
      <div class="card-body">
        <p>TABEL KLAUSUL</p>
        <vue-good-table
          :columns="kolom_klausa"
          :rows="categories.klausa"
          :pagination-options="{
            enabled: true,
            perPage: 3,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <button
                class="btn bg-primary text-white rounded me-2"
                @click="openEditModal('KLAUSUL', props.row, 'klausa')"
              >
                Ubah
              </button>
              <button
                class="btn bg-danger text-white rounded"
                @click="deleteRow(props.row, 'klausa')"
              >
                Hapus
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          class="btn bg-primary text-white rounded"
          @click="openAddModal('SUB-KLAUSUL')"
        >
          TAMBAH SUB-KLAUSUL
        </button>
      </div>
      <div class="card-body">
        <p>TABEL SUB-KLAUSUL</p>
        <vue-good-table
          :columns="kolom_sub_klausa"
          :rows="categories.sub_klausa"
          :pagination-options="{
            enabled: true,
            perPage: 3,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <button
                class="btn bg-primary text-white rounded me-2"
                @click="openEditModal('SUB-KLAUSUL', props.row, 'sub_klausa')"
              >
                Ubah
              </button>
              <button
                class="btn bg-danger text-white rounded"
                @click="deleteRow(props.row, 'sub_klausa')"
              >
                Hapus
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          class="btn bg-primary text-white rounded"
          @click="openAddModal('ANNEX')"
        >
          TAMBAH ANNEX
        </button>
      </div>
      <div class="card-body">
        <p>TABEL ANNEX</p>
        <vue-good-table
          :columns="kolom_annex"
          :rows="categories.annex"
          :pagination-options="{
            enabled: true,
            perPage: 3,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <button
                class="btn bg-primary text-white rounded me-2"
                @click="openEditModal('ANNEX', props.row, 'annex')"
              >
                Ubah
              </button>
              <button
                class="btn bg-danger text-white rounded"
                @click="deleteRow(props.row, 'annex')"
              >
                Hapus
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          class="btn bg-primary text-white rounded"
          @click="openAddModal('KONTROL')"
        >
          TAMBAH KONTROL
        </button>
      </div>
      <div class="card-body">
        <p>TABEL KONTROL</p>
        <vue-good-table
          :columns="kolom_kontrol"
          :rows="categories.sub_control"
          :pagination-options="{
            enabled: true,
            perPage: 3,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <button
                class="btn bg-primary text-white rounded me-2"
                @click="openEditModal('KONTROL', props.row, 'sub_control')"
              >
                Ubah
              </button>
              <button
                class="btn bg-danger text-white rounded"
                @click="deleteRow(props.row, 'sub_control')"
              >
                Hapus
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          class="btn bg-primary text-white rounded"
          @click="openAddModal('SKOR')"
        >
          TAMBAH SKOR
        </button>
      </div>
      <div class="card-body">
        <p>TABEL SKOR</p>
        <vue-good-table
          :columns="kolom_skor"
          :rows="categories.kategori_skor"
          :pagination-options="{
            enabled: true,
            perPage: 3,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <button
                class="btn bg-primary text-white rounded me-2"
                @click="openEditModal('SKOR', props.row, 'kategori_skor')"
              >
                Ubah
              </button>
              <button
                class="btn bg-danger text-white rounded"
                @click="deleteRow(props.row, 'kategori_skor')"
              >
                Hapus
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="modal fade" id="addModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <span>{{ isEditMode ? "UBAH" : "TAMBAH" }} {{ title }}</span>
          </div>
          <div class="modal-body">
            <form class="user">
              <input
                type="text"
                v-if="title === 'DIREKTORAT'"
                class="form-control form-control-user border-primary"
                id="namaDirektorat"
                placeholder="Masukkan Nama Direktorat"
                v-model="form_direktorat.nama_direktorat"
              />
              <input
                type="text"
                v-if="title === 'KLAUSUL'"
                class="form-control form-control-user border-primary"
                id="namaKlausa"
                placeholder="Masukkan Nama Klausul"
                v-model="form_klausa.nama_klausa"
              />
              <input
                type="text"
                v-if="title === 'SUB-KLAUSUL'"
                class="form-control form-control-user border-primary"
                id="namaSubKlausa"
                placeholder="Masukkan Nama Sub-Klausul"
                v-model="form_sub_klausa.nama_sub_klausa"
              />
              <input
                type="text"
                v-if="title === 'ANNEX'"
                class="form-control form-control-user border-primary"
                id="namaAnnex"
                placeholder="Masukkan Nama Annex"
                v-model="form_annex.nama_annex"
              />
              <input
                type="text"
                v-if="title === 'KONTROL'"
                class="form-control form-control-user border-primary"
                id="namaKontrol"
                placeholder="Masukkan Nama Kontrol"
                v-model="form_sub_control.nama_sub_control"
              />
              <div v-if="title === 'SKOR'" class="d-flex gap-1 flex-column">
                <input
                  type="text"
                  class="form-control form-control-user border-primary"
                  id="namaSkor"
                  placeholder="Masukkan Nama Kategori"
                  v-model="form_kategori_skor.nama_kategori"
                />
                <div class="d-flex gap-1">
                  <input
                    type="number"
                    class="form-control form-control-user border-primary"
                    id="minSkor"
                    placeholder="Minimum"
                    min="0"
                    max="99"
                    v-model="form_kategori_skor.min"
                  />
                  <input
                    type="number"
                    class="form-control form-control-user border-primary"
                    id="maxSkor"
                    placeholder="Max"
                    min="1"
                    max="100"
                    v-model="form_kategori_skor.max"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              :class="`btn bg-${
                computedDisabledSave ? 'secondary' : 'primary'
              } text-white rounded`"
              :disabled="computedDisabledSave"
              @click="addCategory"
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
              <span
                >Data:
                {{
                  dataToDelete.nama_direktorat ||
                  dataToDelete.nama_annex ||
                  dataToDelete.nama_kategori ||
                  dataToDelete.nama_klausa ||
                  dataToDelete.nama_sub_control ||
                  dataToDelete.nama_sub_klausa
                }}
              </span>
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
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="hideToast"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal, Toast } from "bootstrap";
import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  getDoc,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default {
  name: "PengaturanKategori",
  components: {
    VueGoodTable,
  },
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
      title: "",
      toastMessage: "",
      requestSuccess: false,
      toastInstance: null,
      kolom_direktorat: [
        {
          label: "Nama Direktorat",
          field: "nama_direktorat",
        },
        {
          label: "Actions",
          field: "actions",
          type: "slot",
        },
      ],
      kolom_klausa: [
        {
          label: "Nama Klausul",
          field: "nama_klausa",
        },
        {
          label: "Actions",
          field: "actions",
          type: "slot",
        },
      ],
      kolom_sub_klausa: [
        {
          label: "Nama Sub-Klausul",
          field: "nama_sub_klausa",
        },
        {
          label: "Actions",
          field: "actions",
          type: "slot",
        },
      ],
      kolom_annex: [
        {
          label: "Nama Annex",
          field: "nama_annex",
        },
        {
          label: "Actions",
          field: "actions",
          type: "slot",
        },
      ],
      kolom_kontrol: [
        {
          label: "Nama Kontrol",
          field: "nama_sub_control",
        },
        {
          label: "Actions",
          field: "actions",
          type: "slot",
        },
      ],
      kolom_skor: [
        {
          label: "Skor Minimum",
          field: "min",
          type: "number",
        },
        {
          label: "Skor Maksimum",
          field: "max",
          type: "number",
        },
        {
          label: "Nama Kategori",
          field: "nama_kategori",
        },
        {
          label: "Actions",
          field: "actions",
          type: "slot",
        },
      ],
      form_direktorat: {
        nama_direktorat: "",
      },
      form_klausa: {
        nama_klausa: "",
      },
      form_sub_klausa: {
        nama_sub_klausa: "",
      },
      form_annex: {
        nama_annex: "",
      },
      form_sub_control: {
        nama_sub_control: "",
      },
      form_kategori_skor: {
        min: null,
        max: null,
        nama_kategori: "",
      },
      isEditMode: false,
      editDocId: null,
      dataToDelete: null,
      categoryToDelete: null,
    };
  },
  mounted() {
    this.getAllCategories();
  },
  computed: {
    computedDisabledSave() {
      let status = false;
      switch (this.title) {
        case "DIREKTORAT":
          status = this.form_direktorat.nama_direktorat.length === 0;
          break;
        case "KLAUSUL":
          status = this.form_klausa.nama_klausa.length === 0;
          break;
        case "SUB-KLAUSUL":
          status = this.form_sub_klausa.nama_sub_klausa.length === 0;
          break;
        case "ANNEX":
          status = this.form_annex.nama_annex.length === 0;
          break;
        case "KONTROL":
          status = this.form_sub_control.nama_sub_control.length === 0;
          break;
        case "SKOR":
          status =
            (this.form_kategori_skor.max < 0 &&
              (this.form_kategori_skor.min < 0 ||
                this.form_kategori_skor.min > this.form_kategori_skor.max)) ||
            this.form_kategori_skor.nama_kategori.length === 0;
          break;
        default:
          break;
      }
      return status;
    },
  },
  methods: {
    getAllCategories() {
      this.getCategoryData("annex");
      this.getCategoryData("direktorat");
      this.getCategoryData("kategori_skor");
      this.getCategoryData("klausa");
      this.getCategoryData("sub_control");
      this.getCategoryData("sub_klausa");
    },
    openAddModal(text) {
      this.title = text;
      const modalEl = document.getElementById("addModal");
      const modal = new Modal(modalEl);
      modal.show();
    },
    openEditModal(text, data, category) {
      this.title = text;
      this.isEditMode = true;
      const dataToEdit = this.categories[category].filter(
        (item) => item.docId === data.docId
      );
      const formName = "form_" + category;
      this.editDocId = dataToEdit[0].docId;
      delete dataToEdit[0].docId;
      this[formName] = dataToEdit[0];
      const modalEl = document.getElementById("addModal");
      const modal = new Modal(modalEl);
      modal.show();
    },
    async getCategoryData(category) {
      const querySnapShot = await getDocs(collection(db, category));
      this.categories[category] = querySnapShot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
    },
    async addCategory() {
      let category = "";
      let newData = null;
      let isDuplicate = false;
      switch (this.title) {
        case "DIREKTORAT":
          category = "direktorat";
          newData = this.form_direktorat;
          isDuplicate = this.hasDuplicate(
            newData.nama_direktorat,
            "direktorat",
            "nama_direktorat"
          );
          this.form_direktorat = { nama_direktorat: "" };
          break;
        case "KLAUSUL":
          category = "klausa";
          newData = this.form_klausa;
          isDuplicate = this.hasDuplicate(
            newData.nama_klausa,
            "klausa",
            "nama_klausa"
          );
          this.form_klausa = { nama_klausa: "" };
          break;
        case "SUB-KLAUSUL":
          category = "sub_klausa";
          newData = this.form_sub_klausa;
          isDuplicate = this.hasDuplicate(
            newData.nama_sub_klausa,
            "sub_klausa",
            "nama_sub_klausa"
          );
          this.form_sub_klausa = { nama_sub_klausa: "" };
          break;
        case "ANNEX":
          category = "annex";
          newData = this.form_annex;
          isDuplicate = this.hasDuplicate(
            newData.nama_annex,
            "annex",
            "nama_annex"
          );
          this.form_annex = { nama_annex: "" };
          break;
        case "KONTROL":
          category = "sub_control";
          newData = this.form_sub_control;
          isDuplicate = this.hasDuplicate(
            newData.nama_sub_control,
            "sub_control",
            "nama_sub_control"
          );
          this.form_sub_control = { nama_sub_control: "" };
          break;
        case "SKOR":
          category = "kategori_skor";
          newData = this.kategori_skor;
          this.form_kategori_skor = { max: null, min: null, nama_kategori: "" };
          break;
        default:
          break;
      }
      if (isDuplicate) {
        this.requestSuccess = false;
        this.showToast("Data sudah ada");
      } else {
        if (this.isEditMode) {
          const docRef = doc(collection(db, category), this.editDocId);
          await updateDoc(docRef, newData)
            .then(() => {
              const addModalEl = document.getElementById("addModal");
              const addModal =
                Modal.getInstance(addModalEl) || new Modal(addModalEl);
              addModal.hide();
              this.requestSuccess = true;
              this.showToast("Data berhasil diubah");
              this.getAllCategories();
            })
            .catch((err) => {
              this.requestSuccess = false;
              this.showToast(`Terjadi kesalahan: ${err}`);
            });
        }
        await addDoc(collection(db, category), newData)
          .then(() => {
            const addModalEl = document.getElementById("addModal");
            const addModal =
              Modal.getInstance(addModalEl) || new Modal(addModalEl);
            addModal.hide();
            this.requestSuccess = true;
            this.showToast("Data berhasil disimpan");
            this.getAllCategories();
          })
          .catch((err) => {
            this.requestSuccess = false;
            this.showToast(`Terjadi kesalahan: ${err}`);
          });
      }
    },
    hasDuplicate(value, categoryName, field) {
      let duplicate = false;
      // for (let i = 0; i < this.categories[categoryName].length; i++) {
      //     if (this.categories[categoryName][i][field] === value) {
      //         duplicate = true
      //     }
      // }
      return duplicate;
    },
    deleteRow(row, category) {
      this.dataToDelete = row;
      this.categoryToDelete = category;
      const modalEl = document.getElementById("confirmDeleteModal");
      const modal = new Modal(modalEl);
      modal.show();
    },
    async confirmDelete() {
      const docRef = doc(db, this.categoryToDelete, this.dataToDelete.docId);
      await deleteDoc(docRef)
        .then(() => {
          const confirmDeleteModalEl =
            document.getElementById("confirmDeleteModal");
          const confirmDeleteModal =
            Modal.getInstance(confirmDeleteModalEl) ||
            new Modal(confirmDeleteModalEl);
          confirmDeleteModal.hide();
          this.requestSuccess = true;
          this.showToast("Data berhasil dihapus");
          this.getAllCategories();
        })
        .catch((err) => {
          this.requestSuccess = false;
          this.showToast(`Terjadi kesalahan: ${err}`);
        });
    },
    showToast(message) {
      this.toastMessage = message;
      const toastEl = this.$refs.toastEl;
      this.toastInstance = new Toast(toastEl);
      this.toastInstance.show();
    },
    hideToast() {
      if (this.toastInstance) {
        this.toastInstance.hide();
      }
    },
  },
};
</script>
<style></style>

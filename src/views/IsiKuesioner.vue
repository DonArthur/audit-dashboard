<template>
  <div>
    <h3 class="mb-4">ISI KUESIONER</h3>
    <div class="card shadow mb-4 p-3">
      <form class="d-flex flex-column gap-2 align-items-start">
        <label for="direktorat_id" class="form-label">Pilih direktorat</label>
        <select v-model="currDirektorat" class="form-select w-50">
          <option v-for="item in direktorat" :key="item.docId" :value="item">
            {{ item.nama_direktorat }}
          </option>
        </select>
        <label for="direktorat_id" class="form-label"
          >Tulis nama karyawan</label
        >
        <input type="text" class="w-50" v-model="employeeName" />
        <button
          class="btn btn-primary"
          @click="(e) => getQuestions(e)"
          :disabled="!currDirektorat"
        >
          Isi Pertanyaan
        </button>
      </form>
    </div>
    <div
      class="card shadow mb-4 p-3"
      v-if="currDirektorat && pertanyaan.length > 0"
    >
      <div v-for="(sub, index) in subs" :key="index">
        <b>{{ sub.nama_sub_klausa || sub.nama_sub_control }}</b>
        <div v-for="(item, index) in pertanyaan" :key="item.id">
          <div
            class="mb-2 d-flex flex-column"
            v-if="
              item.sub_control_id === sub.id || item.sub_klausa_id === sub.id
            "
          >
            <span>{{ item.pertanyaan }}</span>
            <div>
              <input
                type="radio"
                :name="item.pertanyaan"
                id="true"
                :value="true"
                v-model="pertanyaan[index].jawaban"
              />
              <label for="true" class="mx-2">Ya</label>
            </div>
            <div>
              <input
                type="radio"
                :name="item.pertanyaan"
                id="false"
                :value="false"
                v-model="pertanyaan[index].jawaban"
              />
              <label for="false" class="mx-2">Tidak</label>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="(e) => addEmployee(e)">
        Kirim
      </button>
    </div>
    <div v-else-if="currDirektorat">Belum ada pertanyaan</div>
    <div v-else>Silakan pilih direktorat</div>
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
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Modal, Toast } from "bootstrap";

export default {
  name: "IsiKuesioner",
  data() {
    return {
      direktorat: [],
      currDirektorat: null,
      employeeName: "",
      employeeId: "",
      subs: [],
      pertanyaan: [],
      toastMessage: "",
      requestSuccess: false,
      toastInstance: null,
    };
  },
  mounted() {
    this.getDirektorat();
  },
  methods: {
    async getDirektorat() {
      const querySnapshot = await getDocs(collection(db, "direktorat"));
      this.direktorat = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
    },
    async getSubs() {
      let subConArr = [];
      let subKlaArr = [];
      this.pertanyaan.forEach((item) => {
        if (item.sub_control_id !== 0) {
          subConArr.push(item.sub_control_id);
        } else if (item.sub_klausa_id !== 0) {
          subKlaArr.push(item.sub_klausa_id);
        }
      });
      const uniqueCon = [...new Set(subConArr)];
      const uniqueKla = [...new Set(subKlaArr)];
      const collect = uniqueCon.length > 0 ? "sub_control" : "sub_klausa";
      const arr = uniqueCon.length > 0 ? uniqueCon : uniqueKla;
      const colRef = collection(db, collect);
      const q = query(colRef, where(`id`, "in", arr));
      const qSnapshot = await getDocs(q);
      this.subs = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      this.subs = this.subs.sort((a, b) => {
        const numA = parseFloat(a.nama_sub_klausa.split(" ")[0]); // "9.1" → 9.1
        const numB = parseFloat(b.nama_sub_klausa.split(" ")[0]); // "10.1" → 10.1
        return numA - numB;
      });
      console.log(this.subs);
    },
    async getQuestions(e) {
      e.preventDefault();
      const colRef = collection(db, "pertanyaan");
      const q = query(
        colRef,
        where("direktorat_id", "==", this.currDirektorat.id)
      );
      const querySnapshot = await getDocs(q);
      this.pertanyaan = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      if (querySnapshot) {
        this.getSubs();
      }
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
    async getEmployee(e) {
      const colRef = collection(db, "employee");
      const q = query(
        colRef,
        where("direktorat_id", "==", this.currDirektorat.docId)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const filtered = data.filter((item) => item.name === this.employeeName);
      this.employeeId = filtered[0].docId || "";
      this.submitForm(e);
    },
    async addEmployee(e) {
      let newData = {
        direktorat_id: this.currDirektorat.docId,
        name: this.employeeName,
      };
      console.log(newData);
      await addDoc(collection(db, "employee"), newData)
        .then(() => {
          this.getEmployee(e);
        })
        .catch((err) => {
          this.requestSuccess = false;
          this.showToast(`Terjadi kesalahan: ${err}`);
        });
    },
    async submitForm(e) {
      e.preventDefault();
      console.log(this.pertanyaan);
      const newData = this.pertanyaan.map((item) => ({
        annex_id: item.annex_id,
        direktorat_id: this.currDirektorat.docId,
        employee_id: this.employeeId,
        jawaban: item.jawaban,
        klausa_id: item.klausa_id,
        question_id: item.docId,
        session: 1,
        sub_control_id: item.sub_control_id,
        sub_klausa_id: item.sub_klausa_id,
      }));
      const colRef = collection(db, "hasil_pertanyaan");
      await Promise.all(newData.map((item) => addDoc(colRef, item)));
      this.requestSuccess = true;
      this.showToast("Jawaban berhasil disimpan");
      // await addDoc(collection(db, "hasil_pertanyaan"), newData)
      //   .then(() => {
      //     const addModalEl = document.getElementById("addModal");
      //     const addModal =
      //       Modal.getInstance(addModalEl) || new Modal(addModalEl);
      //     addModal.hide();
      //     this.requestSuccess = true;
      //     this.showToast("Data berhasil disimpan");
      //     this.getAllCategories();
      //   })
      //   .catch((err) => {
      //     this.requestSuccess = false;
      //     this.showToast(`Terjadi kesalahan: ${err}`);
      //   });
    },
  },
};
</script>
<style></style>
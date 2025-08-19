<template>
  <div>
    <h3 class="mb-4">UBAH KUESIONER</h3>
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
        <select v-model="currDirektorat" class="form-select w-50">
          <option v-for="item in direktorat" :key="item.docId" :value="item">
            {{ item.nama_direktorat }}
          </option>
        </select>
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
      <div v-for="(item, index) in pertanyaan" class="mb-2" :key="item.id">
        <span>{{ item.pertanyaan }}</span
        ><br />
        <input
          type="radio"
          :name="item.pertanyaan"
          id="true"
          :value="true"
          v-model="pertanyaan[index].jawaban"
        />
        <label for="true" class="mx-2">Ya</label>
        <input
          type="radio"
          :name="item.pertanyaan"
          id="false"
          :value="false"
          v-model="pertanyaan[index].jawaban"
        />
        <label for="false" class="mx-2">Tidak</label>
      </div>
      <button class="btn btn-primary" @click="(e) => submitForm(e)">
        Kirim
      </button>
    </div>
    <div v-else-if="currDirektorat">Belum ada pertanyaan</div>
    <div v-else>Silakan pilih direktorat</div>
  </div>
</template>
<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default {
  name: "IsiKuesioner",
  data() {
    return {
      direktorat: [],
      currDirektorat: null,
      employeeName: "",
      pertanyaan: [],
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
    },
    submitForm(e) {
      e.preventDefault();
      console.log(this.pertanyaan);
    },
  },
};
</script>
<style></style>
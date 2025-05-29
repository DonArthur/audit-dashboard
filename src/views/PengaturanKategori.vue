<template>
    <div>
        <h1>PENGATURAN KATEGORI</h1>
        <div class="section">
            <button @click="addQuestion">TAMBAH DIREKTORAT</button>
            <p>TABEL DIREKTORAT</p>
            {{ pertanyaan }}
        </div>
        <div class="section">
            <button @click="addQuestion">TAMBAH KLAUSUL</button>
            <p>TABEL KLAUSUL</p>
            {{ pertanyaan }}
        </div>
        <div class="section">
            <button @click="addQuestion">TAMBAH SUB-KLAUSUL</button>
            <p>TABEL SUL-KLAUSUL</p>
            {{ pertanyaan }}
        </div>
        <div class="section">
            <button @click="addQuestion">TAMBAH ANNEX</button>
            <p>TABEL ANNEX</p>
            {{ pertanyaan }}
        </div>
        <div class="section">
            <button @click="addQuestion">TAMBAH KONTROL</button>
            <p>TABEL KONTROL</p>
            {{ pertanyaan }}
        </div>
        <div class="section">
            <button @click="addQuestion">TAMBAH SKOR</button>
            <p>TABEL SKOR</p>
            {{ pertanyaan }}
        </div>
        <div class="section">
            <button @click="addQuestion">TAMBAH ASET</button>
            <p>TABEL ASET</p>
            {{ pertanyaan }}
        </div>
    </div>
</template>
<script>
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default {
    name: 'PengaturanKategori',
    data() {
        return {
            pertanyaan: [],
        }
    },
    async mounted() {
        this.getQuestion()
    },
    methods: {
        async getQuestion() {
            const querySnapShot = await getDocs(collection(db, 'pertanyaan'))
            this.pertanyaan = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        },
        async addQuestion() {
            const newQuestion = {
                annex_id: 0,
                direktorat_id: 1,
                klausa_id: 4,
                pertanyaan: 'Tes tambah pertanyaan',
                sub_control_id: 0,
                sub_klausa_id: 1
            }
            await addDoc(collection(db, 'pertanyaan'), newQuestion).then(() => {
                this.getQuestion()
            }).catch((err) => console.error(err))
        },
    },
}
</script>
<style></style>

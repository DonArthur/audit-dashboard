<template>
    <div>
        <h1>PENGATURAN KUESIONER</h1>
        <button @click="addQuestion">TAMBAH PERTANYAAN</button>
        <p>TABEL PERTANYAAN</p>
        {{ pertanyaan }}
    </div>
</template>
<script>
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default {
    name: 'PengaturanKuesioner',
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

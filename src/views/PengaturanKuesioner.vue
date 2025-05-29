<template>
    <div>
        <h1>PENGATURAN KUESIONER</h1>
        <button>TAMBAH PERTANYAAN</button>
        <p>TABEL PERTANYAAN</p>
        {{ pertanyaan }}
    </div>
</template>
<script>
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default {
    name: 'PengaturanKuesioner',
    data() {
        return {
            pertanyaan: [],
        }
    },
    async mounted() {
        const querySnapShot = await getDocs(collection(db, 'pertanyaan'))
        this.pertanyaan = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
}
</script>
<style></style>

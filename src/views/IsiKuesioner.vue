<template>
    <div>
        <h3 class="mb-4">ISI KUESIONER</h3>
        <div class="card shadow mb-4 p-3">
            <form class="d-flex flex-column gap-2 align-items-start">
                <label for="direktorat_id">Pilih direktorat</label>
                <select v-model="currDirektorat">
                    <option v-for="(item) in direktorat" :key="item.docId" :value="item">{{ item.nama_direktorat }}</option>
                </select>
                <button class="btn btn-primary" @click="(e) => getQuestions(e)">Isi Pertanyaan</button>
            </form>
        </div>
        <div class="card shadow mb-4 p-3" v-if="currDirektorat && pertanyaan.length > 0">
            <div v-for="(item, index) in pertanyaan" :key="item.id">
                <span>{{ index + 1 }}. &nbsp;</span>{{ item.pertanyaan }}
            </div>
        </div>
        <div v-else>
            Belum ada pertanyaan
        </div>
    </div>
</template>
<script>
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default {
    name: 'IsiKuesioner',
    data() {
        return {
            direktorat: [],
            currDirektorat: null,
            pertanyaan: [],
        }
    },
    mounted() {
        this.getDirektorat()
    },
    methods: {
        async getDirektorat() {
            const querySnapshot = await getDocs(collection(db, 'direktorat'))
            this.direktorat = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
        },
        async getQuestions(e) {
            e.preventDefault()
            const colRef = collection(db, 'pertanyaan')
            const q = query(colRef, where('direktorat_id', '==', this.currDirektorat.id))
            const querySnapshot = await getDocs(q)
            this.pertanyaan = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
        },
    },
}
</script>
<style></style>
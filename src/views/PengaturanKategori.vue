<template>
    <div>
        <h3 class="mb-4">PENGATURAN KATEGORI</h3>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('DIREKTORAT')">TAMBAH DIREKTORAT</button>
            </div>
            <div class="card-body">
                <p>TABEL DIREKTORAT</p>
                <vue-good-table :columns="columns" :rows="rows"></vue-good-table>
                {{ categories.direktorat }}
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('KLAUSUL')">TAMBAH KLAUSUL</button>
            </div>
            <div class="card-body">
                <p>TABEL KLAUSUL</p>
                {{ categories.klausa }}
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('SUB-KLAUSUL')">TAMBAH SUB-KLAUSUL</button>
            </div>
            <div class="card-body">
                <p>TABEL SUB-KLAUSUL</p>
                {{ categories.sub_klausa }}
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('ANNEX')">TAMBAH ANNEX</button>
            </div>
            <div class="card-body">
                <p>TABEL ANNEX</p>
                {{ categories.annex }}
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('KONTROL')">TAMBAH KONTROL</button>
            </div>
            <div class="card-body">
                <p>TABEL KONTROL</p>
                {{ categories.sub_control }}
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('SKOR')">TAMBAH SKOR</button>
            </div>
            <div class="card-body">
                <p>TABEL SKOR</p>
                {{ categories.kategori_skor }}
            </div>
        </div>
        <div class="modal fade" id="addModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>TAMBAH {{ title }}</span>
                    </div>
                    <div class="modal-body">
                        <form class="user">
                            <input type="text" class="form-control form-control-user border-primary"
                            id="namaDirektorat" placeholder="Masukkan Nama Direktorat" />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn bg-primary text-white rounded">SIMPAN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default {
    name: 'PengaturanKategori',
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
            title: '',
            columns: [
                {
                label: 'Name',
                field: 'name',
                },
                {
                label: 'Age',
                field: 'age',
                type: 'number',
                },
                {
                label: 'Created On',
                field: 'createdAt',
                type: 'date',
                dateInputFormat: 'yyyy-MM-dd',
                dateOutputFormat: 'MMM do yy',
                },
                {
                label: 'Percent',
                field: 'score',
                type: 'percentage',
                },
            ],
            rows: [
                { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
                { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
                { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
                { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
                { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
                { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
            ],
        }
    },
    async mounted() {
        this.getCategoryData('annex')
        this.getCategoryData('direktorat')
        this.getCategoryData('kategori_skor')
        this.getCategoryData('klausa')
        this.getCategoryData('sub_control')
        this.getCategoryData('sub_klausa')
    },
    methods: {
        openAddModal(text) {
            this.title = text
            const modalEl = document.getElementById('addModal')
            const modal = new Modal(modalEl)
            modal.show()
        },
        async getCategoryData(category) {
            const querySnapShot = await getDocs(collection(db, category))
            this.categories[category] = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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

<template>
    <div>
        <h3 class="mb-4">PENGATURAN KATEGORI</h3>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('DIREKTORAT')">TAMBAH DIREKTORAT</button>
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
                            <button class="btn bg-primary text-white rounded me-2" @click="editRow(props.row)">Edit</button>
                            <button class="btn bg-danger text-white rounded" @click="deleteRow(props.row)">Delete</button>
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('KLAUSUL')">TAMBAH KLAUSUL</button>
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
                            <button class="btn bg-primary text-white rounded me-2" @click="editRow(props.row)">Edit</button>
                            <button class="btn bg-danger text-white rounded" @click="deleteRow(props.row)">Delete</button>
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('SUB-KLAUSUL')">TAMBAH SUB-KLAUSUL</button>
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
                            <button class="btn bg-primary text-white rounded me-2" @click="editRow(props.row)">Edit</button>
                            <button class="btn bg-danger text-white rounded" @click="deleteRow(props.row)">Delete</button>
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('ANNEX')">TAMBAH ANNEX</button>
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
                            <button class="btn bg-primary text-white rounded me-2" @click="editRow(props.row)">Edit</button>
                            <button class="btn bg-danger text-white rounded" @click="deleteRow(props.row)">Delete</button>
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('KONTROL')">TAMBAH KONTROL</button>
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
                            <button class="btn bg-primary text-white rounded me-2" @click="editRow(props.row)">Edit</button>
                            <button class="btn bg-danger text-white rounded" @click="deleteRow(props.row)">Delete</button>
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal('SKOR')">TAMBAH SKOR</button>
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
                            <button class="btn bg-primary text-white rounded me-2" @click="editRow(props.row)">Edit</button>
                            <button class="btn bg-danger text-white rounded" @click="deleteRow(props.row)">Delete</button>
                        </span>
                    </template>
                </vue-good-table>
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
            kolom_direktorat: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Nama Direktorat',
                    field: 'nama_direktorat',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
            ],
            kolom_klausa: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Nama Klausul',
                    field: 'nama_klausa',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
            ],
            kolom_sub_klausa: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Nama Sub-Klausul',
                    field: 'nama_sub_klausa',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
            ],
            kolom_annex: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Nama Annex',
                    field: 'nama_annex',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
            ],
            kolom_kontrol: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Nama Kontrol',
                    field: 'nama_sub_control',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
            ],
            kolom_skor: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Skor Minimum',
                    field: 'min',
                    type: 'number',
                },
                {
                    label: 'Skor Maksimum',
                    field: 'max',
                    type: 'number',
                },
                {
                    label: 'Nama Kategori',
                    field: 'nama_kategori',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
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
        editRow(row) {
            console.log(row)
        },
        deleteRow(row) {
            console.log(row)
        },
    },
}
</script>
<style></style>

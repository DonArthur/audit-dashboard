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
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>TAMBAH {{ title }}</span>
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
                                v-model="form_kontrol.nama_sub_control"
                            />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            :class="`btn bg-${computedDisabledSave ? 'secondary' : 'primary'} text-white rounded`"
                            :disabled="computedDisabledSave"
                            @click="addCategory"
                        >
                            SIMPAN
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            :class="`toast align-items-center ${requestSuccess ? 'text-bg-primary' : 'text-bg-danger'} border-0 position-fixed top-0 start-50 translate-middle-x m-3`"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref="toastEl"
            >
            <div class="d-flex">
                <div class="toast-body">
                {{ toastMessage }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
            </div>
        </div>
    </div>
</template>
<script>
import { Modal, Toast } from 'bootstrap';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, query, orderBy, limit, getDoc, where } from 'firebase/firestore';

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
            toastMessage: '',
            requestSuccess: false,
            toastInstance: null,
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
            form_direktorat: {
                id: null,
                nama_direktorat: ''
            },
            form_klausa: {
                id: null,
                nama_klausa: '',
            },
            form_sub_klausa: {
                id: null,
                nama_sub_klausa: '',
            },
            form_annex: {
                id: null,
                nama_annex: '',
            },
            form_kontrol: {
                id: null,
                nama_sub_control: '',
            },
            form_skor: {
                min: null,
                max: null,
                nama_kategori: '',
            },
        }
    },
    mounted() {
        this.getAllCategories()
    },
    computed: {
        computedDisabledSave() {
            let status = false
            switch (this.title) {
                case 'DIREKTORAT':
                    status = this.form_direktorat.nama_direktorat.length === 0
                    break
                case 'KLAUSUL':
                    status = this.form_klausa.nama_klausa.length === 0
                    break
                case 'SUB-KLAUSUL':
                    status = this.form_sub_klausa.nama_sub_klausa.length === 0
                    break
                case 'ANNEX':
                    status = this.form_annex.nama_annex.length === 0
                    break
                case 'KONTROL':
                    status = this.form_kontrol.nama_sub_control.length === 0
                    break
                case 'SKOR':
                    status = this.form_skor.max < 0 && 
                        (this.form_skor.min < 0 || this.form_skor.min > this.form_skor.max) || 
                        this.form_skor.nama_kategori.length === 0
                    break
                default:
                    break
            }
            return status
        },
    },
    methods: {
        getAllCategories() {
            this.getCategoryData('annex')
            this.getLastId('annex')
            this.getCategoryData('direktorat')
            this.getLastId('direktorat')
            this.getCategoryData('kategori_skor')
            this.getLastId('kategori_skor')
            this.getCategoryData('klausa')
            this.getLastId('klausa')
            this.getCategoryData('sub_control')
            this.getLastId('sub_control')
            this.getCategoryData('sub_klausa')
            this.getLastId('sub_klausa')
        },
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
        async getLastId(category) {
            const colRef = collection(db, category)
            const q = query(colRef, orderBy('id', 'desc'), limit(1))
            try {
                const querySnapshot = await getDocs(q)
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]
                    const data = doc.data()
                    if (data.id) {
                        switch (category) {
                            case 'annex':
                                this.form_annex.id = data.id + 1
                                break
                            case 'direktorat':
                                this.form_direktorat.id = data.id + 1
                                break
                            case 'klausa':
                                this.form_klausa.id = data.id + 1
                                break
                            case 'sub-control':
                                this.form_kontrol.id = data.id + 1
                                break
                            case 'sub_klausa':
                                this.form_sub_klausa.id = data.id + 1
                                break
                            default:
                                break
                        }
                    }
                } else {
                    console.error('No documents found')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async addCategory() {
            let category = ''
            let newData = null
            let isDuplicate = false
            switch (this.title) {
                case 'DIREKTORAT':
                    category = 'direktorat'
                    newData = this.form_direktorat
                    isDuplicate = this.hasDuplicate(newData.nama_direktorat, 'direktorat', 'nama_direktorat')
                    this.form_direktorat = { id: newData.id + 1, nama_direktorat: '' }
                    break
                case 'KLAUSUL':
                    category = 'klausa'
                    newData = this.form_klausa
                    isDuplicate = this.hasDuplicate(newData.nama_klausa, 'klausa', 'nama_klausa')
                    this.form_klausa = { id: newData.id + 1, nama_klausa: '' }
                    break
                case 'SUB-KLAUSUL':
                    category = 'sub_klausa'
                    newData = this.form_sub_klausa
                    isDuplicate = this.hasDuplicate(newData.nama_sub_klausa, 'sub_klausa', 'nama_sub_klausa')
                    this.form_sub_klausa = { id: newData.id, nama_sub_klausa: '' }
                    break
                case 'ANNEX':
                    category = 'annex'
                    newData = this.form_annex
                    isDuplicate = this.hasDuplicate(newData.nama_annex, 'annex', 'nama_annex')
                    this.form_annex = { id: newData.id, nama_annex: '' }
                    break
                case 'KONTROL':
                    category = 'sub_control'
                    newData = this.form_kontrol
                    isDuplicate = this.hasDuplicate(newData.nama_sub_control, 'sub_control', 'nama_sub_control')
                    this.form_kontrol = { id: newData.id, nama_sub_control: '' }
                    break
                case 'SKOR':
                    category = 'kategori_skor'
                    newData = this.form_skor
                    this.form_skor = { max: null, min: null, nama_kategori: '' }
                    break
                default:
                    break
            }
            if (isDuplicate) {
                this.requestSuccess = false
                this.showToast('Data sudah ada')
            } else {
                await addDoc(collection(db, category), newData).then(() => {
                    const addModalEl = document.getElementById('addModal')
                    const addModal = Modal.getInstance(addModalEl) || new Modal(addModalEl)
                    addModal.hide()
                    this.requestSuccess = true
                    this.showToast('Data berhasil disimpan')
                    this.getAllCategories()
                }).catch((err) => {
                    this.requestSuccess = false
                    this.showToast(`Terjadi kesalahan: ${err}`)
                })
            }
        },
        hasDuplicate(value, categoryName, field) {
            for (let i = 0; i < this.categories[categoryName].length; i++) {
                if (this.categories[categoryName][i][field] === value) {
                    return true
                }
                return false
            }
        },
        editRow(row) {
            console.log(row)
        },
        deleteRow(row) {
            console.log(row)
        },
        showToast(message) {
            this.toastMessage = message
            const toastEl = this.$refs.toastEl
            this.toastInstance = new Toast(toastEl)
            this.toastInstance.show()
        },
        hideToast() {
            if (this.toastInstance) {
            this.toastInstance.hide()
            }
        },
    },
}
</script>
<style></style>

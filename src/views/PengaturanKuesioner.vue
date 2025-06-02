<template>
    <div>
        <h3 class="mb-4">PENGATURAN KUESIONER</h3>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <button class="btn bg-primary text-white rounded" @click="openAddModal">TAMBAH PERTANYAAN</button>
            </div>
            <div class="card-body">
                <p>TABEL PERTANYAAN</p>
                <div class="table-wrapper">
                    <vue-good-table
                        :columns="kolom_pertanyaan"
                        :rows="pertanyaan"
                        :fixed-header="true"
                        :pagination-options="{
                            enabled: true,
                            perPage: 10,
                        }"
                    >
                        <template #table-row="props">
                            <span v-if="props.column.field === 'actions'">
                                <button class="btn bg-primary text-white rounded me-2" @click="openEditQuestion(props.row)">Ubah</button>
                                <button class="btn bg-danger text-white rounded" @click="deleteQuestion(props.row)">Hapus</button>
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span>{{isEditMode ? 'UBAH' : 'TAMBAH'}} PERTANYAAN</span>
                    </div>
                    <div class="modal-body">
                        <form>
                            <label for="direktorat_id">Pilih Direktorat</label>
                            <select
                                class="form-control"
                                v-if="categories.direktorat"
                                id="direktorat_id"
                                v-model="formPertanyaan.direktorat_id"
                            >
                                <option
                                    v-for="direktorat in categories.direktorat"
                                    :key="direktorat.docId"
                                    :value="direktorat.id"
                                >
                                    {{ direktorat.nama_direktorat }}
                                </option>
                            </select>
                            <label for="direktorat_id" v-if="categories.klausa && !formPertanyaan.annex_id">Pilih Klausul</label>
                            <div v-if="categories.klausa && !formPertanyaan.annex_id">
                                <select
                                    class="form-control"
                                    id="klausa_id"
                                    v-model="formPertanyaan.klausa_id"
                                >
                                    <option
                                        v-for="klausa in categories.klausa"
                                        :key="klausa.docId"
                                        :value="klausa.id"
                                    >
                                        {{ klausa.nama_klausa }}
                                    </option>
                                </select>
                                <button class="btn bg-danger text-white" @click="(e) => { e.preventDefault(); formPertanyaan.klausa_id = 0; }">Hapus</button>
                            </div>
                            <label for="direktorat_id" v-if="categories.sub_klausa && formPertanyaan.klausa_id">Pilih Sub-Klausul</label>
                            <div v-if="categories.sub_klausa && formPertanyaan.klausa_id">
                                <select
                                    class="form-control"
                                    id="sub_klausa_id"
                                    v-model="formPertanyaan.sub_klausa_id"
                                >
                                    <option
                                        v-for="subKlausa in categories.sub_klausa"
                                        :key="subKlausa.docId"
                                        :value="subKlausa.id"
                                    >
                                        {{ subKlausa.nama_sub_klausa }}
                                    </option>
                                </select>
                                <button class="btn bg-danger text-white" @click="(e) => { e.preventDefault(); formPertanyaan.sub_klausa_id = 0; }">Hapus</button>
                            </div>
                            <label for="direktorat_id" v-if="categories.annex && !formPertanyaan.klausa_id">Pilih Annex</label>
                            <div v-if="categories.annex && !formPertanyaan.klausa_id">
                                <select
                                    class="form-control"
                                    id="annex_id"
                                    v-model="formPertanyaan.annex_id"
                                >
                                    <option
                                        v-for="annex in categories.annex"
                                        :key="annex.docId"
                                        :value="annex.id"
                                    >
                                        {{ annex.nama_annex }}
                                    </option>
                                </select>
                                <button class="btn bg-danger text-white" @click="(e) => { e.preventDefault(); formPertanyaan.annex_id = 0; }">Hapus</button>
                            </div>
                            <label for="direktorat_id" v-if="categories.sub_control && formPertanyaan.annex_id">Pilih Kontrol</label>
                            <div v-if="categories.sub_control && formPertanyaan.annex_id">
                                <select
                                    class="form-control"
                                    id="sub_control_id"
                                    v-model="formPertanyaan.sub_control_id"
                                >
                                    <option
                                        v-for="subKon in categories.sub_control"
                                        :key="subKon.docId"
                                        :value="subKon.id"
                                    >
                                        {{ subKon.nama_sub_control }}
                                    </option>
                                </select>
                                <button class="btn bg-danger text-white" @click="(e) => { e.preventDefault(); formPertanyaan.sub_control_id = 0; }">Hapus</button>
                            </div>
                            <label for="pertanyaan">Isi Pertanyaan</label><br />
                            <input type="textarea" v-model="formPertanyaan.pertanyaan" :rows="4" />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            :class="`btn bg-${computedDisabledSave ? 'secondary' : 'primary'} text-white rounded`"
                            :disabled="computedDisabledSave"
                            @click="addQuestion"
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
                            <span>ID: {{ dataToDelete.id }}</span><br />
                            <span>Pertanyaan: {{ dataToDelete.pertanyaan }}</span>
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
                <!-- <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button> -->
            </div>
        </div>
    </div>
</template>
<script>
import { Modal, Toast } from 'bootstrap';
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, query, orderBy, limit, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'

export default {
    name: 'PengaturanKuesioner',
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
            defaultFormPertanyaan: {},
            formPertanyaan: {
                id: 0,
                annex_id: 0,
                direktorat_id: 0,
                klausa_id: 0,
                pertanyaan: '',
                sub_control_id: 0,
                sub_klausa_id: 0,
            },
            kolom_pertanyaan: [
                {
                    label: 'No.',
                    field: 'id',
                },
                {
                    label: 'Direktorat',
                    field: this.getDirektoratFieldName,
                },
                {
                    label: 'Annex',
                    field: this.getAnnexFieldName,
                },
                {
                    label: 'Kontrol',
                    field: this.getKontrolFieldName,
                },
                {
                    label: 'Klausul',
                    field: this.getKlausaFieldName,
                },
                {
                    label: 'Sub-Klausul',
                    field: this.getSubKlausaFieldName,
                },
                {
                    label: 'Pertanyaan',
                    field: 'pertanyaan',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    type: 'slot',
                },
            ],
            pertanyaan: [],
            isEditMode: false,
            toastMessage: '',
            requestSuccess: false,
            toastInstance: null,
            dataToDelete: null,
        }
    },
    async mounted() {
        this.defaultFormPertanyaan = this.formPertanyaan
        this.getCategories()
        this.getQuestion()
        this.getLastId()
    },
    computed: {
        computedDisabledSave() {
            return !this.formPertanyaan.direktorat_id ||
                    ((this.formPertanyaan.annex_id && !this.formPertanyaan.sub_control_id) ||
                    (this.formPertanyaan.klausa_id && !this.formPertanyaan.sub_klausa_id)) ||
                    !this.formPertanyaan.pertanyaan
        },
    },
    methods: {
        getCategories() {
            Object.keys(this.categories).forEach(async item => {
                const querySnapshot = await getDocs(collection(db, item))
                this.categories[item] = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
            })
        },
        async getQuestion() {
            const querySnapShot = await getDocs(collection(db, 'pertanyaan'))
            this.pertanyaan = querySnapShot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
        },
        openAddModal() {
            this.isEditMode = false
            this.formPertanyaan = this.defaultFormPertanyaan
            const modalEl = document.getElementById('addModal')
            const modal = new Modal(modalEl)
            modal.show()
        },
        getDirektoratFieldName(rowObj) {
            const filtered = this.categories.direktorat.filter(item => item.id === rowObj.direktorat_id)
            return filtered.length > 0 ? filtered[0].nama_direktorat : '-'
        },
        getAnnexFieldName(rowObj) {
            const filtered = this.categories.annex.filter(item => item.id === rowObj.annex_id)
            return filtered.length > 0 ? filtered[0].nama_annex : '-'
        },
        getKontrolFieldName(rowObj) {
            const filtered = this.categories.sub_control.filter(item => item.id === rowObj.sub_control_id)
            return filtered.length > 0 ? filtered[0].nama_sub_control : '-'
        },
        getKlausaFieldName(rowObj) {
            const filtered = this.categories.klausa.filter(item => item.id === rowObj.klausa_id)
            return filtered.length > 0 ? filtered[0].nama_klausa : '-'
        },
        getSubKlausaFieldName(rowObj) {
            const filtered = this.categories.sub_klausa.filter(item => item.id === rowObj.sub_klausa_id)
            return filtered.length > 0 ? filtered[0].nama_sub_klausa : '-'
        },
        async getLastId() {
            const colRef = collection(db, 'pertanyaan')
            const q = query(colRef, orderBy('id', 'desc'), limit(1))
            try {
                const querySnapshot = await getDocs(q)
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]
                    const data = doc.data()
                    if (data.id) this.defaultFormPertanyaan.id = data.id + 1
                } else {
                    console.error('No documents found')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async addQuestion() {
            if (this.isEditMode) {
                await updateDoc(doc(collection(db, 'pertanyaan'), this.formPertanyaan.docId), this.formPertanyaan).then(() => {
                    this.showToast('Pertanyaan berhasil diubah')
                    this.getQuestion()
                }).catch((err) => {
                    this.showToast(`Terjadi kesalahan : ${err}`, false)
                })
            } else {
                await addDoc(collection(db, 'pertanyaan'), this.formPertanyaan).then(() => {
                    this.requestSuccess = true
                    this.showToast('Pertanyaan berhasil ditambah')
                    this.getQuestion()
                }).catch((err) => {
                    this.requestSuccess = false
                    this.showToast(`Terjadi kesalahan : ${err}`, false)
                })
            }
        },
        openEditQuestion(data) {
            this.isEditMode = true
            this.formPertanyaan = data
            const modalEl = document.getElementById('addModal')
            const modal = new Modal(modalEl)
            modal.show()
        },
        deleteQuestion(data) {
            this.dataToDelete = data
            const modalEl = document.getElementById('confirmDeleteModal')
            const modal = new Modal(modalEl)
            modal.show()
        },
        async confirmDelete() {
            const docRef = doc(db, 'pertanyaan', this.dataToDelete.docId)
            await deleteDoc(docRef).then(() => {
                const confirmDeleteModalEl = document.getElementById('confirmDeleteModal')
                const confirmDeleteModal = Modal.getInstance(confirmDeleteModalEl) || new Modal(confirmDeleteModalEl)
                confirmDeleteModal.hide()
                this.requestSuccess = true
                this.showToast('Data berhasil dihapus')
                this.getQuestion()
            }).catch((err) => {
                this.requestSuccess = false
                this.showToast(`Terjadi kesalahan: ${err}`, false)
            })
        },
        showToast(message, isSuccess = true) {
            this.requestSuccess = isSuccess
            this.toastMessage = message
            const toastEl = this.$refs.toastEl
            this.toastInstance = new Toast(toastEl)
            this.toastInstance.show()
            const addModalEl = document.getElementById('addModal')
            const addModal = Modal.getInstance(addModalEl) || new Modal(addModalEl)
            addModal.hide()
        },
    },
}
</script>
<style scoped>
.table-wrapper {
    overflow-x: auto;
    width: 100%;
}
</style>

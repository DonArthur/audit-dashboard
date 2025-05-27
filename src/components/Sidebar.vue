<template>
    <nav>
        <!-- semua -->
        <router-link to="/">Beranda</router-link> |
        <!-- buat admin -->
        <router-link to="/pengaturan-kuesioner">Pengaturan Kuesioner</router-link> |
        <!-- buat auditor -->
        <router-link to="/isi-kuesioner">Isi Kuesioner</router-link>
    </nav>
</template>
<script>
export default {
    name: 'Sidebar'
}
</script>
<style></style>
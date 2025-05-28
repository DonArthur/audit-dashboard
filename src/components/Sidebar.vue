<template>
    <nav class="bg-dark text-white p-3 flex-shrink-0" style="width: 250px; height: 100vh;">
        <ul class="nav flex-column">
            <li class="nav-item">
                <!-- semua -->
                <router-link class="nav-link text-white d-flex gap-2" active-class="active bg-primary rounded" exact to="/">
                    <i class="bi bi-pie-chart-fill"></i>Beranda
                </router-link>
            </li>
            <li class="nav-item">
                <!-- buat admin -->
                <router-link class="nav-link text-white d-flex gap-2" active-class="active bg-primary rounded" exact to="/pengaturan-kuesioner">
                    <i class="bi bi-pie-chart-fill"></i>Pengaturan Kuesioner
                </router-link>
            </li>
            <li class="nav-item">
                <!-- buat auditor -->
                <router-link class="nav-link text-white d-flex gap-2" active-class="active bg-primary rounded" exact to="/isi-kuesioner">
                    <i class="bi bi-pie-chart-fill"></i>Isi Kuesioner
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: 'Sidebar'
}
</script>
<style></style>
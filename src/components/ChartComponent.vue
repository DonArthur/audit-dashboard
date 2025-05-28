<template>
    <h1>Chart Component</h1>
    <div style="width: 400px; height: 400px;">
        <canvas id="myChart"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';

const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const data = {
    labels: labels,
    datasets: [{
        label: 'My first datasets',
        backgroundColor: ['rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)', 'rgb(69, 99, 169)',
      'rgb(54, 162, 255)',
      'rgb(255, 205, 69)'],
        hoverOffset: 4,
        data: [0, 10, 5, 2, 20, 30, 45],
    }],
}

const config = {
    type: 'doughnut',
    data: data,
    options: {},
}
export default {
    name: 'ChartComponent',
    mounted() {
        const myChart = new Chart(document.getElementById('myChart'), config)
    },
}
</script>
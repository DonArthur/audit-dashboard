<template>
  <h2>Survey Results</h2>
  <div style="width: 400px; height: 400px">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default {
  name: "ChartComponent",
  data() {
    return {
      chart: null,
      direktorat: [],
    };
  },
  methods: {
    async getDirectorates() {
      const qSnapshot = await getDocs(collection(db, "direktorat"));
      this.direktorat = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      this.setCanvas();
    },
    setCanvas() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      let arr = [];
      this.direktorat.forEach((e) => {
        arr.push(e.nama_direktorat);
      });

      console.log(arr);

      this.chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: arr,
          datasets: [
            {
              label: "Random Data",
              data: Array.from(
                { length: arr.length },
                () => Math.floor(Math.random() * 50) + 1
              ),
              backgroundColor: Array.from(
                { length: arr.length },
                () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
              ),
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
  mounted() {
    this.getDirectorates();
  },
};
</script>

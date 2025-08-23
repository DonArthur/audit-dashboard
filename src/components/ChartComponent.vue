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
  // props: {
  //   data,
  // },
  data() {
    return {
      chart: null,
      direktorat: [],
      colors: [
        "#00809D",
        "#FCF8DD",
        "#FFD700",
        "#D3AF37",
        "#E4004B",
        "#ED775A",
        "#FAD691",
        "#C9CDCF",
        "#33A1E0",
        "#7A85C1",
      ],
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

      arr = [...new Set(arr)];

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
              backgroundColor: this.colors,
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

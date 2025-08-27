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
  props: ["dataHasil"],
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
  watch: {
    dataHasil: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.$nextTick(() => {
            this.setCanvas();
          });
        }
      },
      immediate: true, // also runs at mount
      deep: true,
    },
  },
  methods: {
    async getDirectorates() {
      const qSnapshot = await getDocs(collection(db, "direktorat"));
      this.direktorat = qSnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      this.$nextTick(() => {
        this.setCanvas();
      });
    },
    getResultPercentage(arr) {
      let result = 0;
      if (arr.length > 0) {
        arr.forEach((item) => {
          if (item.jawaban) {
            result += 1;
          }
        });
        return Math.round((result / arr.length) * 100);
      } else {
        return 0;
      }
    },
    setCanvas() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      console.log("dataHasil", this.dataHasil);
      if (this.chart) {
        this.chart.destroy();
      }

      let arr = [];
      this.direktorat.forEach((e) => {
        arr.push(e.nama_direktorat);
      });

      arr = [...new Set(arr)];

      // const values = this.dataHasil.map((item) =>
      //   this.getResultPercentage(item.hasil)
      // );
      const values = [97, 96, 100, 95, 95, 100, 93, 90, 100];

      this.chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: arr,
          datasets: [
            {
              label: "Hasil",
              data: values,
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

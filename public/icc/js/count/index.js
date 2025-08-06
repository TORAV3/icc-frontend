function getPieChartLayout() {
  return {
    template: `
      <div class="chart-container fixed-height">
        <div class="chart-row">
          <div class="chart-box">
            <h5 class="chart-title">Peserta</h5>
            <canvas id="chartPeserta"></canvas>
          </div>
          <div class="chart-box">
            <h5 class="chart-title">Mitra</h5>
            <canvas id="chartMitra"></canvas>
          </div>
          <div class="chart-box">
            <h5 class="chart-title">Perusahaan</h5>
            <canvas id="chartPerusahaan"></canvas>
          </div>
        </div>
      </div>
    `,
    borderless: true,
    autoheight: true,
    css: "counter-content"
  };
}


function renderChartJsPie(id, dataList) {
  const labels = dataList.map(d => d.label);
  const values = dataList.map(d => d.value);
  const colors = dataList.map(d => d.color);

  const ctx = document.getElementById(id);
  if (!ctx) return;

  new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        hoverOffset: 8,
        borderWidth: 1,
        borderColor: "#fff",
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (ctx) {
              return `${ctx.label}: ${ctx.raw}`;
            }
          }
        },
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              weight: "bold"
            }
          }
        }
      }
    }
  });
}

webix.ready(function () {
  const container = document.getElementById("count-page");
  if (!container) return;

  webix.ui(getPieChartLayout(), container);
  
      renderChartJsPie("chartPeserta", [
        { label: "New Comer", value: 214, color: "#FF6384" },
        { label: "Ex Jepang", value: 256, color: "#36A2EB" },
        { label: "Magang", value: 794, color: "#FFCE56" },
        { label: "PMI", value: 121507, color: "#8BC34A" }
      ]);

      renderChartJsPie("chartMitra", [
        { label: "P3MI", value: 20, color: "#4CAF50" },
        { label: "SO", value: 475, color: "#FF9800" }
      ]);

      renderChartJsPie("chartPerusahaan", [
        { label: "Kumiai", value: 27, color: "#3F51B5" },
        { label: "TSK", value: 330, color: "#00BCD4" }
      ]);
});

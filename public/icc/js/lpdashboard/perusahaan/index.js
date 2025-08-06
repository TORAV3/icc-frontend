function countDashboardData() {
  axios
    .get(`http://localhost:3000/api/icc/user/peserta/count`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      if (res.data?.data && $$("totalPeserta")) {
        $$("totalPeserta").parse({ total: res.data.data.total || 0 });
      }
    })
    .catch((error) => console.error("Peserta API Error:", error));

  axios
    .get(`http://localhost:3000/api/icc/user/perusahaan/count`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      const data = res.data?.data;
      if (data) {
        if ($$("totalP3mi")) $$("totalP3mi").parse({ p3mi: data.p3mi || 0 });
        if ($$("totalSo")) $$("totalSo").parse({ so: data.so || 0 });
      }
    })
    .catch((error) => console.error("Perusahaan API Error:", error));
}

const dashboardCards = {
  view: "layout",
  autoheight: 100,
  rows: [
    {
      cols: [
        {
          id: "totalPeserta",
          template: (obj) => `
            <div class='card'>
              <div class='card-content'>
                <div class='text'>
                  <div class='title'>Total Peserta</div>
                  <div class='value'>${obj.total ?? 0}</div>
                </div>
                <div class='icon_stats'>
                  <iconify-icon icon='solar:users-group-two-rounded-broken'></iconify-icon>
                </div>
              </div>
            </div>`,
          css: "stats",
          data: { total: 0 },
        },
        {
          id: "totalP3mi",
          template: (obj) => `
            <div class='card'>
              <div class='card-content'>
                <div class='text'>
                  <div class='title'>P3MI</div>
                  <div class='value'>${obj.p3mi ?? 10}</div>
                </div>
                <div class='icon_stats'>
                  <iconify-icon icon='solar:suitcase-linear'></iconify-icon>
                </div>
              </div>
            </div>`,
          css: "stats",
          data: { p3mi: 10 },
        },
        {
          id: "totalSo",
          template: (obj) => `
            <div class='card'>
              <div class='card-content'>
                <div class='text'>
                  <div class='title'>SO</div>
                  <div class='value'>${obj.so ?? 0}</div>
                </div>
                <div class='icon_stats'>
                  <iconify-icon icon='solar:suitcase-linear'></iconify-icon>
                </div>
              </div>
            </div>`,
          css: "stats",
          data: { so: 0 },
        },
      ]
    }
  ]
};



webix.ready(function () {
  webix.ui({
    container: "dashboard-perusahaan",
    margin: 10,
    rows: [dashboardCards]
  });

  countDashboardData();
});


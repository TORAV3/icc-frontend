function countPesertaData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("totalPeserta")) {
          $$("totalPeserta").parse({ total: res.data.data.total || 0 });
        }
        if ($$("totalNewcomer")) {
          $$("totalNewcomer").parse({
            newcomer: res.data.data.newcomer || 0,
          });
        }
        if ($$("totalMagang")) {
          $$("totalMagang").parse({ magang: res.data.data.magang || 0 });
        }
        if ($$("totalExjepang")) {
          $$("totalExjepang").parse({ exjepang: res.data.data.exjepang || 0 });
        }
        if ($$("totalPmi")) {
          $$("totalPmi").parse({ pmi: res.data.data.pmi || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function countPerusahaanData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/perusahaan/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("totalPerusahaan")) {
          $$("totalPerusahaan").parse({ total: res.data.data.total || 0 });
        }

        if ($$("totalP3mi")) {
          $$("totalP3mi").parse({
            p3mi: res.data.data.p3mi || 0,
          });
        }

        if ($$("totalSo")) {
          $$("totalSo").parse({ so: res.data.data.so || 0 });
        }

        if ($$("totalTsk")) {
          $$("totalTsk").parse({ tsk: res.data.data.tsk || 0 });
        }

        if ($$("totalKumiai")) {
          $$("totalKumiai").parse({ tsk: res.data.data.kumiai || 0 });
        }

        if ($$("totalLangsung")) {
          $$("totalLangsung").parse({ langsung: res.data.data.langsung || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function loadChartData(selectedYear) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  axios
    .get("http://deviso.vdc.id:3003/api/icc/user/peserta/count", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data && res.data.data.monthBreakdown) {
        let chartData = res.data.data.monthBreakdown
          .filter((item) => item.year == selectedYear)
          .map((item) => ({

            month: `${monthNames[item.month - 1]}`,
            total: item.total,
          }));

        if ($$("pesertaChart")) {
          $$("pesertaChart").clearAll();
          $$("pesertaChart").parse(chartData);
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

var statsPeserta = {
  view: "layout",
  margin: 5,
  rows: [
    {
      template: "<div>Peserta Detail</div>",
      autoheight: true,
      css: "header"
    },
    {
      cols: [
        {
          id: "totalPeserta",
          template: function (obj) {
            return (
              "<div class='card first'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Total Peserta</div>" +
              "<div class='value'>" +
              (obj.total !== undefined ? obj.total : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_first'>" +
              "<iconify-icon icon='solar:users-group-two-rounded-broken'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { total: 0 },
        },
        {
          id: "totalNewcomer",
          template: function (obj) {
            return (
              "<div class='card second'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Peserta Mitra</div>" +
              "<div class='value'>" +
              (obj.newcomer !== undefined ? obj.newcomer : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_second'>" +
              "<iconify-icon icon='solar:user-broken'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { newcomer: 2 },
        },
        // {
        //   id: "totalMagang",
        //   template: function (obj) {
        //     return (
        //       "<div class='card third'>" +
        //       "<div class='card-content'>" +
        //       "<div class='text'>" +
        //       "<div class='title'>Magang</div>" +
        //       "<div class='value'>" +
        //       (obj.magang !== undefined ? obj.magang : 0) +
        //       "</div>" +
        //       "</div>" +
        //       "<div class='icon_stats_third'>" +
        //       "<iconify-icon icon='solar:user-broken'></iconify-icon>" +
        //       "</div>" +
        //       "</div>" +
        //       "</div>"
        //     );
        //   },
        //   autoheight: true,
        //   css: "stats",
        //   data: { magang: 0 },
        // },
        // {
        //   id: "totalExjepang",
        //   template: function (obj) {
        //     return (
        //       "<div class='card fourth'>" +
        //       "<div class='card-content'>" +
        //       "<div class='text'>" +
        //       "<div class='title'>Ex-Jepang</div>" +
        //       "<div class='value'>" +
        //       (obj.exjepang !== undefined ? obj.exjepang : 0) +
        //       "</div>" +
        //       "</div>" +
        //       "<div class='icon_stats_fourth'>" +
        //       "<iconify-icon icon='solar:user-broken'></iconify-icon>" +
        //       "</div>" +
        //       "</div>" +
        //       "</div>"
        //     );
        //   },
        //   autoheight: true,
        //   css: "stats",
        //   data: { exjepang: 0 },
        // },
        // {
        //   id: "totalPmi",
        //   template: function (obj) {
        //     return (
        //       "<div class='card fifth'>" +
        //       "<div class='card-content'>" +
        //       "<div class='text'>" +
        //       "<div class='title'>PMI</div>" +
        //       "<div class='value'>" +
        //       (obj.pmi !== undefined ? obj.pmi : 0) +
        //       "</div>" +
        //       "</div>" +
        //       "<div class='icon_stats_fifth'>" +
        //       "<iconify-icon icon='solar:user-broken'></iconify-icon>" +
        //       "</div>" +
        //       "</div>" +
        //       "</div>"
        //     );
        //   },
        //   autoheight: true,
        //   css: "stats",
        //   data: { pmi: 0 },
        // },
      ]
    }
  ]
};

var statsPerusahaan = {
  view: "layout",
  margin: 5,
  rows: [
    {
      template: "<div>Perusahaan Detail</div>",
      autoheight: true,
      css: "header"
    },
    {
      cols: [
        // {
        //   id: "totalPerusahaan",
        //   template: function (obj) {
        //     return (
        //       "<div class='card first'>" +
        //       "<div class='card-content'>" +
        //       "<div class='text'>" +
        //       "<div class='title'>Total</div>" +
        //       "<div class='value'>" +
        //       (obj.total !== undefined ? obj.total : 0) +
        //       "</div>" +
        //       "</div>" +
        //       "<div class='icon_stats_first'>" +
        //       "<iconify-icon icon='solar:suitcase-linear'></iconify-icon>" +
        //       "</div>" +
        //       "</div>" +
        //       "</div>"
        //     );
        //   },
        //   autoheight: true,
        //   css: "stats",
        //   data: { total: 0 },
        // },
        // {
        //   id: "totalP3mi",
        //   template: function (obj) {
        //     return (
        //       "<div class='card second'>" +
        //       "<div class='card-content'>" +
        //       "<div class='text'>" +
        //       "<div class='title'>P3MI</div>" +
        //       "<div class='value'>" +
        //       (obj.p3mi !== undefined ? obj.p3mi : 0) +
        //       "</div>" +
        //       "</div>" +
        //       "<div class='icon_stats_second'>" +
        //       "<iconify-icon icon='solar:suitcase-linear'></iconify-icon>" +
        //       "</div>" +
        //       "</div>" +
        //       "</div>"
        //     );
        //   },
        //   autoheight: true,
        //   css: "stats",
        //   data: { p3mi: 0 },
        // },
        // {
        //   id: "totalSo",
        //   template: function (obj) {
        //     return (
        //       "<div class='card third'>" +
        //       "<div class='card-content'>" +
        //       "<div class='text'>" +
        //       "<div class='title'>SO</div>" +
        //       "<div class='value'>" +
        //       (obj.so !== undefined ? obj.so : 0) +
        //       "</div>" +
        //       "</div>" +
        //       "<div class='icon_stats_third'>" +
        //       "<iconify-icon icon='solar:suitcase-linear'></iconify-icon>" +
        //       "</div>" +
        //       "</div>" +
        //       "</div>"
        //     );
        //   },
        //   autoheight: true,
        //   css: "stats",
        //   data: { so: 0 },
        // },
        {
          id: "totalTsk",
          template: function (obj) {
            return (
              "<div class='card fourth'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>TSK</div>" +
              "<div class='value'>" +
              (obj.tsk !== undefined ? obj.tsk : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_fourth'>" +
              "<iconify-icon icon='solar:suitcase-linear'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { tsk: 0 },
        },
        {
          id: "totalKumiai",
          template: function (obj) {
            return (
              "<div class='card fifth'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Kumiai</div>" +
              "<div class='value'>" +
              (obj.kumiai !== undefined ? obj.kumiai : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_fifth'>" +
              "<iconify-icon icon='solar:suitcase-linear'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { kumiai: 0 },
        }
      ]
    }
  ]
};

let currentYear = new Date().getFullYear();

var graphPeserta = {
  height: 400,
  rows: [
    {
      cols: [
        { template: "Statistik Peserta Mitra", type: "header", css: "header"},
        {
          view: "combo",
          id: "yearFilter",
          labelWidth: 50,
          options: [...Array(5)].map((_, i) => ({
            id: currentYear - i,
            value: currentYear - i,
          })),
          value: currentYear,
          width: 100,
          on: {
            onChange: function (newYear) {
              loadChartData(newYear);
            },
          },
        },
      ],
    },
    {height: 15},
    {
      view: "chart",
      id: "pesertaChart",
      type: "line",
      css: "webix_shadow",
      value: "#total#",
      line: {
        color: "#D52D2D",
        width: 2,
      },
      item: {
        radius: 3,
        borderColor: "#D52D2D",
        color: "#D52D2D",
      },
      area: {
        color: "#D52D2D",
        opacity: 0.2,
      },
      xAxis: {
        template: "#month#",
      },
      yAxis: {
        start: 0,
        step: 1,
      },
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 15,
    rows: [statsPeserta, graphPeserta, statsPerusahaan],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  countPesertaData();
  loadChartData(currentYear);
  countPerusahaanData();
});

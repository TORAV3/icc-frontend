var statsPeserta = {
  view: "layout",
  margin: 5,
  rows: [
    // {
    //   template: "<div>Detail</div>",
    //   autoheight: true,
    //   css: "header"
    // },
    {
      cols: [
        {
          id: "totalPeserta",
          template: function (obj) {
            return (
              "<div class='card first'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Artikel</div>" +
              "<div class='value'>" +
              (obj.total !== undefined ? obj.total : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_first'>" +
              "<iconify-icon icon='solar:file-text-linear'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { total: 20 },
        },
        {
          id: "totalNewcomer",
          template: function (obj) {
            return (
              "<div class='card second'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Komunitas</div>" +
              "<div class='value'>" +
              (obj.newcomer !== undefined ? obj.newcomer : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_second'>" +
              "<iconify-icon icon='solar:users-group-two-rounded-outline'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { newcomer: 4 },
        },
        {
          id: "totalMagang",
          template: function (obj) {
            return (
              "<div class='card third'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Charity</div>" +
              "<div class='value'>" +
              (obj.magang !== undefined ? obj.magang : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_third'>" +
              "<iconify-icon icon='solar:people-nearby-outline'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { magang: 10 },
        },
        {
          id: "totalExjepang",
          template: function (obj) {
            return (
              "<div class='card fourth'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>LOKER</div>" +
              "<div class='value'>" +
              (obj.exjepang !== undefined ? obj.exjepang : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_fourth'>" +
              "<iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { exjepang: 11 },
        },
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
    rows: [statsPeserta],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  countPesertaData();
  loadChartData(currentYear);
  countPerusahaanData();
});

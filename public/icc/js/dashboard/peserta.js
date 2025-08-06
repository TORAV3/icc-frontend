function countContentData() {
  axios
    .get(`http://localhost:3000/api/icc/content/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("totalArtikel")) {
          $$("totalArtikel").parse({ tartikel: res.data.data.tartikel || 0 });
        }

        if ($$("totalKomunitas")) {
          $$("totalKomunitas").parse({
            tkomunitas: res.data.data.tkomunitas || 0,
          });
        }

        if ($$("totalCharity")) {
          $$("totalCharity").parse({ tcharity: res.data.data.tcharity || 0 });
        }

        if ($$("totalLoker")) {
          $$("totalLoker").parse({ tloker: res.data.data.tloker || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

var statsContent = {
  view: "layout",
  margin: 5,
  rows: [
    {
      cols: [
        {
          id: "totalArtikel",
          template: function (obj) {
            return (
              "<div class='card first'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Artikel</div>" +
              "<div class='value'>" +
              (obj.tartikel !== undefined ? obj.tartikel : 0) +
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
          data: { tartikel: 0 },
        },
        {
          id: "totalKomunitas",
          template: function (obj) {
            return (
              "<div class='card second'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Komunitas</div>" +
              "<div class='value'>" +
              (obj.tkomunitas !== undefined ? obj.tkomunitas : 0) +
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
          data: { tkomunitas: 0 },
        },
        {
          id: "totalCharity",
          template: function (obj) {
            return (
              "<div class='card third'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Charity</div>" +
              "<div class='value'>" +
              (obj.tcharity !== undefined ? obj.tcharity : 0) +
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
          data: { tcharity: 0 },
        },
        {
          id: "totalLoker",
          template: function (obj) {
            return (
              "<div class='card fourth'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>LOKER</div>" +
              "<div class='value'>" +
              (obj.tloker !== undefined ? obj.tloker : 0) +
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
          data: { tloker: 0 },
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

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 15,
    rows: [statsContent],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  countContentData();

});

function loadAduanData() {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://deviso.vdc.id:3003/api/icc/aduan`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {

        const statusFilter = $$("statusFilter").getValue();
        const jenisFilter = $$("jenisFilter").getValue();
        const startDate = $$("startDateFilter").getValue();
        const endDate = $$("endDateFilter").getValue();

        const transformedData = res.data.data
        .filter((item) => {
            if (statusFilter !== "all" && item.status !== statusFilter) {
              return false;
            }

            if (jenisFilter !== "all" && item.jenis !== jenisFilter) {
              return false;
            }
            
            const date = new Date(item.tanggal);

            if (startDate && !endDate) {
              if (date < new Date(startDate)) return false;
            } else if (!startDate && endDate) {
              if (date > new Date(endDate)) return false;
            } else if (startDate && endDate) {
              if (date < new Date(startDate) || date > new Date(endDate)) {
                return false;
              }
            }

            return true;
          })
        
        .map(function (item) {
          return {
            id: item.id,
            title: item.title,
            code: item.code,
            description: item.description,
            jenis: item.jenis.toUpperCase(),
            tanggal: item.tanggal,
            lokasi: item.lokasi,
            lampiran: item.lampiran,
            pengirim: item.pengirim,
            status: item.status,
          };
        });

        $$("table").clearAll();
        $$("table").hideOverlay();
        $$("table").parse(transformedData);
      } else {
        $$("table").clearAll();
        $$("table").showOverlay("Maaf, data tidak ditemukan");
      }
    })
    .catch((err) => {
      $$("table").clearAll();
      $$("table").showOverlay("Failed to load data.");
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    })
    .finally(function () {
      $$("table").hideProgress();
    });
}

function countAduanData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/aduan/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("totalAduan")) {
          $$("totalAduan").parse({ total: res.data.data.total || 0 });
        }

        if ($$("totalProses")) {
          $$("totalProses").parse({ proses: res.data.data.proses || 0 });
        }

        if ($$("totalTindaklanjut")) {
          $$("totalTindaklanjut").parse({ tindaklanjut: res.data.data.tindaklanjut || 0 });
        }

        if ($$("totalDone")) {
          $$("totalDone").parse({ done: res.data.data.done || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function deleteAduan(id) {
  axios
    .delete(`http://deviso.vdc.id:3003/api/icc/aduan/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: "Berhasil Menghapus Data Aduan" });
      loadAduanData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function updateAduanStatus(aduanId, status, description, nomor) {
  const url = `http://deviso.vdc.id:3003/api/icc/aduan/status/${aduanId}`;

  const requestData = {
    status: status,
    description: description,
    nomor: nomor,
  };

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      webix.message({ type: "success", text: "Berhasil Merubah Status Aduan" });
      loadAduanData();
      countAduanData();
    })
    .catch(function (err) {
      console.error("Error loading data:", err);
    });
}

var startDateFilter = {
  view: "datepicker",
  id: "startDateFilter",
  label : "Dari",
  labelPosition : "top",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadAduanData();
    },
  },
};

var endDateFilter = {
  view: "datepicker",
  id: "endDateFilter",
  label : "Sampai",
  labelPosition : "top",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadAduanData();
    },
  },
};

var statusFilter = {
  view: "combo",
  id: "statusFilter",
  label : "Status",
  labelPosition : "top",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "new", value: "New" },
    { id: "proses", value: "Proses" },
    { id: "tindak lanjut", value: "Tindak Lanjut" },
    { id: "done", value: "Done" },
  ],
  on: {
    onChange: function () {
      loadAduanData();
    },
  },
};

var jenisFilter = {
  view: "combo",
  id: "jenisFilter",
  label : "Jenis",
  labelPosition : "top",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "pengaduan", value: "Pengaduan" },
    { id: "saran", value: "Saran" },
    { id: "aspirasi", value: "Aspirasi" },
    { id: "informasi", value: "Permintaan Informasi" },
  ],
  on: {
    onChange: function () {
      loadAduanData();
    },
  },
};

var searchForm = {
  maxWidth: 230,
  minWidth: 160,
  view: "text",
  id: "textSearch",
  placeholder: "Ketik disini untuk mencari data",
  align: "right",
  on: {
    onTimedKeyPress: function () {
      const value = this.getValue().toLowerCase();
      $$("table").filter(function (obj) {
        for (let key in obj) {
          if (obj[key] && obj[key].toString().toLowerCase().includes(value)) {
            return true;
          }
        }
        return false;
      });
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [statusFilter, jenisFilter, startDateFilter, endDateFilter, {}, searchForm],
};

var edit =
  "<span class='webix_icon me-1 editBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";

var tabcols = [
  { id: "id", hidden: true },
  {
    id: "action",
    header: { text: "", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 80,
    template: function () {
      return `
          <span class="webix_icon actionMenu" style="cursor:pointer;">
            <iconify-icon icon="carbon:overflow-menu-vertical" style="font-size: 18px;"></iconify-icon>
          </span>
        `;
    },
  },
  {
    id: "status",
    header: { text: "Status", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
  { id: "code", header: "Nomor", width: 200, sort: "string" },
  { id: "pengirim", header: "Pengirim", width: 200, sort: "string" },
  { id: "title", header: "Judul", width: 200, sort: "string" },
  { id: "jenis", header: "Jenis", width: 200, sort: "string" },
  {
    id: "description",
    header: { text: "Deskripsi" },
    width: 600,
    sort: "string",
  },
  { id: "tanggal", header: "Tanggal", width: 300, sort: "string" },
  { id: "lokasi", header: "Lokasi", width: 300, sort: "string" },
];

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Riwayat", "Detail", "Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;
      var rowData = $$("table").getItem(rowId);
      var aduanCode = rowData.code;

      switch (action) {
        case "Riwayat":
          webix.ajax()
            .headers({ Authorization: "Bearer " + token })
            .get(`http://deviso.vdc.id:3003/api/icc/aduan/log/${aduanCode}`)
            .then(function (response) {
              const logs = response.json().data;
        
              const formattedLogs = logs.map(log => ({
                id: log.id,
                value: log.status.toUpperCase(),
                details: log.description,
                date: webix.Date.dateToStr("%Y-%m-%d")(new Date(log.created_at))
              }));
        
              $$("logTimeline").clearAll();
              $$("logTimeline").parse(formattedLogs);
              $$("logPopup").show();
            })
            .catch(function (err) {
              console.error("Gagal memuat riwayat:", err);
              webix.message({ type: "error", text: "Gagal memuat riwayat log" });
            });
        break;



        case "Detail":
          webix.ajax()
            .headers({ Authorization: "Bearer " + token })
            .get(`http://deviso.vdc.id:3003/api/icc/aduan/code/${aduanCode}`)
            .then(function (response) {
              const detail = response.json().data;

              $$("detailForm").setValues(detail);
              $$("lampiranPreview").setValues({ lampiranBase64: detail.lampiranBase64 });
              $$("detailPopup").show();
            })
            .catch(function (err) {
              console.error("Gagal memuat detail aduan:", err);
              webix.message({ type: "error", text: "Gagal memuat detail aduan" });
            });
        break;


        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya",
            cancel: "Tidak",
            text: "Apakah anda yakin ingin menghapus aduan ini?",
            callback: function (result) {
              if (result) {
                deleteAduan(rowId);
              }
            },
          });
          break;
      }
    },
  },
});

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  autoheight: true,
  onClick: {
    actionMenu: function (event, id, node) {
      // Show the context menu near the clicked button
      $$("actionMenu").show(node);
      $$("actionMenu").setContext({ id: id.row }); // Pass the row ID to the menu
    },
  },
  scheme: {
    $change: function (obj) {
      // Add rounded pill classes for statuses
      let statusClass = "";
      switch (obj.status.toLowerCase()) {
        case "new":
          statusClass = "status-new";
          break;
        case "proses":
          statusClass = "status-proses";
          break;
        case "tindak lanjut":
          statusClass = "status-tindaklanjut";
          break;
        case "done":
          statusClass = "status-done";
          break;
        default:
          statusClass = "status-default";
      }
      obj.status = `<div class="status-pill ${statusClass}">${obj.status.toUpperCase()}</div>`;
    },
  },
  navigation: true,
  pager: "pager",
};

var pagination = {
  view: "pager",
  id: "pager",
  css: "pagerstyle",
  template: "{common.prev()}{common.next()}",
  size: 10,
};

var datatable = {
  margin: 5,
  rows: [table, pagination],
};

var stats = {
  view: "layout",
  margin: 5,
  rows: [
    {
      cols: [
        {
          id: "totalAduan",
          template: function (obj) {
            return (
              "<div class='card first'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Total</div>" +
              "<div class='value'>" +
              (obj.total !== undefined ? obj.total : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_first'>" +
              "<iconify-icon icon='solar:danger-circle-outline'></iconify-icon>" +
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
          id: "totalProses",
          template: function (obj) {
            return (
              "<div class='card second'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Proses</div>" +
              "<div class='value'>" +
              (obj.proses !== undefined ? obj.proses : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_second'>" +
              "<iconify-icon icon='solar:danger-circle-outline'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { proses: 0 },
        },
        
        {
          id: "totalTindaklanjut",
          template: function (obj) {
            return (
              "<div class='card fourth'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Tindak Lanjut</div>" +
              "<div class='value'>" +
              (obj.tindaklanjut !== undefined ? obj.tindaklanjut : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_fourth'>" +
              "<iconify-icon icon='solar:danger-circle-outline'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { tindaklanjut: 0 },
        },
        {
          id: "totalDone",
          template: function (obj) {
            return (
              "<div class='card third'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Done</div>" +
              "<div class='value'>" +
              (obj.done !== undefined ? obj.done : 0) +
              "</div>" +
              "</div>" +
              "<div class='icon_stats_third'>" +
              "<iconify-icon icon='solar:danger-circle-outline'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
          data: { done: 0 },
        },
      ]
    }
  ]
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [stats, toolbar, datatable],
  });

  $$("table").attachEvent("onBeforeContextMenu", function (id, e) {
    const item = this.getItem(id);
    return item.jenis && item.jenis.toLowerCase() !== "saran";
  });

  webix.ui({
    view: "contextmenu",
    id: "cmenu",
    master: $$("table"),
    data: ["Proses", "Tindak Lanjut", "Done"],
    on: {
      onItemClick: function (id) {
        const context = this.getContext();
        const rowId = context.id;
        const rowData = $$("table").getItem(rowId);
        const menuItem = this.getItem(id);

        const statusValue = menuItem.value.toLowerCase();

        console.log(rowData.code);

        $$("statusPopup").config.aduanId = rowData.id;
        $$("statusPopup").config.status = statusValue;
        $$("statusPopup").config.nomor = rowData.code;
        $$("statusForm").setValues({ description: "" });
        $$("statusPopup").show();
      },
    },
  });

  $$("table").registerFilter(
    $$("textSearch"),
    {},
    {
      getValue: function (view) {
        return view.getValue();
      },
      setValue: function (view, value) {
        view.setValue(value);
      },
      compare: function (value, filter, obj) {
        if (!filter) return true;
        filter = filter.toLowerCase();

        for (var key in obj) {
          if (obj[key] && obj[key].toString().toLowerCase().includes(filter)) {
            return true;
          }
        }
        return false;
      },
    }
  );

  webix.ui({
    view: "window",
    id: "statusPopup",
    width: 400,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        { width: 10 },
        { view: "label", label: "Update Status" },
        { view: "icon", icon: "wxi-close", click: () => $$("statusPopup").hide() }
      ]
    },
    body: {
      view: "form",
      id: "statusForm",
      elements: [
        { view: "textarea", name: "description", label: "Deskripsi", height: 100 },
        {
          cols: [
            { view: "button", value: "Submit", css: "webix_secondary", align: "center", click: function () {
                const values = $$("statusForm").getValues();
                const aduanId = $$("statusPopup").config.aduanId;
                const nomor = $$("statusPopup").config.nomor;
                const status = $$("statusPopup").config.status;
  
                updateAduanStatus(aduanId, status, values.description, nomor);
                $$("statusPopup").hide();
              }
            }
          ]
        }
      ]
    }
  });

  webix.ui({
    view: "window",
    id: "logPopup",
    width: 350,
    height: 400,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        { width: 10 },
        { view: "label", label: "Riwayat Aduan" },
        { view: "icon", icon: "wxi-close", click: () => $$("logPopup").hide() }
      ]
    },
    body: {
      view: "timeline",
      id: "logTimeline",
      type: {
        height: 120,
        lineColor: function (obj) {
          if (obj.value === "NEW") return "#6c757d";
          if (obj.value === "PROSES") return "rgba(255, 206, 0, 1)";
          if (obj.value === "TINDAK LANJUT") return "#dc3545";
          if (obj.value === "DONE") return "rgba(0, 182, 155, 1)";
          return "#94A1B3";
        }
      },
      scheme: {
        $init: function (obj) {
          obj.$css = obj.value;
          if (!obj.details) {
            obj.details = "-";
          }
        }
      },
      data: []
    }
  });

  webix.ui({
    view: "window",
    id: "detailPopup",
    width: 700,
    height: 520,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        { width: 10 },
        { view: "label", label: "Detail Aduan" },
        { view: "icon", icon: "wxi-close", click: () => $$("detailPopup").hide() }
      ]
    },
    body: {
      view: "form",
      id: "detailForm",
      padding: 20,
      elements: [
        {
          cols: [
            {
              rows: [
                { view: "text", label: "Kode", name: "code", readonly: true },
                { view: "text", label: "Jenis", name: "jenis", readonly: true },
                { view: "text", label: "Lokasi", name: "lokasi", readonly: true }
              ]
            },
            { width: 20 },
            {
              rows: [
                { view: "text", label: "Judul", name: "title", readonly: true },
                { view: "text", label: "Tanggal", name: "tanggal", readonly: true },
                { view: "text", label: "Pengirim", name: "pengirim", readonly: true }
              ]
            }
          ]
        },
        { view: "textarea", label: "Deskripsi", name: "description", readonly: true, height: 100 },
        {
          view: "template",
          id: "lampiranPreview",
          borderless: true,
          template: (obj) =>
            obj.lampiranBase64
              ? `<div class="clickable-img" style="text-align:center">
                  <img src="${obj.lampiranBase64}"
                       style="max-width:100%;max-height:200px;border-radius:6px;cursor:pointer;" />
                 </div>`
              : "<i style='color:#888;'>Tidak ada lampiran</i>",
          onClick: {
            "clickable-img": function () {
              const base64 = this.getValues().lampiranBase64;
              previewLampiran(base64);
            }
          },
          height: 220
        }
        
      ]
    }
  });

  webix.ui({
    view: "window",
    id: "lampiranZoom",
    width: 800,
    height: 600,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        {},
        { view: "icon", icon: "wxi-close", click: () => $$("lampiranZoom").hide() }
      ]
    },
    body: {
      view: "template",
      id: "zoomTemplate",
      template: "",
      scroll: true
    }
  });
  
  function previewLampiran(base64) {
    $$("zoomTemplate").setHTML(`
      <div style="text-align:center; padding:10px;">
        <img src="${base64}" style="max-width:100%; max-height:100%;" />
      </div>
    `);
    $$("lampiranZoom").show();
  }
  
  
  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadAduanData();
  countAduanData();
});

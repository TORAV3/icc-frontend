function loadPanicData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://deviso.vdc.id:3003/api/icc/panic?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {

        const kategoriFilter = $$("kategoriFilter").getValue();
        const startDate = $$("startDateFilter").getValue();
        const endDate = $$("endDateFilter").getValue();

        const transformedData = res.data.data
        .filter((item) => {
            if (kategoriFilter !== "all" && item.category !== kategoriFilter) {
              return false;
            }

            const date = new Date(item.date);

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
            id: item.panic_id,
            category: item.category,
            description: item.description,
            date: item.date
              ? new Date(item.date).toISOString().split("T")[0]
              : "",
            status: item.status,
            name: item.user?.userDetail?.fullname || "-", 
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

function countPanicData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/panic/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("statsTotal")) {
          $$("statsTotal").parse({ total: res.data.data.total || 0 });
        }
        if ($$("statsPending")) {
          $$("statsPending").parse({
            pending: res.data.data.pending || 0,
          });
        }
        if ($$("statsConfirm")) {
          $$("statsConfirm").parse({ confirm: res.data.data.confirm || 0 });
        }
        if ($$("statsDone")) {
          $$("statsDone").parse({ done: res.data.data.done || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function updatePanicStatus(userId, status, description = null) {
  const url = `http://deviso.vdc.id:3003/api/icc/panic/status/${userId}`;

  const requestData = {
    status: status,
  };

  if (description !== null) {
    requestData.description = description;
  }

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      webix.message({ type: "success", text: "Berhasil Merubah Status Panic Button" });
      loadPanicData();
      countPanicData();
    })
    .catch(function (err) {
      console.error("Error updating panic status:", err);
    });
}

function deletePanic(id) {
  axios
    .delete(`http://deviso.vdc.id:3003/api/icc/panic/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: "Berhasil Menghapus Data Panic Button" });
      loadPanicData();
      countPanicData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function showDescriptionPopup(panicId) {
  webix
    .ui({
      view: "window",
      id: "descriptionPopup",
      width: 400,
      autoheight: true,
      close: true,
      position: "center",
      css: "panic-popup",
      body: {
        rows: [
          { height: 10 },
          {
            cols: [
              { width: 20 },
              {
                view: "textarea",
                id: "descriptionTextarea",
                label: "Respon",
                labelPosition: "top",
              },
              { width: 20 },
            ],
          },

          { height: 20 },
          {
            cols: [
              {},
              {
                view: "button",
                value: "Kirim",
                align: "center",
                css: "kirim",
                width: 100,
                click: function () {
                  var description = $$("descriptionTextarea").getValue();
                  if (description) {
                    updatePanicStatus(panicId, "done", description);
                    $$("descriptionPopup").close();
                  } else {
                    webix.message({
                      type: "error",
                      text: "Please fill in the description.",
                    });
                  }
                },
              },
              { width: 20 },
            ],
          },
          { height: 20 },
        ],
      },
    })
    .show();
}

var statusCombo = {
  view: "combo",
  value: "all",
  label : "Status",
  labelPosition : "top",
  options: [
    { id: "all", value: "All" },
    { id: "pending", value: "Pending" },
    { id: "confirm", value: "Confirm" },
    { id: "done", value: "Done" },
  ],
  width: 110,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadPanicData(newValue);
    },
  },
};

var startDateFilter = {
  view: "datepicker",
  id: "startDateFilter",
  label : "Dari",
  labelPosition : "top",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadPanicData();
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
      loadPanicData();
    },
  },
};

var kategoriFilter = {
  view: "combo",
  id: "kategoriFilter",
  label : "Kategori",
  labelPosition : "top",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "Bencana Alam", value: "Bencana Alam" },
    { id: "Pelecehan Seksual", value: "Pelecehan Seksual" },
    { id: "Bullying", value: "Bullying" },
    { id: "Kecelakaan Kerja", value: "Kecelakaan Kerja" },
  ],
  on: {
    onChange: function () {
      loadPanicData();
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
  cols: [statusCombo, kategoriFilter, startDateFilter, endDateFilter, {}, searchForm],
};

var detail =
  "<span class='webix_icon me-1 detailBtn' style='cursor:pointer;'><iconify-icon icon='solar:eye-outline' style='color:#398bf1;'></iconify-icon></span>";
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
  { id: "category", header: "Kategori", width: 200, sort: "string" },
  { id: "name", header: "Nama Pelapor", width: 200, sort: "string" },
  {
    id: "date",
    header: "Tanggal",
    width: 240,
    sort: "string",
    fillspace: true,
  },
  { id: "description", header: "Respon", width: 400, sort: "string" },
  {
    id: "status",
    header: { text: "Status", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
];

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;

      switch (action) {
        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus data ini?",
            callback: function (result) {
              if (result) {
                deletePanic(rowId);
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
      $$("actionMenu").show(node);
      $$("actionMenu").setContext({ id: id.row });
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = detail + trash;
      var css;
      switch (obj.status) {
        case "confirm":
          css = "row-grey";
          break;
        case "done":
          css = "row-green";
          break;
        case "pending":
          css = "row-orange";
          break;
        default:
          break;
      }
      obj.status = `<div class=${css}>${obj.status.toUpperCase()}</div>`;
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
  margin: 10,
  cols: [
    {
      id: "statsTotal",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Total</div>" +
          "<div class='value'>" +
          (obj.total !== undefined ? obj.total : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-total'>" +
          "<iconify-icon icon='solar:danger-triangle-outline'></iconify-icon>" +
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
      id: "statsPending",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Pending</div>" +
          "<div class='value'>" +
          (obj.pending !== undefined ? obj.pending : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-pending'>" +
          "<iconify-icon icon='solar:danger-triangle-outline'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { pending: 0 },
    },
    {
      id: "statsConfirm",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Confirm</div>" +
          "<div class='value'>" +
          (obj.confirm !== undefined ? obj.confirm : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-confirm'>" +
          "<iconify-icon icon='solar:danger-triangle-outline'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { confirm: 0 },
    },
    {
      id: "statsDone",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Done</div>" +
          "<div class='value'>" +
          (obj.done !== undefined ? obj.done : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-done'>" +
          "<iconify-icon icon='solar:danger-triangle-outline'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { done: 0 },
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [stats, toolbar, datatable],
  });

  webix.ui({
    view: "contextmenu",
    id: "cmenu",
    master: $$("table"),
    data: ["Pending", "Confirm", "Done"],
    on: {
      onItemClick: function (id) {
        var context = this.getContext();
        var rowId = context.id;
        var rowData = $$("table").getItem(rowId);

        var menuItem = this.getItem(id);
        switch (menuItem.value) {
          case "Confirm":
            updatePanicStatus(rowData.id, "confirm");
            break;
          case "Pending":
            updatePanicStatus(rowData.id, "pending");
            break;
          case "Done":
            showDescriptionPopup(rowData.id);
            break;
          default:
            break;
        }
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

  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadPanicData();
  countPanicData();
});

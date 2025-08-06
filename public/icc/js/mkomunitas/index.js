function loadKomunitasData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/api/icc/community?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            name: item.name,
            status: item.status,
            description: item.description,
            category: item.category,
            approval_date: item.approval_date
              ? new Date(item.approval_date).toISOString().split("T")[0]
              : "",
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

function countPesertaData() {
  axios
    .get(`http://localhost:3000/api/icc/community/count`, {
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
        if ($$("statsApproved")) {
          $$("statsApproved").parse({ approved: res.data.data.approved || 0 });
        }
        if ($$("statsReject")) {
          $$("statsReject").parse({ reject: res.data.data.reject || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function updateKomunitasStatus(userId, status) {
  const url = `http://localhost:3000/api/icc/community/status/${userId}`;

  const requestData = {
    status: status,
  };

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      webix.message({ type: "success", text: "Berhasil Merubah Status Komunitas" });
      loadKomunitasData();
      countPesertaData();
    })
    .catch(function (err) {
      console.error("Error loading data:", err);
    });
}

function deleteKomunitas(id) {
  axios
    .delete(`http://localhost:3000/api/icc/community/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: "Berhasil Menghapus Data Komunitas" });
      loadKomunitasData();
      countPesertaData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var statusCombo = {
  view: "combo",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "pending", value: "Pending" },
    { id: "approved", value: "Approved" },
    { id: "reject", value: "Reject" },
  ],
  width: 110,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadKomunitasData(newValue);
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
  cols: [statusCombo, {}, searchForm],
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
  { id: "name", header: "Nama Komunitas", width: 200, sort: "string" },
  { id: "description", header: "Deskripsi", width: 400, sort: "string" },
  { id: "category", header: "Kategori", width: 200, sort: "string" },
  {
    id: "approval_date",
    header: "Approval Date",
    width: 240,
    sort: "string",
    fillspace: true,
  },
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
  data: ["Detail", "Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      const rowData = $$("table").getItem(rowId);
      var action = this.getItem(id).value;

      switch (action) {
        case "Detail":
          window.location.href = `/komunitas/detail/${rowData.id}`;
          break;

        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus komunitas ini?",
            callback: function (result) {
              if (result) {
                deleteKomunitas(rowId);
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
        case "approved":
          css = "row-green";
          break;
        case "reject":
          css = "row-red";
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
          "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
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
          "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { published: 0 },
    },
    {
      id: "statsApproved",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Approved</div>" +
          "<div class='value'>" +
          (obj.approved !== undefined ? obj.approved : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-approved'>" +
          "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { draft: 0 },
    },
    {
      id: "statsReject",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Reject</div>" +
          "<div class='value'>" +
          (obj.reject !== undefined ? obj.reject : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-reject'>" +
          "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { draft: 0 },
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
    data: ["Pending", "Approved", "Reject"],
    on: {
      onItemClick: function (id) {
        var context = this.getContext();
        var rowId = context.id;
        var rowData = $$("table").getItem(rowId);

        var menuItem = this.getItem(id);
        switch (menuItem.value) {
          case "Approved":
            updateKomunitasStatus(rowData.id, "approved");
            break;
          case "Pending":
            // myWin.show();
            updateKomunitasStatus(rowData.id, "pending");
            break;
          case "Reject":
            updateKomunitasStatus(rowData.id, "reject");
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

  loadKomunitasData();
  countPesertaData();
});

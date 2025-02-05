function loadPerusahaanData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/api/icc/user/perusahaan?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            email: item.email,
            status: item.activeStatus,
            name_company: item.companyDetail.name_company,
            address_company: item.companyDetail.address_company,
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

function countPerusahaanData() {
  axios
    .get(`http://localhost:3000/api/icc/user/perusahaan/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("statsTotal")) {
          $$("statsTotal").parse({ total: res.data.data.total || 0 });
        }
        if ($$("statsActive")) {
          $$("statsActive").parse({
            active: res.data.data.active || 0,
          });
        }
        if ($$("statsInactive")) {
          $$("statsInactive").parse({ inactive: res.data.data.inactive || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function changeStatus(id, status) {
  axios
    .put(
      `http://localhost:3000/api/icc/user/internal/edit/status/${id}`,
      { status },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadPerusahaanData();
      countPerusahaanData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function deleteUser(id) {
  axios
    .delete(`http://localhost:3000/api/icc/user/perusahaan/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadPerusahaanData();
      countPerusahaanData();
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
    { id: "0", value: "Inactive" },
    { id: "1", value: "Active" },
  ],
  width: 100,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadPerusahaanData(newValue);
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
          "<iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>" +
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
      id: "statsActive",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Active</div>" +
          "<div class='value'>" +
          (obj.active !== undefined ? obj.active : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-approve'>" +
          "<iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { active: 0 },
    },
    {
      id: "statsInactive",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Inactive</div>" +
          "<div class='value'>" +
          (obj.inactive !== undefined ? obj.inactive : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-reject'>" +
          "<iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      autoheight: true,
      css: "stats",
      data: { inactive: 0 },
    },
    {},
  ],
};

var edit =
  "<span class='webix_icon me-1 editBtn' style='cursor:pointer;'><iconify-icon icon='solar:eye-outline' style='color:#398bf1;'></iconify-icon></span>";
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";
var changeActive =
  "<span class='webix_icon me-1 activeBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-check-rounded-outline' style='color:#6e006e;'></iconify-icon></span>";
var changeInactive =
  "<span class='webix_icon me-1 inactiveBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-cross-linear' style='color:#6e006e;'></iconify-icon></span>";

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
  { id: "name_company", header: "Nama Perusahaan", width: 200, sort: "string" },
  {
    id: "address_company",
    header: "Alamat Perusahaan",
    width: 300,
    sort: "string",
  },
  {
    id: "email",
    header: "Email Perusahaan",
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
  data: ["Detail", "Active", "Inactive", "Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;

      switch (action) {
        case "Detail":
          window.location.href = `/manajemen-perusahaan/detail/${rowId}`;
          break;
        case "Active":
          changeStatus(rowId, "1");
          break;
        case "Inactive":
          changeStatus(rowId, "0");
          break;
        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus user ini?",
            callback: function (result) {
              if (result) {
                deleteUser(rowId);
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
      if (obj.status === "1") {
        obj.action = edit + changeInactive + trash;
        obj.status = `<div class="row-green">ACTIVE</div>`;
      } else {
        obj.action = edit + changeActive + trash;
        obj.status = `<div class="row-red">INACTIVE</div>`;
      }
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

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [stats, toolbar, datatable],
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

  loadPerusahaanData();
  countPerusahaanData();
});

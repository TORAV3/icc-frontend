function loadPerusahaanData(type = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/sop3mi?type=${type}`, {
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
            type: item.type.toUpperCase(),
            name_company: item.companyDetail.name,
            address_company: item.companyDetail.address,
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
    .get(`http://deviso.vdc.id:3003/api/icc/user/sop3mi/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("statsTotal")) {
          $$("statsTotal").parse({ total: res.data.data.total || 0 });
        }
        if ($$("statsSO")) {
          $$("statsSO").parse({
            so: res.data.data.so || 0,
          });
        }
        if ($$("statsP3MI")) {
          $$("statsP3MI").parse({ p3mi: res.data.data.p3mi || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

var statusCombo = {
  view: "combo",
  value: "all",
  label: "Jenis",
  labelPosition: "top",
  options: [
    { id: "all", value: "All" },
    { id: "so", value: "SO" },
    { id: "p3mi", value: "P3MI" },
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
      id: "statsSO",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>SO</div>" +
          "<div class='value'>" +
          (obj.so !== undefined ? obj.so : 0) +
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
      id: "statsP3MI",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>P3MI</div>" +
          "<div class='value'>" +
          (obj.p3mi !== undefined ? obj.p3mi : 0) +
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
    id: "type",
    header: "Jenis Perusahaan",
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
];

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Detail"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;

      var jenis = $$("table").getItem(rowId)["type"].toLowerCase();

      switch (action) {
        case "Detail":
          window.location.href = `/profil/detail/${jenis}/${rowId}`;
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

function loadArtikelData() {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/api/icc/artikel`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            norek: item.norek,
            thumbnail: item.thumbnail,
            category: item.category ? item.category.toUpperCase() : "",
            publishdate: item.publishdate
              ? new Date(item.publishdate).toISOString().split("T")[0]
              : "",
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

function countArtikelData() {
  axios
    .get(`http://localhost:3000/api/icc/artikel/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("statsTotal")) {
          $$("statsTotal").parse({ total: res.data.data.total || 0 });
        }
        if ($$("statsPublished")) {
          $$("statsPublished").parse({
            published: res.data.data.published || 0,
          });
        }
        if ($$("statsDraft")) {
          $$("statsDraft").parse({ draft: res.data.data.draft || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

function deleteArtikel(id) {
  axios
    .delete(`http://localhost:3000/api/icc/artikel/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadArtikelData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function updateArtikelStatus(artikelId, status) {
  const url = `http://localhost:3000/api/icc/artikel/status/${artikelId}`;

  const requestData = {
    status: status,
  };

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      loadArtikelData();
      countArtikelData();
    })
    .catch(function (err) {
      console.error("Error loading data:", err);
    });
}

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
  cols: [searchForm],
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
  { id: "title", header: "Judul", width: 200, sort: "string" },
  { id: "category", header: "Kategori", width: 200, sort: "string" },
  {
    id: "description",
    header: { text: "Deskripsi" },
    width: 600,
    sort: "string",
  },
  { id: "thumbnail", header: "Thumbnail", width: 300, sort: "string" },
  { id: "publishdate", header: "Tanggal Publish", width: 300, sort: "string" },
];

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Edit", "Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;

      switch (action) {
        case "Edit":
          window.location.href = `/manajemen/artikel/edit/${rowId}`;
          break;

        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus artikel ini?",
            callback: function (result) {
              if (result) {
                deletePeduliSesama(rowId);
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
        case "published":
          statusClass = "status-published";
          break;
        case "draft":
          statusClass = "status-draft";
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
          "<iconify-icon icon='solar:file-text-outline'></iconify-icon>" +
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
      id: "statsPublished",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Published</div>" +
          "<div class='value'>" +
          (obj.published !== undefined ? obj.published : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-publish'>" +
          "<iconify-icon icon='solar:file-text-outline'></iconify-icon>" +
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
      id: "statsDraft",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Draft</div>" +
          "<div class='value'>" +
          (obj.draft !== undefined ? obj.draft : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-draft'>" +
          "<iconify-icon icon='solar:file-download-outline'></iconify-icon>" +
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
      template:
        "<div class='card new' id='addDataCard'>" +
        "<div class='card-content'>" +
        "<div class='text-new'>" +
        "<div class='title-new'>Buat Baru</div>" +
        "<div class='desc-new'>Artikel</div>" +
        "</div>" +
        "<div class='icon_stats-new'>" +
        "<iconify-icon icon='solar:clipboard-add-outline'></iconify-icon>" +
        "</div>" +
        "</div>" +
        "</div>",
      autoheight: true,
      css: "stats",
    },
  ],
};

setTimeout(() => {
  let addDataCard = document.getElementById("addDataCard");
  if (addDataCard) {
    addDataCard.addEventListener("click", function () {
      console.log("Redirecting to /manajemen/artikel/tambah...");
      window.location.href = "/manajemen/artikel/tambah";
    });
  } else {
    console.error("Element #addDataCard not found!");
  }
}, 500);

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [stats, toolbar, datatable],
  });

  webix.ui({
    view: "contextmenu",
    id: "cmenu",
    master: $$("table"),
    data: ["Draft", "Published"],
    on: {
      onItemClick: function (id) {
        var context = this.getContext();
        var rowId = context.id;
        var rowData = $$("table").getItem(rowId);

        var menuItem = this.getItem(id);
        switch (menuItem.value) {
          case "Draft":
            updateArtikelStatus(rowData.id, "draft");
            break;
          case "Published":
            // myWin.show();
            updateArtikelStatus(rowData.id, "published");
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

  loadArtikelData();
  countArtikelData();
});

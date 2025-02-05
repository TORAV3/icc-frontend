function loadFaqData() {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/api/icc/faq`, {
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

function deleteFaq(id) {
  axios
    .delete(`http://localhost:3000/api/icc/faq/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: res.data.data });
      loadFaqData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
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
  { id: "title", header: "Judul", width: 400, sort: "string" },
  {
    id: "description",
    header: { text: "Deskripsi" },
    width: 100,
    sort: "string",
    fillspace: true,
  },
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
          window.location.href = `/manajemen/faq/edit/${rowId}`;
          break;

        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus faq ini?",
            callback: function (result) {
              if (result) {
                deleteFaq(rowId);
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
      obj.action = edit + trash;
    },
  },
  navigation: true,
  pager: "pager",
};

var stats = {
  view: "layout",
  margin: 10,
  cols: [
    {},
    {},
    {},
    {
      template:
        "<div class='card new' id='addDataCard'>" +
        "<div class='card-content'>" +
        "<div class='text-new'>" +
        "<div class='title-new'>Buat Baru</div>" +
        "<div class='desc-new'>FAQ</div>" +
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
      window.location.href = "/manajemen/faq/tambah";
    });
  } else {
    console.error("Element #addDataCard not found!");
  }
}, 500);

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

  loadFaqData();
});

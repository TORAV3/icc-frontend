function loadPeduliSesamaData() {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/api/icc/pedulisesama`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const statusFilter = $$("statusFilter").getValue();
        const kategoriFilter = $$("kategoriFilter").getValue();
        const transformedData = res.data.data
        .filter((item) => {
          if (statusFilter !== "all" && item.status !== statusFilter) {
            return false;
          }

          if (kategoriFilter !== "all" && item.category !== kategoriFilter) {
            return false;
          }

          return true;
        })
        .map(function (item) {
          return {
            id: item.id,
            status: item.status,
            title: item.title,
            category: item.category,
            description: item.description,
            norek: item.norek,
            // thumbnail: item.thumbnail,
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

function countPeduliSesamaData() {
  axios
    .get(`http://localhost:3000/api/icc/pedulisesama/count`, {
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

function deletePeduliSesama(id) {
  axios
    .delete(`http://localhost:3000/api/icc/pedulisesama/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: "Berhasil Menghapus Data Charity" });
      loadPeduliSesamaData();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function updatePeduliSesamaStatus(pedulisesamaId, status) {
  const url = `http://localhost:3000/api/icc/pedulisesama/status/${pedulisesamaId}`;

  const requestData = {
    status: status,
  };

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      webix.message({ type: "success", text: "Berhasil Merubah Status Charity" });
      loadPeduliSesamaData();
      countPeduliSesamaData();
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

var statusFilter = {
  view: "combo",
  id: "statusFilter",
  label : "Status",
  labelPosition : "top",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "published", value: "Published" },
    { id: "draft", value: "Draft" },
  ],
  on: {
    onChange: function () {
      loadPeduliSesamaData();
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
    { id: "Bencana", value: "Bencana" },
    { id: "Sosial", value: "Sosial" },
    { id: "Pendidikan", value: "Pendidikan" },
    { id: "Kesehatan", value: "Kesehatan" },
  ],
  on: {
    onChange: function () {
      loadPeduliSesamaData();
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [statusFilter, kategoriFilter, {}, {}, searchForm],
};

var edit =
  "<span class='webix_icon me-1 editBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";

var tabcols = [
  {
    id: "action",
    header: { text: "", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 50,
    template: function () {
      return `
          <span class="webix_icon actionMenu" style="cursor:pointer;">
            <iconify-icon icon="carbon:overflow-menu-vertical" style="font-size: 18px;"></iconify-icon>
          </span>
        `;
    },
  },
  { id: "id", hidden: true },
  {
    id: "status",
    header: { text: "Status", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
  { id: "title", header: "Judul", width: 400, sort: "string" },
  { id: "category", header: "Kategori", width: 200, sort: "string" },
  {
    id: "description",
    header: { text: "Deskripsi" },
    width: 600,
    sort: "string",
  },
  { id: "norek", header: "Nomor Rekening", width: 200, sort: "string" },
  // { id: "thumbnail", header: "Thumbnail", width: 300, sort: "string" },
];

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Edit", "Preview", "Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;

      switch (action) {
        case "Edit":
          window.location.href = `/manajemen/charity/edit/${rowId}`;
          break;

        case "Preview":
          // showPreview(rowId);
          window.open("/charity/detail/" + rowId, "_blank");
          // window.open("/charity/detail/" + rowId, "_blank", "width=1280,height=800");

          // Untuk mobile view
          const mobileWidth = 390;
          const mobileHeight = 844;

          // Dapatkan ukuran layar saat ini
          const screenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
          const screenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          // Hitung posisi agar jendela muncul di tengah
          const left = screenLeft + (screenWidth - mobileWidth) / 2;
          const top = screenTop + (screenHeight - mobileHeight) / 2;

          window.open(
              "/charity/detail/" + rowId,
              "_blank",
              `width=${mobileWidth},height=${mobileHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`
          );
        break;

        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus charity ini?",
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

function showPreview(rowId) {
  axios
  .get(`http://localhost:3000/api/icc/pedulisesama/${rowId}`)
  .then((res) => {

    const charity = res.data.data;
    console.log(charity); 

     var thumbnailUrl = charity.thumbnailBase64;

     const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      };

    
    var previewContent = `
      <div style="max-width: 800px; margin: auto; padding: 20px; text-align: center;">
        <p style="color: rgba(190, 30, 45, 1); text-transform: uppercase; font-size: 14px; font-weight: bold;">${charity.category}</p>
        <p style="color: rgba(15, 23, 43, 1); font-size: 32px; font-weight: bold; margin-top: 10px;">${charity.title}</p>
        <img src="${thumbnailUrl}" alt="${charity.title}" style="width: 100%; height: auto; margin-top: 15px; border-radius: 8px;">
         <div style="padding: 8px; border-radius: 6px; background: rgba(0, 0, 0, 0.1); display: inline-block; margin-top: 20px;">
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: black; text-align: center;"> ${charity.norek}</p>
        </div>
        <div style="margin-top: 20px; font-size: 18px; color: #444; text-align: left;">
          ${charity.description}
        </div>
      </div>
    `;

    webix.ui({
      view: "window",
      id: "previewWindow",
      head: "Preview",
      body: {
        view: "template",
        template: previewContent,
        height: 500,
        width: 500,
        scroll: true,
      },
      position: "center",
      modal: true,
      move: true,
      close: true,
    }).show();
  })
  .catch((err) => {
    console.log("Error:", err);
    webix.message({
      type: "error",
      text: err.response?.data?.message || "Error fetching data",
    });
  });

}

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  autoheight: true,
  leftSplit: 1,
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
        "<div class='desc-new'>Charity</div>" +
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
      window.location.href = "/manajemen/charity/tambah";
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

  $$("table").registerFilter(
    $$("textSearch"),
    { columnId: "description" },
    {
      getValue: function (view) {
        return view.getValue();
      },
      setValue: function (view, value) {
        view.setValue(value);
      },
    }
  );

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
            updatePeduliSesamaStatus(rowData.id, "draft");
            break;
          case "Published":
            // myWin.show();
            updatePeduliSesamaStatus(rowData.id, "published");
            break;
          default:
            break;
        }
      },
    },
  });

  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadPeduliSesamaData();
  countPeduliSesamaData();
});

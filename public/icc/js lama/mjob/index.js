function loadData() {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://deviso.vdc.id:3003/api/icc/job`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.jobId,
            jobTitle: item.jobTitle,
            jobDescription: item.jobDescription,
            jobCategory: item.jobCategory.toUpperCase(),
            jobRequirements: item.jobRequirements,
            jobLocation: item.jobLocation,
            salaryRange: item.salaryRange,
            jobType: item.jobType,
            deadline: item.deadline
              ? new Date(item.deadline).toISOString().split("T")[0]
              : "",
            status: item.status.toUpperCase(),
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

function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000); 
  
  if (years > 0) return `${years} tahun yang lalu`;
  if (months > 0) return `${months} bulan yang lalu`;
  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  return `${diffInSeconds} detik yang lalu`;
}

function deleteLoker(id) {
  axios
    .delete(`http://deviso.vdc.id:3003/api/icc/job/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      loadData();
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

var tabcols = [
  { id: "id", hidden: true },
    {
      id: "action",
      header: { text: "", css: { "text-align": "center" } },
      css: { "text-align": "center sticky-action" },
      width: 80,
      template: function () {
        return `
          <div class="action-sticky">
            <span class="webix_icon actionMenu" style="cursor:pointer;">
              <iconify-icon icon="carbon:overflow-menu-vertical" style="font-size: 18px;"></iconify-icon>
            </span>
          </div>
        `;
      }
  },
  { id: "jobTitle", header: "Judul", width: 200, sort: "string" },
  { id: "jobCategory", header: "Kategori", width: 200, sort: "string" },
  {
    id: "jobDescription",
    header: "Deskripsi",
    width: 300,
    sort: "string",
  },
  {
    id: "jobRequirements",
    header: "Requirements",
    width: 300,
    sort: "string",
  },
  {
    id: "jobLocation",
    header: "Lokasi",
    width: 150,
    sort: "string",
  },
  {
    id: "jobType",
    header: "Tipe",
    width: 150,
    sort: "string",
  },
  {
    id: "salaryRange",
    header: "Rentang Gaji",
    width: 240,
    sort: "string",
  },
  {
    id: "deadline",
    header: "Deadline",
    width: 240,
    sort: "string",
  },
  {
    id: "status",
    header: "Status",
    width: 100,
    sort: "string",
  },
];

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Edit", "Detail", "Hapus"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var action = this.getItem(id).value;

      switch (action) {
        case "Edit":
          window.location.href = `/manajemen/loker/edit/${rowId}`;
          break;
        case "Detail":
          webix.ajax()
            .headers({ Authorization: "Bearer " + token })
            .get(`http://deviso.vdc.id:3003/api/icc/job/${rowId}`)
            .then(function (response) {
              const detail = response.json().data;

              const jobStatus = detail.status || "Closed";
              const statusButtonText = jobStatus === "Open" ? "Tutup Lowongan" : "Buka Lowongan";
              const statusAction = jobStatus === "Open" ? "closeJob" : "openJob";
                      
              const companyName = detail.company ? detail.company.companyDetail?.name || "Perusahaan Tidak Diketahui" : detail.companyName || "Perusahaan Tidak Diketahui";
              const companyAddress = detail.company ? detail.company.companyDetail?.address || "Alamat Tidak Tersedia" : detail.companyLocation || "Alamat Tidak Tersedia";
              
              const salaryRangeFormatted = detail.salaryRange.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
              
              const jobDescription = detail.jobDescription ? detail.jobDescription.replace(/<[^>]+>/g, "") : "Deskripsi tidak tersedia";
              const jobRequirements = detail.jobRequirements ? detail.jobRequirements.replace(/<[^>]+>/g, "") : "Persyaratan tidak tersedia";
              const timeAgoText = timeAgo(detail.created_at);
        
              webix.ui({
                view: "window",
                id: "jobDetailModal",
                width: 700,
                height: 600,
                position: "center",
                modal: true,
                head: {
                  cols: [
                    { template: `<div style="font-weight: bold; font-size: 18px;">${detail.jobTitle}</div>`, borderless: true },
                    {
                      view: "icon", icon: "wxi-close", click: function () {
                        $$("jobDetailModal").close();
                      }
                    }
                  ]
                },
                body: {
                  view: "scrollview",
                  scroll: "y",
                  body: {
                    padding: 20,
                    rows: [
                      {
                        autoheight: true,
                        template: `
                          <div style="margin-bottom: 8px;">
                            <div style="font-size: 18px; font-weight: 600; color: #be1e2d;">${companyName}</div>
                            <div style="font-size: 13px; color: #444;">📍 ${companyAddress}</div>
                            <hr style="margin-top: 15px;">
                            <div style="margin-top: 15px; font-size: 12px;">💰 <b>${salaryRangeFormatted}</b></div>
                            <div style="margin-top: 8px; font-size: 12px;">💼 <b>${detail.jobCategory.toUpperCase()}</b></div>
                            <div style="margin-top: 8px; font-size: 12px;">⏳ <b>${detail.jobType}</b></div>
                            <div style="margin-top: 15px; font-size: 12px; color: green; font-weight: 100;">🕑 <b>Tayang ${timeAgoText}</b></div>
                
                            <div style="margin-top: 18px;">
                              <button onclick="changeJobStatus('${detail.jobId}', '${statusAction}')" style="background-color: #be1e2d; color: white; padding: 10px 20px; font-size: 13px; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px;">
                                ${statusButtonText}
                              </button>

                              <button onclick="lihatLoker('${detail.jobId}')" style="
                                background-color: #be1e2d;
                                color: white;
                                padding: 10px 20px;
                                font-size: 13px;
                                border: none;
                                border-radius: 6px;
                                cursor: pointer;
                              ">Lihat Pelamar</button>
                            </div>
                          </div>
                        `
                      },
                      ...(jobDescription ? [{
                        autoheight: true,
                        template: `
                          <div style="margin-top: 16px; margin-bottom: 16px;">
                            <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">Deskripsi Pekerjaan</div>
                            <div style="font-size: 11px; line-height: 1.5;">${jobDescription}</div>
                          </div>
                        `}] : []),
                
                      ...(jobRequirements ? [{
                        autoheight: true,
                        template: `
                          <div style="margin-top: 16px;">
                            <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">Persyaratan Lengkap</div>
                            <div style="font-size: 11px; line-height: 1.5;">${jobRequirements}</div>
                          </div>
                        `}] : []),
                    ]
                  }
                }
              }).show();
            })
            .catch(function (err) {
              console.error("Gagal memuat detail lowongan kerja:", err);
              webix.message({ type: "error", text: "Gagal memuat detail lowongan kerja" });
            });
          break;

          case "Hapus":
            webix.confirm({
              title: "Konfirmasi Hapus",
              ok: "Ya",
              cancel: "Tidak",
              text: "Apakah anda yakin ingin menghapus lowongan kerja ini?",
              callback: function (result) {
                if (result) {
                  deleteLoker(rowId);
                  webix.message({ type: "success", text: "Berhasil Menghapus Data Lowongan Kerja" });
                }
              },
            });
          break;
      }
    },
  },
});

function lihatLoker(jobId) {
  window.location.href = `/manajemen/loker/pelamar/${jobId}`;
}

function changeJobStatus(jobId, action) {
  const newStatus = action === "openJob" ? "Open" : "Closed";

  webix.ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(`http://deviso.vdc.id:3003/api/icc/job/change/status/${jobId}`, { status: newStatus })
    .then(function (response) {

      webix.message({ type: "success", text: `Status Lowongan berhasil diubah menjadi ${newStatus}` });
      $$("jobDetailModal").close();
      loadData();

    })
    .catch(function (err) {
      console.error("Gagal mengubah status lowongan:", err);
      webix.message({ type: "error", text: "Terjadi kesalahan dalam mengubah status lowongan" });
    });
}

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

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [
    {},
    {},
    {
      view: "button",
      value: "Buat Lowongan Kerja",
      width: 200,
      align: "center",
      height: 50,
      click: function () {
        window.location.href = "/manajemen/loker/tambah";
      },
    },
  ],
};

function applyFilters() {
  const category = $$("categoryFilter").getValue();
  const type = $$("tipeFilter").getValue();
  const status = $$("statusFilter").getValue();

  $$("table").filter(function (obj) {
    const matchesCategory =
      category === "all" ||
      obj.jobCategory.toLowerCase() === category.toLowerCase();
    const matchesType =
      type === "all" || obj.jobType.toLowerCase() === type.toLowerCase();
    const matchesStatus =
      status === "all" || obj.status.toLowerCase() === status.toLowerCase();

    return matchesCategory && matchesType && matchesStatus;
  });
}

var toolbar2 = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [{
      view: "combo",
      id: "categoryFilter",
      labelPosition: "top",
      label: "Kategori",
      value: "all",
      options: [
        { id: "all", value: "All" },
        { id: "marketing", value: "Marketing" },
        { id: "it", value: "IT" },
        { id: "design", value: "Graphic Design" },
      ],
      on: {
        onChange: function () {
          applyFilters();
        },
      },
    },
    {
      view: "combo",
      id: "tipeFilter",
      labelPosition: "top",
      label: "Tipe",
      value: "all",
      options: [
        { id: "all", value: "All" },
        { id: "Full-time", value: "Full-time" },
        { id: "Part-time", value: "Part-time" },
        { id: "Freelance", value: "Freelance" },
      ],
      on: {
        onChange: function () {
          applyFilters();
        },
      },
    },
    {
      view: "combo",
      id: "statusFilter",
      labelPosition: "top",
      label: "Status",
      value: "all",
      options: [
        { id: "all", value: "All" },
        { id: "Open", value: "Open" },
        { id: "Closed", value: "Closed" },
      ],
      on: {
        onChange: function () {
          applyFilters();
        },
      },
    }, {}, searchForm],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [toolbar, toolbar2, datatable],
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
    id: "detailPopup",
    width: 700,
    height: 520,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        { width: 10 },
        { view: "label", label: "Detail Lowongan Kerja" },
        {
          view: "icon",
          icon: "wxi-close",
          click: () => $$("detailPopup").hide()
        }
      ]
    },
    body: {
      id: "detailTemplate",
      view: "template",
      template: "",
      scroll: "y"
    }
  });
  

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  webix.extend($$("table"), webix.ProgressBar);

  loadData();
});

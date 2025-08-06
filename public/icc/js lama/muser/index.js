function loadUserData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta?status=${status}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const programFilter = $$("programFilter").getValue();

        console.log(programFilter);

        const transformedData = res.data.data
          .filter((item) => {
            if (programFilter !== "all" && item.userDetail?.programType !== programFilter) {
              return false;
            }

            return true;
          })
        .map(function (item) {
          return {
            id: item.id,
            email: item.email,
            status: item.status,
            fullname: item.userDetail?.fullname,
            phone: item.userDetail?.phone,
            program_type: item.userDetail?.programType?.toUpperCase(),
            mitra: item.userDetail?.companyDetail?.name || "",
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

function loadSOP3MI(type = "all") {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/sop3mi?type=${type}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.data.length > 0) {
        window.companyOptions = res.data.data.map((item) => ({
          id: item.companyDetail.id,
          value: item.companyDetail.name,
          type: item.type,
        }));
      }
    })
    .catch((err) => {
      webix.message({ type: "error", text: err.response.data.data });
    });
}

function countPesertaData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("statsTotal")) {
          $$("statsTotal").parse({ total: res.data.data.total || 0 });
        }
        if ($$("statsRegister")) {
          $$("statsRegister").parse({
            register: res.data.data.register || 0,
          });
        }
        if ($$("statsApprove")) {
          $$("statsApprove").parse({ approve: res.data.data.approve || 0 });
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

function updateUserStatus(userId, status) {
  const url = `http://deviso.vdc.id:3003/api/icc/user/status/${userId}`;

  const requestData = {
    status: status,
  };

  webix
    .ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(url, requestData)
    .then(function (data) {
      webix.message({ type: "success", text: "Berhasil mengubah Status Peserta!" });
      loadUserData();
      countPesertaData();
    })
    .catch(function (err) {
      console.error("Error loading data:", err);
    });
}

function deleteUser(id) {
  axios
    .delete(`http://deviso.vdc.id:3003/api/icc/user/internal/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      webix.message({ type: "success", text: "Berhasil Menghapus Data Peserta!" });
      loadUserData();
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
  label : "Status",
  labelPosition : "top",
  options: [
    { id: "all", value: "All" },
    { id: "register", value: "Register" },
    { id: "approve", value: "Approve" },
    { id: "reject", value: "Reject" },
  ],
  width: 110,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadUserData(newValue);
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

var programFilter = {
  view: "combo",
  id: "programFilter",
  label : "Program",
  labelPosition : "top",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "pmi", value: "PMI" },
    { id: "magang", value: "Magang" },
  ],
  on: {
    onChange: function () {
      loadUserData();
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [statusCombo, programFilter, {}, {}, searchForm],
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
  { id: "fullname", header: "Nama Lengkap", width: 200, sort: "string" },
  { id: "phone", header: "No. Handphone", width: 200, sort: "string" },
  { id: "program_type", header: "Program", width: 200, sort: "string" },
  { id: "mitra", header: "Mitra", width: 200, sort: "string" },
  { id: "email", header: "Email", width: 240, sort: "string", fillspace: true },
  {
    id: "status",
    header: { text: "Status", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
    sort: "string",
  },
];

function showPerusahaan(rowId, rowProgram) {

  if ($$("perusahaanModal")) {
    $$("perusahaanModal").show();
    return;
  }

  if (!window.companyOptions) {
    webix.message({ type: "error", text: "Company data not loaded yet." });
    return;
  }

  // let filteredCompanies = [];
  // if (rowProgram === "MAGANG") {
  //   filteredCompanies = window.companyOptions.filter(item => item.type === "so");
  // } else if (rowProgram === "PMI") {
  //   filteredCompanies = window.companyOptions.filter(item => item.type === "p3mi");
  // } else {
  //   filteredCompanies = window.companyOptions;
  // }

  var perusahaanModal = webix.ui({
    view: "window",
    id: "perusahaanModal",
    width: 400,
    height: 200,
    head: "Mitra",
    position: "center",
    body: {
      view: "form",
      elements: [
        {
          view: "combo",
          label: "Pilih",
          name: "company",
          options: companyOptions,
          required: true,
        },
        {
          rows: [
            {
              view: "button",
              value: "Kirim",
              align: "center",
              click: function () {
                var formValues = $$("perusahaanModal").getBody().getValues();
                console.log(formValues);
                var selectedCompanyId = formValues.company;

                if (selectedCompanyId) {
                    axios
                      .put(`http://deviso.vdc.id:3003/api/icc/user/peserta/edit/mitra/${rowId}`, {
                        mitraId: selectedCompanyId,
                      }, {
                        headers: {
                          Authorization: "Bearer " + token,
                        }
                      })
                      .then(response => {
                        webix.message({ type: "success", text: "Berhasil Memilih Mitra!" });
                        $$("perusahaanModal").close();
                        loadUserData();
                      })
                      .catch(error => {
                        webix.message({ type: "error", text: "Error updating mitraId" });
                        console.log(error);
                      });
                } else {
                  webix.message({ type: "error", text: "Silahkan pilih mitra." });
                }
              },
            },
          ],
        },
      ],
    },
    modal: true,
    close: true,
    hidden: true,
  });

  perusahaanModal.show();
}


webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: ["Detail", "Hapus", "Mitra"],
  on: {
    onItemClick: function (id) {
      var context = this.getContext();
      var rowId = context.id;
      var rowProgram = context.program_type;
      var action = this.getItem(id).value;

      switch (action) {
        case "Detail":
          window.location.href = `/profil/peserta/detail/${rowId}`;
          break;

        case "Mitra":
          showPerusahaan(rowId, rowProgram);
          break;

        case "Hapus":
          webix.confirm({
            title: "Konfirmasi Hapus",
            ok: "Ya", // Text for the confirm button
            cancel: "Tidak", // Text for the cancel button
            text: "Apakah anda yakin ingin menghapus peserta ini?",
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
      var rowData = $$("table").getItem(id);
      
      $$("actionMenu").show(node);
      $$("actionMenu").setContext({ 
        id: id.row, 
        program_type: rowData.program_type
      });
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = detail + trash;
      var css;
      switch (obj.status) {
        case "approve":
          css = "row-green";
          break;
        case "reject":
          css = "row-red";
          break;
        case "reviewed":
          css = "row-orange";
          break;
        case "register":
          css = "row-blue";
          break;
        case "revisi":
          css = "row-purple";
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
      id: "statsRegister",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Register</div>" +
          "<div class='value'>" +
          (obj.register !== undefined ? obj.register : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-register'>" +
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
      id: "statsApprove",
      template: function (obj) {
        return (
          "<div class='card draft'>" +
          "<div class='card-content'>" +
          "<div class='text'>" +
          "<div class='title'>Approve</div>" +
          "<div class='value'>" +
          (obj.approve !== undefined ? obj.approve : 0) +
          "</div>" +
          "</div>" +
          "<div class='icon_stats-approve'>" +
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
    data: ["Approve", "Revisi", "Reject"],
    on: {
      onItemClick: function (id) {
        var context = this.getContext();
        var rowId = context.id;
        var rowData = $$("table").getItem(rowId);

        var menuItem = this.getItem(id);
        switch (menuItem.value) {
          case "Approve":
            updateUserStatus(rowData.id, "approve");
            break;
          case "Revisi":
            // myWin.show();
            updateUserStatus(rowData.id, "revisi");
            break;
          case "Reject":
            updateUserStatus(rowData.id, "reject");
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

  loadUserData();
  loadSOP3MI();
  countPesertaData();
});

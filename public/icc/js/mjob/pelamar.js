function loadData() {
  $$("table").showProgress({
    type: "icon",
  });

  axios
    .get(`http://localhost:3000/api/icc/job/pelamar/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            code: item.code || "-",
            fullname: item.fullname || "-",
            email: item.email || "-",
            programType: item.program.toUpperCase() || "-",
            phone: item.phone || "-",
            status: item.status || "Applied",
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
  { id: "code", header: "Nomor", width: 150, sort: "string" },
  { id: "fullname", header: "Nama Lengkap", width: 300, sort: "string" },
  { id: "email", header: "Email", width: 300, sort: "string" },
  { id: "programType", header: "Program", width: 120, sort: "string" },
  { id: "phone", header: "No. HP", width: 140, sort: "string", fillspace: "true" },
  {
    id: "status",
    header: "Status",
    width: 150,
    sort: "string",
    template: function (obj) {
      const statusText = obj.status || "Applied";
      const buttonClass =
        statusText === "Wawancara"
          ? "btn-wawancara"
          : statusText === "Diterima"
          ? "btn-diterima"
          : statusText === "Reject"
          ? "btn-reject"
          : "btn-applied";

      return `
        <button class="${buttonClass}" style="padding: 4px 12px; font-size: 14px; border-radius: 5px; border: none;">
          ${statusText}
        </button>
      `;
    },
  },
];

const style = `
  <style>
    .btn-applied {
      background-color: #007bff; /* Blue color for applied status */
      color: white;
      padding: 4px 12px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #007bff;
      cursor: pointer;
    }
    .btn-applied:hover {
      background-color: #0056b3; /* Darker blue on hover */
      border-color: #0056b3;
    }

    .btn-wawancara {
      background-color: #ff9800;
      color: white;
      padding: 4px 12px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #ff9800;
      cursor: pointer;
    }
    .btn-wawancara:hover {
      background-color: #e68900;
      border-color: #e68900;
    }

    .btn-diterima {
      background-color: #4caf50;
      color: white;
      padding: 4px 12px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #4caf50;
      cursor: pointer;
    }
    .btn-diterima:hover {
      background-color: #45a149;
      border-color: #45a149;
    }

    .btn-reject {
      background-color: #f44336;
      color: white;
      padding: 4px 12px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #f44336;
      cursor: pointer;
    }
    .btn-reject:hover {
      background-color: #e53935;
      border-color: #e53935;
    }
  </style>
`;

document.head.insertAdjacentHTML("beforeend", style);

function updateApplicantStatus(applicantId, newStatus) {
  const jobId = window.location.pathname.split('/').pop();

  axios
    .put(`http://localhost:3000/api/icc/job/update/status/${applicantId}`, {
      status: newStatus,
      jobId: jobId,
    })
    .then((response) => {
      webix.message({ type: "success", text: `Berhasil Mengubah Status Pelamar!` });
      loadData();
    })
    .catch((error) => {
      webix.message({ type: "error", text: "Failed to update status" });
      console.error("Error updating applicant status:", error);
    });
}

webix.ui({
  view: "contextmenu",
  id: "actionMenu",
  data: [],
  on: {
    onBeforeShow: function () {
      var context = this.getContext();
      var rowId = context ? context.id : null;
      var rowData = rowId ? $$("table").getItem(rowId) : null;

      this.clearAll();

      if (rowData?.status === "Wawancara" && typeof type !== "undefined" && type === "internal") {
        this.parse(["Profil", "Jadwal Wawancara"]);
      } else {
        this.parse(["Profil"]);
      }
    },
    onItemClick: function(id) {
      var context = this.getContext();
      var rowId = context ? context.id : null;
      var rowData = rowId ? $$("table").getItem(rowId) : null; 

      if (!rowData) {
        return;
      }

      var menuItem = this.getItem(id);
      switch (menuItem.value) {
        case "Profil":
          window.location.href = `/profil/peserta/detail/${rowId}`;
          break;

        case "Jadwal Wawancara":
          openInterviewScheduleModal(rowId);
          break;
      }
    }
  }
});

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  autoheight: true,
  onClick: {
    actionMenu: function (event, id, node) {
      $$("actionMenu").setContext({ id: id.row });
      $$("actionMenu").show(node);
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


function openInterviewScheduleModal(rowId) {
  const jobId = window.location.pathname.split('/').pop();
  const rowData = $$("table").getItem(rowId);

  axios.get(`http://localhost:3000/api/icc/job/interview/${rowData.id}/${jobId}`, {
    headers: { Authorization: "Bearer " + token }
  })
  .then(response => {
    const data = response.data.data;

    if (data && Object.keys(data).length > 0) {
      const formattedDate = new Date(data.interviewDate).toISOString().split('T')[0];
    
      let formattedTime = "";
      if (data.interviewTime) {
        formattedTime = data.interviewTime.slice(0, 5);
      }
    
      $$("interviewForm").setValues({
        interviewDate: formattedDate,
        interviewTime: formattedTime,
        notes: data.notes || ""
      });
    } else {
      $$("interviewForm").clear();
      webix.message({ type: "info", text: "Jadwal wawancara belum tersedia." });
    }

    $$("interviewModal").show();
  })
  .catch(error => {
    console.error("Error fetching interview schedule:", error);
    webix.message({ type: "error", text: "Gagal memuat jadwal wawancara." });
  });
}

function saveInterviewSchedule(rowId, data) {
  const { interviewDate, interviewTime, notes } = data;

  const jobId = window.location.pathname.split('/').pop();

  const payload = {
    userId: rowId,
    jobId: jobId,
    interviewDate: interviewDate,
    interviewTime: interviewTime,
    notes: notes,
  };

  axios.post("http://localhost:3000/api/icc/job/interview/tambah", payload, {
    headers: {
      Authorization: "Bearer " + token, 
    }
  })
  .then((response) => {
    webix.message({
      type: "success",
      text: "Jadwal wawancara berhasil disimpan!",
    });
    
    $$("interviewModal").hide();
  })
  .catch((error) => {
    console.error("Error saving interview schedule:", error);
    webix.message({
      type: "error",
      text: "Gagal menyimpan jadwal wawancara.",
    });
  });
}


webix.ready(function () {

  console.log(type);

  var backHref = (type === "internal") ? "/manajemen/loker" : "/loker/perusahaan";

  var toolbar = {
    view: "toolbar",
    css: "toolbar",
    padding: 15,
    cols: [
      // {
      //   view: "button",
      //   type: "icon",
      //   label: "List LOKER",
      //   autowidth: true,
      //   css: "back-button",
      //   click: function () {
      //     window.location.href = backHref;
      //   },
      // },
      {},
      searchForm,
    ],
  };

  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [toolbar, datatable],
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

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  webix.ui({
    view: "contextmenu",
    id: "statusMenu",
    master: $$("table"),
    data: ["Wawancara", "Diterima", "Reject"],
    on: {
      onBeforeShow: function () {
        // Check if any row has the status "Diterima"
        const rows = $$("table").serialize();
        const diterimaExists = rows.some(row => row.status === "Diterima");
  
        if (diterimaExists) {
          if (this.exists("Diterima")) {
            this.remove("Diterima");
          }
        } else {
          if (!this.exists("Diterima")) {
            this.add({ id: "Diterima", value: "Diterima" });
          }
        }
      },
      onItemClick: function (id) {
        var context = this.getContext();
        var rowId = context.id;
        var rowData = $$("table").getItem(rowId);
  
        var menuItem = this.getItem(id);
        switch (menuItem.value) {
          case "Wawancara":
            updateApplicantStatus(rowData.id, "Wawancara");
            break;
          case "Diterima":
            updateApplicantStatus(rowData.id, "Diterima");
            break;
          case "Reject":
            updateApplicantStatus(rowData.id, "Reject");
            break;
          default:
            break;
        }
      },
    },
  });
  
  webix.ui({
    view: "window",
    id: "interviewModal",
    head: "Jadwal Wawancara",
    width: 400,
    height: 300,
    modal: true,
    move: true,
    close: true,
    position: "center",
    body: {
      view: "form",
      id: "interviewForm",
      elements: [
        { view: "text", label: "Tanggal", name: "interviewDate", type: "date", labelAlign: "left", required: true },
        { view: "text", label: "Waktu", name: "interviewTime", type: "time", labelAlign: "left", required: true },
        { view: "textarea", label: "Catatan", name: "notes", labelAlign: "left" },
        {
          view: "button", value: "Simpan", align: "center", click: function () {
            var form = $$("interviewForm");
            if (form.validate()) {
              var data = form.getValues();
              var rowId = $$("actionMenu").getContext().id;
              saveInterviewSchedule(rowId, data);
            }
          }
        }
      ]
    }
  });


  webix.extend($$("table"), webix.ProgressBar);

  loadData();
});

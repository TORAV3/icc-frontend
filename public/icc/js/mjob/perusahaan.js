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

function loadData() {
  webix.ajax().get(
    "http://localhost:3000/api/icc/job",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        const response = JSON.parse(text);

        if (!response.data) {
          console.error("No data found in response");
          return;
        }

        let jobs = Array.isArray(response.data) ? response.data : [];

        if (jobs.length === 0) {
          console.log("No job available");
          return;
        }

        const companyJobs = jobs.filter(job => job.companyId == userId);

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        const transformedData = companyJobs.map((job) => {
          let applicants = [];
        
          try {
            applicants = Array.isArray(job.applicants)
              ? job.applicants
              : JSON.parse(job.applicants || "[]");
          } catch (e) {
            console.warn("Gagal parse applicants:", job.applicants);
            applicants = [];
          }
        
          return {
            jobId: job.jobId,
            jobTitle: job.jobTitle,
            jobCategory: job.jobCategory,
            jobDescription: job.jobDescription.replace(/<\/?[^>]+(>|$)/g, ""),
            jobRequirements: job.jobRequirements.replace(/<\/?[^>]+(>|$)/g, ""),
            jobLocation: job.jobLocation,
            salaryRange: job.salaryRange,
            jobType: job.jobType,
            deadline: formatDate(job.deadline),
            status: job.status,
            companyName: job.company?.companyDetail?.name || "Nama tidak tersedia",
            companyAddress: job.company?.companyDetail?.address || "Alamat tidak tersedia",
            detailLink: `/lowongankerja/${job.jobId}`,
            timeAgo: timeAgo(job.created_at),
            alreadyApplied: applicants.includes(userId),
          };
        });

        $$("homeContentLoker").clearAll();
        if (transformedData.length > 0) {
          $$("homeContentLoker").parse(transformedData);
        }
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}

var layoutloker = {
  type: "wide",
  css: "dataview-community",
  cols: [
    {
      view: "dataview",
      id: "homeContentLoker",
      css: "dataview",
      autoheight: true,
      xCount: 3,
      type: {
        height: 300,
        width: 390,
        template: function (obj) {
          const statusColor = obj.status.toUpperCase() === "OPEN" ? "#4CAF50" : "#F44336";

          return `
            <div class="job-card" style="padding: 16px; border: 1px solid #eee; border-radius: 12px; background: #fff; display: flex; flex-direction: column; gap: 12px; font-family: sans-serif;">
              
              <!-- Job Title and Salary -->
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 18px; font-weight: 600; color: #333;">${obj.jobTitle}</div>
                <div style="font-size: 14px; color: #007bff;">${obj.salaryRange}</div>
              </div>
        
              <!-- Tags -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <span style="background: #ffe0b2; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: bold;">${obj.jobCategory.toUpperCase()}</span>
                <span style="background: #e0e0e0; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: bold;">${obj.jobType}</span>
                <span style="background: ${statusColor}; padding: 4px 10px; border-radius: 8px; font-size: 12px; color: white; font-weight: bold;">
                  ${obj.status}
                </span>
              </div>
        
              <!-- Company Info -->
              <div style="display: flex; align-items: center; gap: 8px;">
                <div>
                  <div style="color: #007bff; font-size: 13px; font-weight: 600;">${obj.companyName}</div>
                  <div style="font-size: 12px; color: #555;">📍 ${obj.companyAddress}</div>
                </div>
              </div>
        
              <!-- Timestamp -->
              <div style="font-size: 12px; color: green; border-top: 1px solid #eee; padding-top: 8px;"> 🕑 ${obj.timeAgo}</div>
            </div>
          `;
        }        
      },
    },
  ],
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [
    {
      view: "combo",
      id: "categoryFilter",
      labelPosition: "top",
      label: "Kategori",
      width: 300,
      value: "all",
      options: [
        { id: "all", value: "All" },
        { id: "marketing", value: "Marketing" },
        { id: "it", value: "IT" },
        { id: "finance", value: "Finance" },
        { id: "engineering", value: "Engineering" },
        { id: "marketing", value: "Marketing" },
        { id: "hrd", value: "Human Resource" },
      ],
      on: {
        onChange: function () {
          applyFilters();
        },
      },
    },
    { width: 20 },
    {
      view: "combo",
      id: "tipeFilter",
      labelPosition: "top",
      label: "Tipe",
      width: 300,
      value: "all",
      options: [
        { id: "all", value: "All" },
        { id: "Full-time", value: "Full-time" },
        { id: "Part-time", value: "Part-time" },
        { id: "Contract", value: "Contract" },
        { id: "Freelance", value: "Freelance" },
      ],
      on: {
        onChange: function () {
          applyFilters();
        },
      },
    },
    {},
    {
      view: "button",
      value: "Buat Lowongan Kerja",
      width: 200,
      align: "center",
      height: 50,
      click: function () {
        window.location.href = "/loker/tambah";
      },
    },
    {
      view: "button",
      value: "Jadwal Wawancara",
      width: 200,
      align: "center",
      height: 50,
      click: function () {
        axios.get(`http://localhost:3000/api/icc/job/interview/perusahaan/${userId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(response => {
          const interviews = response.data.data;

          if (Object.keys(interviews).length === 0) {
            webix.message({ type: "info", text: "Jadwal wawancara belum tersedia." });
          } else {
            showInterviewListModal(interviews);
            console.log(interviews);
          }
        })
        .catch(error => {
          console.error("Error loading interviews:", error);
          webix.message({ type: "error", text: "Gagal memuat data wawancara" });
        });
      },
    }
    
  ],
};


function lihatLoker(jobId) {
  window.location.href = `/manajemen/loker/pelamar/${jobId}`;
}

function editloker(jobId) {
  window.location.href = `/loker/edit/${jobId}`;
}

function applyFilters() {
  const category = $$("categoryFilter").getValue();
  const type = $$("tipeFilter").getValue();

  $$("homeContentLoker").filter(function (obj) {
    const matchesCategory =
      category === "all" ||
      obj.jobCategory.toLowerCase() === category.toLowerCase();
    const matchesType =
      type === "all" || obj.jobType.toLowerCase() === type.toLowerCase();

    return matchesCategory && matchesType;
  });
}

function showJobDetailModal(job) {

  const statusButtonText = job.status.toUpperCase() === "OPEN" ? "Tutup Lowongan" : "Buka Lowongan";
  const statusAction = job.status.toUpperCase() === "OPEN" ? "closeJob" : "openJob";

  webix.ui({
    view: "window",
    id: "jobDetailModal",
    width: 700,
    height: 600,
    position: "center",
    modal: true,
    head: {
      cols: [
        { template: `<div style="font-weight: bold; font-size: 18px;">${job.jobTitle}</div>`, borderless: true },
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
                <div style="font-size: 18px; font-weight: 600; color: #be1e2d;">${job.companyName}</div>
                <div style="font-size: 13px; color: #444;">📍 ${job.companyAddress}</div>
                <hr style="margin-top: 15px;">
                <div style="margin-top: 15px; font-size: 12px;">💰 <b>${job.salaryRange.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</b></div>
                <div style="margin-top: 8px; font-size: 12px;">💼 <b>${job.jobCategory.toUpperCase()}</b></div>
                <div style="margin-top: 8px; font-size: 12px;">⏳ <b>${job.jobType}</b></div>
                <div style="margin-top: 15px; font-size: 12px; color: green; font-weight: 100;">🕑 <b>Tayang ${job.timeAgo}</b></div>

                <div style="margin-top: 18px;">
                  <button onclick="editloker('${job.jobId}')" style="
                    background-color: #be1e2d;
                    color: white;
                    padding: 10px 20px;
                    font-size: 13px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                  ">Edit</button>
                  <button onclick="lihatLoker('${job.jobId}')" style="
                    background-color: #be1e2d;
                    color: white;
                    padding: 10px 20px;
                    font-size: 13px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                  ">Lihat Pelamar</button>
                  <button onclick="changeJobStatus('${job.jobId}', '${statusAction}')" style="background-color: #be1e2d; color: white; padding: 10px 20px; font-size: 13px; border: none; border-radius: 6px; cursor: pointer;">
                    ${statusButtonText}
                  </button>
                </div>
              </div>
            `
          },
          ...(job.jobDescription ? [{
            autoheight: true,
            template: `
              <div style="margin-top: 16px; margin-bottom: 16px;">
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">Deskripsi Pekerjaan</div>
                <div style="font-size: 11px; line-height: 1.5;">${job.jobDescription.replace(/<[^>]+>/g, "")}</div>
              </div>
            `
          }] : []),

          ...(job.jobRequirements ? [{
            autoheight: true,
            template: `
              <div style="margin-top: 16px;">
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">Persyaratan Lengkap</div>
                <div style="font-size: 11px; line-height: 1.5;">${job.jobRequirements.replace(/<[^>]+>/g, "")}</div>
              </div>
            `
          }] : []),
        ]
      }
    }
  }).show();
}

function changeJobStatus(jobId, statusAction) {
  const newStatus = statusAction === "openJob" ? "Open" : "Closed";

  webix.ajax()
    .headers({ Authorization: "Bearer " + token })
    .put(`http://localhost:3000/api/icc/job/change/status/${jobId}`, { status: newStatus })
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

const showInterviewListModal = (interviews) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  webix.ui({
    view: "window",
    id: "interviewListModal",
    head: "Jadwal Wawancara",
    width: 500,
    height: 500,
    modal: true,
    move: true,
    close: true,
    position: "center",
    body: {
      view: "scrollview",
      body: {
        view: "layout",
        type: "space",
        rows: interviews.map(interview => ({
          view: "template",
          borderless: true,
          autoheight: true,
          template: `
            <div style="
              padding: 16px; 
              border: 1px solid #eee; 
              border-radius: 12px; 
              background: #fff; 
              display: flex; 
              flex-direction: column; 
              gap: 12px; 
              font-family: 'Segoe UI', sans-serif;
            ">

              <!-- Job Title -->
              <div style="font-size: 18px; font-weight: 600; color: #333;">
                ${interview.jobTitle}
              </div>

              <!-- Tanggal dan Waktu -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <span style="background: #ffe0b2; padding: 4px 10px; border-radius: 8px; font-size: 12px;">📅 ${formatDate(interview.interviewDate)}</span>
                <span style="background: #e0e0e0; padding: 4px 10px; border-radius: 8px; font-size: 12px;">⏰ ${interview.interviewTime}</span>
              </div>

              <!-- Kode -->
              <div style="font-size: 13px; color: #333;">
               
              </div>

              <!-- Info 2 Kolom -->
              <div style="display: flex; justify-content: space-between; gap: 16px; font-size: 13px;">
                <div style="flex: 1;">
                  🪪 ${interview.user.userDetail.code}<br>
                  👤 ${interview.user.userDetail.fullname}
                </div>
                <div style="flex: 1; text-align: right;">
                  📧 ${interview.user.email}<br>
                  🎓 ${interview.user.userDetail.programType.toUpperCase()}
                </div>
              </div>

              <!-- Notes -->
              ${interview.notes ? `
                <div style="font-size: 13px; color: #555; border-top: 1px solid #eee; padding-top: 8px;">
                  📝 ${interview.notes}
                </div>` : ''}
            </div>
          `
        })),
      },
    },
  }).show();
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    margin: 20,
    rows: [toolbar, layoutloker],
  });

  $$("homeContentLoker").attachEvent("onItemClick", function (id, e, node) {
    const item = this.getItem(id);
    showJobDetailModal(item);
  });

  webix.event(window, "resize", function () {
    $$("homeContentLoker").adjust();
  });
  

  loadData();
});

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
    "http://deviso.vdc.id:3003/api/icc/job",
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

        const jobs = Array.isArray(response.data) ? response.data : [];

        if (jobs.length === 0) {
          console.log("No job available");
          return;
        }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        const transformedData = jobs.map((job) => {
          let applicants = [];

          try {
            if (typeof job.applicants === "string") {
              applicants = JSON.parse(job.applicants);
            } else if (Array.isArray(job.applicants)) {
              applicants = job.applicants;
            }
          } catch (e) {
            console.warn("Failed to parse applicants:", job.applicants);
            applicants = [];
          }

          const alreadyApplied = applicants.includes(userId.toString());

          const companyName = job.companyId ? job.company?.companyDetail?.name : job.companyName || "Nama tidak tersedia";
          const companyAddress = job.companyId ? job.company?.companyDetail?.address : job.companyLocation || "Alamat tidak tersedia";

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
            companyName: companyName,
            companyAddress: companyAddress,
            detailLink: `/lowongankerja/${job.jobId}`,
            timeAgo: timeAgo(job.created_at),
            alreadyApplied: alreadyApplied,
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
      value: "Riwayat LOKER",
      width: 200,
      align: "center",
      height: 50,
      click: function () {
        axios.get(`http://deviso.vdc.id:3003/api/icc/job/hitory/peserta/${userId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(response => {
          const applications = response.data.data;
    
          if (applications.length === 0) {
            webix.message({ type: "info", text: "Belum ada riwayat lamaran." });
          } else {
            showApplicationHistoryModal(applications);
          }
        })
        .catch(error => {
          console.error("Error loading application history:", error);
          webix.message({ type: "error", text: "Gagal memuat riwayat lamaran" });
        });
      }
    }
    
    
  ],
};

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
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 18px; font-weight: 600; color: #333;">${obj.jobTitle}</div>
                <div style="font-size: 14px; color: #be1e2d;">${obj.salaryRange}</div>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <span style="background: #ffe0b2; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: bold;">${obj.jobCategory.toUpperCase()}</span>
                <span style="background: #e0e0e0; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: bold;">${obj.jobType}</span>
                <span style="background: ${statusColor}; padding: 4px 10px; border-radius: 8px; font-size: 12px; color: white; font-weight: bold;">
                  ${obj.status}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div>
                  <div style="color: #be1e2d; font-size: 13px; font-weight: 600;">${obj.companyName}</div>
                  <div style="font-size: 12px; color: #555;">📍 ${obj.companyAddress}</div>
                </div>
              </div>
              <div style="font-size: 12px; color: green; border-top: 1px solid #eee; padding-top: 8px;"> 🕑 ${obj.timeAgo}</div>
            </div>
          `;
        }
      },
    },
  ],
};

function lamarLoker(jobId) {
  webix.ajax().post(
    "http://deviso.vdc.id:3003/api/icc/job/apply",
    {
      jobId: jobId,
      userId: userId,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (text, data, xhr) {
        webix.message({ type: "success", text: "Berhasil melamar pekerjaan!" });
        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      error: function (text, data, xhr) {
        webix.message({
          type: "error",
          text: "Terjadi kesalahan saat melamar pekerjaan",
        });
        console.error("Error loading data:", text);
      },
    }
  );
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

  const isJobClosed = job.status.toUpperCase() === "CLOSED";
  const isAlreadyApplied = job.alreadyApplied;

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
                  <button id="applyButton" onclick="lamarLoker('${job.jobId}')" style="
                    background-color: ${isJobClosed ? '#e0e0e0' : '#be1e2d'};
                    color: ${isJobClosed || isAlreadyApplied ? '#888' : 'white'}; 
                    padding: 10px 20px;
                    font-size: 13px;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: ${isJobClosed || isAlreadyApplied ? 'not-allowed' : 'pointer'};  
                    opacity: ${isJobClosed || isAlreadyApplied ? '0.6' : '1'};
                  ">${isJobClosed ? "Lowongan Ditutup" : isAlreadyApplied ? "Sudah Lamar" : "LAMAR"}</button>
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

  const applyButton = $$("jobDetailModal").getNode().querySelector("#applyButton");
  if (isJobClosed || isAlreadyApplied) {
    applyButton.disabled = true;
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const showApplicationHistoryModal = (applications) => {
  webix.ui({
    view: "window",
    id: "applicationHistoryModal",
    head: "Riwayat LOKER",
    width: 600,
    height: 600,
    modal: true,
    move: true,
    close: true,
    position: "center",
    body: {
      view: "scrollview",
      body: {
        view: "layout",
        type: "space",
        rows: applications.map(app => ({
          view: "template",
          borderless: true,
          autoheight: true,
          template: `
            <div style="padding: 16px; border: 1px solid #eee; border-radius: 12px; background: #fff; display: flex; flex-direction: column; gap: 12px; font-family: 'Segoe UI', sans-serif;">
              
              <!-- Job Info -->
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 18px; font-weight: 600; color: #333;">${app.jobTitle}</div>
              </div>
              
              <!-- Company Info -->
              <div style="color: #be1e2d; font-size: 13px; font-weight: 600;">${app.companyName}</div>
              <div style="font-size: 12px; color: #555;">📍 ${app.companyLocation}</div>
              
              <hr>

              <!-- Timeline -->
              <div style="position: relative; padding-left: 24px; margin-left: 8px;">
              ${app.statuses.map((status, idx) => {
                const date = new Date(status.timestamp);
                const formatted = date.toLocaleDateString("id-ID", {
                  day: "2-digit", month: "2-digit", year: "numeric",
                  hour: "2-digit", minute: "2-digit"
                });

                const dotColor = status.status.toLowerCase() === 'reject' ? '#dc3545' :
                                status.status.toLowerCase() === 'diterima' ? '#28a745' :
                                status.status.toLowerCase() === 'wawancara' ? '#007bff' :
                                '#6c757d';

                const wawancaraExtra = status.status.toLowerCase() === 'wawancara' && app.interview
                  ? `
                    <div style="margin-top: 4px; font-size: 13px; color: #333; padding-left: 8px;">
                      📅 ${formatDate(app.interview.interviewDate)}
                      ⏰ ${app.interview.interviewTime}<br>
                      📝 ${app.interview.notes || "-"}
                    </div>
                  `
                  : '';

                return `
                  <div style="position: relative; padding-bottom: 20px;">
                    <!-- Vertical line -->
                    <div style="position: absolute; top: 0; left: -12px; width: 2px; height: 100%; background: #ccc;"></div>

                    <!-- Dot -->
                    <div style="position: absolute; top: 0; left: -17px; width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; border: 2px solid white;"></div>

                    <!-- Content -->
                    <div style="padding-left: 8px;">
                      <b>${status.status}</b><br>
                      <span style="font-size: 12px; color: #777;">🕒 ${formatted}</span>
                      ${wawancaraExtra}
                    </div>
                  </div>
                `;
              }).join("")}
              </div>
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

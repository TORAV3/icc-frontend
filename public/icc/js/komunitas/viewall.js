function loadDataKomunitas(categoryFilter, startDateFilter, endDateFilter) {
  webix.ajax().get(
    `http://localhost:3000/api/icc/community/approved?userId=${userId}`,
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

        const communitys = Array.isArray(response.data) ? response.data : [];

        if (communitys.length === 0) {
          console.log("No communities available");
          return;
        }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        let startDate = startDateFilter ? new Date(startDateFilter) : null;
        let endDate = endDateFilter ? new Date(endDateFilter) : null;

        if (startDate) {
          startDate.setHours(0, 0, 0, 0); 
        }
        if (endDate) {
          endDate.setHours(23, 59, 59, 999); 
        }

        const transformedData = communitys
          .filter((community) => {
            let matchCategory = true;
            let matchDate = true;

            if (
              categoryFilter &&
              categoryFilter !== "all" &&
              community.category !== categoryFilter
            ) {
              matchCategory = false;
            }

            let publishDate = new Date(community.approval_date);
            publishDate.setHours(0, 0, 0, 0);

            if (startDate && publishDate < startDate) {
              matchDate = false;
            }
            if (endDate && publishDate > endDate) {
              matchDate = false;
            }

            return matchCategory && matchDate;
          })
          .map((community) => ({
            id: community.id,
            title: community.name,
            description: community.description || "No description available.",
            category: community.category || "Uncategorized",
            thumbnail: community.thumbnailBase64 || "/path/to/default-image.png",
            publishdate: formatDate(community.approval_date),
            joined: community.joined || false,
            memberCount: community.memberCount || 0,
            detailLink: `/komunitas/detail/${community.id}`,
          }));

        $$("homeContentCommunity").clearAll();

        if (transformedData.length > 0) {
          $$("homeContentCommunity").parse(transformedData);
          
          setTimeout(() => {
            const joinButtons = document.querySelectorAll(".btn-join");
            joinButtons.forEach((btn) => {
              btn.addEventListener("click", function () {
                const communityId = this.getAttribute("data-id");
                confirmJoinCommunity(communityId);
              });
            });
          }, 500);
        }
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}


function confirmJoinCommunity(communityId) {
  webix.confirm({
    title: "Konfirmasi",
    text: "Apakah Anda yakin ingin bergabung ke komunitas ini?",
    callback: function (result) {
      if (result) {
        joinCommunity(communityId);
      }
    }
  });
}

function joinCommunity(communityId) {
  const button = document.querySelector(`.btn-join[data-id="${communityId}"]`);
  if (button) {
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Bergabung...`;
  }

  webix.ajax().post(
    "http://localhost:3000/api/icc/community/join",
    { communityId: communityId, userId: userId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (text, data, xhr) {
        webix.message({ type: "success", text: "Berhasil bergabung ke komunitas!" });

        if (button) {
          button.classList.remove("btn-primary-600");
          button.classList.add("btn-secondary");
          button.innerHTML = "Sudah Bergabung";
          button.disabled = true;
        }

        const parentCard = button.closest(".card");
        const badge = parentCard.querySelector(".member-badge");
        if (badge) {
          const currentCount = parseInt(badge.dataset.count || "0");
          badge.innerText = `👥 ${currentCount + 1} Anggota`;
          badge.dataset.count = currentCount + 1;
        }
      },
      error: function (text, data, xhr) {
        webix.message({
          type: "error",
          text: "Gagal bergabung ke komunitas.",
        });

        if (button) {
          button.disabled = false;
          button.innerHTML = "Bergabung";
        }
      }
    }
  );
}

var categoryCombo = {
  view: "combo",
  id: "categoryFilter",
  labelPosition: "top",
  label: "Kategori",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "Lingkungan", value: "Lingkungan" },
    { id: "Family", value: "Family" },
    { id: "Sosial", value: "Sosial" },
  ],
  width: 250,
  name: "category",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadDataKomunitas(
        newValue,
        $$("startDateFilter").getValue(),
        $$("endDateFilter").getValue()
      );
    },
  },
};

var startDateFilter = {
  view: "datepicker",
  id: "startDateFilter",
  label: "Dari",
  labelPosition: "top",
  width: 250,
  align: "left",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadDataKomunitas(
        $$("categoryFilter").getValue(),
        $$("startDateFilter").getValue(),
        $$("endDateFilter").getValue()
      );
    },
  },
};

var endDateFilter = {
  view: "datepicker",
  id: "endDateFilter",
  label: "Sampai",
  width: 250,
  labelPosition: "top",
  align: "left",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadDataKomunitas(
        $$("categoryFilter").getValue(),
        $$("startDateFilter").getValue(),
        $$("endDateFilter").getValue()
      );
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [categoryCombo, {}, startDateFilter, { width: 30 }, endDateFilter],
};

var layoutcommunity = {
  type: "wide",
  css: "dataview-community",
  cols: [
    {
      view: "dataview",
      id: "homeContentCommunity",
      css: "dataview",
      autoheight: true,
      xCount: 3,
      type: {
        height: 650,
        width: 400,
      },
      template: function (obj) {
        const btn = obj.joined
          ? `<button class="btn btn-secondary" disabled style="height: 50px;">Sudah Bergabung</button>`
          : `<button class="btn-join btn btn-primary-600" data-id="${obj.id}" style="height: 50px;">Bergabung</button>`;
      
        return `
          <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; margin-top: 10px; overflow: hidden;">
            <div style="width: 100%; height: 250px; overflow: hidden;">
              <img src="${obj.thumbnail}" alt="${obj.title}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
            </div>
            <hr>
            <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <p style="margin: 0; font-size: 25px; font-weight: 600;">${obj.title}</p>
                <div class="member-badge" data-count="${obj.memberCount}" style="font-size: 12px; background: rgba(255, 232, 232, 1); color: #be1e2d; padding: 4px 10px; border-radius: 20px;">
                  👥 ${obj.memberCount} Anggota
                </div>
              </div>
              <div style="font-size: 13px; color: #888; margin-top: 18px;">
                📅 ${obj.publishdate}
              </div>
              <br>
              <div style="font-size: 12px; color: #555; margin-top: 5px;">
                ${obj.description}
              </div>
              <br>
              <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 12px;">
                ${btn}
                <a class="btn btn-outline-primary-600 px-4 py-2 rounded" href="${obj.detailLink}" style="height: 50px; font-size: 16px; display: flex; justify-content: center; align-items: center; text-align: center;">
                  Lihat Detail
                </a>
              </div>
            </div>
          </div>
        `;
      },      
    },
  ],
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    margin: 20,
    rows: [toolbar, layoutcommunity],
  });

  webix.event(window, "resize", function () {
    $$("homeContentCommunity").adjust();
  });

  loadDataKomunitas();
});

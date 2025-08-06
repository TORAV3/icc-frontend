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

function loadData() {
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
          console.log("No communitys available");
          return;
        }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        const transformedData = communitys.map((community) => ({
          id: community.id,
          title: community.name,
          description: community.description,
          category: community.category,
          thumbnail: community.thumbnailBase64,
          publishdate: formatDate(community.approval_date),
          detailLink: `/komunitas/detail/${community.id}`,
          joined: community.joined || false,
          memberCount: community.memberCount || 0,
        }));

        $$("homeContentCommunity").clearAll();

        if (transformedData.length > 0) {
          $$("homeContentCommunity").parse(transformedData.slice(0, 3));

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
      }
    }
  );
}

function isMobile() {
  return window.innerWidth <= 768;
}

function createCommunityLayout() {
  return {
    type: "wide",
    css: "dataview-community",
    cols: [
      {
        view: "dataview",
        id: "homeContentCommunity",
        css: "dataview",
        autoheight: true,
        xCount: isMobile() ? 1 : 3,
        type: {
          height: isMobile() ? 680 : 700,
          width: isMobile() ? 350 : 430,
        },
        template: function (obj) {
          const btn = obj.joined
            ? `<button class="btn btn-secondary" disabled style="height: 50px;">Sudah Bergabung</button>`
            : `<button class="btn-join btn btn-primary-600" data-id="${obj.id}" style="height: 50px;">Bergabung</button>`;
        
          return `
            <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
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
        }
      }
    ]
  };
}

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
        height: 700,
        width: 430,
      },
      template: function (obj) {
        const btn = obj.joined
          ? `<button class="btn btn-secondary" disabled style="height: 50px;">Sudah Bergabung</button>`
          : `<button class="btn-join btn btn-primary-600" data-id="${obj.id}" style="height: 50px;">Bergabung</button>`;
      
        return `
          <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
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
    container: "community-page",
    margin: 20,
    rows: [createCommunityLayout()],
  });

  loadData();
});

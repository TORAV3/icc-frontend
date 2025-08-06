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

        const transformedData = communitys
          .filter(community => community.joined === true)
          .map((community) => ({
            id: community.id,
            title: community.name,
            description: community.description,
            category: community.category,
            thumbnail: community.thumbnailBase64,
            publishdate: formatDate(community.approval_date),
            threadLink: `/komunitas/thread/${community.id}`,
            joined: true,
            memberCount: community.memberCount || 0,
        }));


        $$("homeContentCommunity").clearAll();

        if (transformedData.length > 0) {
          $$("homeContentCommunity").parse(transformedData);

          setTimeout(() => {
            const leaveButtons = document.querySelectorAll(".btn-leave");
            leaveButtons.forEach((btn) => {
              btn.addEventListener("click", function () {
                const communityId = this.getAttribute("data-id");
                leaveCommunity(communityId);
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

function leaveCommunity(communityId) {
  webix.confirm({
    title: "Konfirmasi",
    text: "Apakah anda ingin keluar dari komunitas ini?",
    callback: function (result) {
      if (result) {
        webix.ajax().post(
        "http://localhost:3000/api/icc/community/leave", // Ganti dengan endpoint yang sesuai
        {
          communityId: communityId,
          userId: userId,
        },
    {
      headers: {
        Authorization: "Bearer " + token, // Tambahkan header Authorization dengan token
      },
      success: function (text, data, xhr) {
       
          webix.message({ type: "success", text: "Berhasil keluar dari komunitas!" });
          setTimeout(() => {
            location.reload(); // Reload halaman setelah 1.5 detik
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
    },
  });
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
        height: 750,
        width: 390,
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
                <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 12px;">
                  <a class="btn btn-outline-primary-600 px-4 py-2 rounded" href="${obj.threadLink}" style="height: 50px; font-size: 16px; display: flex; justify-content: center; align-items: center; text-align: center;">
                    Lihat Thread
                  </a>
                  <a class="btn btn-primary-600 px-4 py-2 rounded btn-leave" data-id="${obj.id}" style="height: 50px; font-size: 16px; display: flex; justify-content: center; align-items: center; text-align: center;">
                    Keluar Komunitas
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      },      
    },
  ],
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
      value: "Buat Komunitas",
      width: 200,
      align: "center",
      height: 50,
      click: function () {
        window.location.href = "komunitas/tambah";
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

  loadData();
});
